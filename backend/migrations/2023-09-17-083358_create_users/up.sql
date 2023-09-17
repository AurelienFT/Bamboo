CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL,
  access_token_github TEXT NOT NULL,
  profile_picture_url TEXT NOT NULL
)