CREATE TABLE items(
    item_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    unit TEXT NOT NULL,
    price DECIMAL NOT NULL,
    avail INTEGER NOT NULL
)
CREATE TABLE users(
    farm_name TEXT NOT NULL,
    user_id SERIAL PRIMARY KEY,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
)