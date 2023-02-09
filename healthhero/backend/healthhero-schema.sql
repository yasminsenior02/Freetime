CREATE TABLE school(
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,  
    image       TEXT,
    location    INTEGER
);

CREATE TABLE users(
    id          SERIAL PRIMARY KEY,
    email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    username    TEXT NOT NULL UNIQUE,
    password    TEXT NOT NULL,
    school_id   INTEGER,
    type        TEXT NOT NULL,
    FOREIGN KEY (school_id) REFERENCES school(id)
);

CREATE TABLE restaurant(
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER,
    name        TEXT NOT NULL, 
    location    TEXT NOT NULL,
    latitude     TEXT NOT NULL,
    longitude   TEXT NOT NULL,
    image_url   TEXT,
    description TEXT NOT NULL,
    school_id   INTEGER,
    FOREIGN KEY (school_id) REFERENCES school(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE restriction(
    id          SERIAL PRIMARY KEY,
    name        TEXT UNIQUE,
    type        TEXT
);

CREATE TABLE accommodation(
    id            SERIAL PRIMARY KEY,  
    restaurant_id INTEGER NOT NULL,  
    restriction_name TEXT NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id),
    FOREIGN KEY (restriction_name) REFERENCES restriction(name)
);

CREATE TABLE user_restriction(
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER,
    restriction_name TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (restriction_name) REFERENCES restriction(name)
);

CREATE TABLE community(
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER,
    name        TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url   TEXT NOT NULL,
    school_id   INTEGER,
    FOREIGN KEY (school_id) REFERENCES school(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE user_community(
    id           SERIAL PRIMARY KEY,
    user_id      INTEGER,
    community_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (community_id) REFERENCES community(id)
)






