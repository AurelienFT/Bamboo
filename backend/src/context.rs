use crate::database::DbPool;

#[derive(Clone)]
pub struct Context {
    pub db: DbPool,
}
