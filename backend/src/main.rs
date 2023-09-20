use actix_web::{get, web, App, HttpRequest, HttpResponse, HttpServer, Responder};
use awc::Client;
use context::Context;
use database::establish_connection;
use diesel::{ExpressionMethods, OptionalExtension, QueryDsl, RunQueryDsl, SelectableHelper};
use dotenv::dotenv;
use qstring::QString;
use serde::{Deserialize, Serialize};
use serde_json::json;

mod context;
mod database;
mod models;
mod schema;

#[get("/hello")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GithubResponseLogin {
    pub access_token: String,
    pub scope: String,
    pub token_type: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GithubResponseUser {
    login: String,
    avatar_url: String,
}

#[get("/github_oauth")]
async fn github_oauth(context: web::Data<Context>, req: HttpRequest) -> impl Responder {
    let qs = QString::from(req.query_string());
    let Some(code) = qs.get("code") else {
        return HttpResponse::BadRequest().finish();
    };
    let mut response = match Client::new()
        .post(format!(
            "https://github.com/login/oauth/access_token?client_id={}&client_secret={}&code={}",
            std::env::var("GITHUB_CLIENT_ID").unwrap(),
            std::env::var("GITHUB_SECRET_KEY").unwrap(),
            code
        ))
        .append_header(("Accept", "application/json"))
        .send()
        .await
    {
        Ok(response) => response,
        Err(e) => {
            return HttpResponse::InternalServerError()
                .body(serde_json::to_string(&json!({"error": format!("{}", e)})).unwrap())
        }
    };

    let access_token_string = match response
        .json::<GithubResponseLogin>()
        .await
        .map_err(|e| format!("{}", e))
    {
        Ok(response) => response.access_token,
        Err(e) => {
            return HttpResponse::InternalServerError()
                .body(serde_json::to_string(&json!({"error": format!("{}", e)})).unwrap())
        }
    };

    let Ok(mut response) = Client::new()
        .get("https://api.github.com/user")
        .append_header(("User-Agent", "awc"))
        .bearer_auth(access_token_string.as_str())
        .send()
        .await
    else {
        return HttpResponse::InternalServerError().body(
            serde_json::to_string(&json!({"error": "Failed to get user info from github"}))
                .unwrap(),
        );
    };

    let user = match response
        .json::<GithubResponseUser>()
        .await
        .map_err(|e| format!("{}", e))
    {
        Ok(response) => response,
        Err(e) => {
            return HttpResponse::InternalServerError()
                .body(serde_json::to_string(&json!({"error": format!("{}", e)})).unwrap())
        }
    };

    // use web::block to offload blocking Diesel queries without blocking server thread
    if let Err(err) = web::block::<_, Result<(), String>>(move || {
        use crate::schema::users::dsl::*;
        let mut conn = context.db.get().map_err(|e| format!("{}", e))?;

        if users
            .filter(username.eq(&user.login))
            .first::<models::User>(&mut conn)
            .optional()
            .map_err(|e| format!("{}", e))?
            .is_some()
        {
            return Ok(());
        }

        let user = models::NewUser {
            username: &user.login,
            access_token_github: access_token_string.as_str(),
            profile_picture_url: &user.avatar_url,
        };
        // note that obtaining a connection from the pool is also potentially blocking

        diesel::insert_into(schema::users::table)
            .values(user)
            .returning(models::User::as_returning())
            .get_result(&mut conn)
            .map_err(|e| format!("{}", e))?;
        Ok(())
    })
    .await
    .unwrap()
    {
        return HttpResponse::InternalServerError()
            .body(serde_json::to_string(&json!({"error": err})).unwrap());
    };
    HttpResponse::PermanentRedirect()
        .append_header(("Location", "http://localhost:5173/profile"))
        .finish()
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    HttpServer::new(|| {
        let context = Context {
            db: establish_connection(),
        };
        App::new()
            .app_data(web::Data::new(context))
            .service(hello)
            .service(github_oauth)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
