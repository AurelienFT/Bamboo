// @generated automatically by Diesel CLI.

diesel::table! {
    users (id) {
        id -> Int4,
        username -> Varchar,
        access_token_github -> Text,
        profile_picture_url -> Text,
    }
}
