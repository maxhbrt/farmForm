CREATE TABLE items(
    item_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    name TEXT NOT NULL,
    unit TEXT NOT NULL,
    price DECIMAL NOT NULL,
    avail INTEGER NOT NULL
);
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    farm_name TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);