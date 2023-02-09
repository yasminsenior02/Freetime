\c healthhero

drop table if exists school cascade;
CREATE TABLE school(
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,  
    image       TEXT,
    location    INTEGER
);

drop table if exists restriction cascade;
CREATE TABLE restriction(
    id          SERIAL PRIMARY KEY,
    name        TEXT UNIQUE,
    type        TEXT
);

drop table if exists community cascade;
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

drop table if exists restaurant cascade;
CREATE TABLE restaurant(
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER,
    name        TEXT NOT NULL, 
    location    TEXT NOT NULL,
    latitude FLOAT NOT NULL DEFAULT 20.97,
    longitude FLOAT NOT NULL DEFAULT -90.87,
    image_url   TEXT,
    description TEXT NOT NULL,
    school_id   INTEGER,
    FOREIGN KEY (school_id) REFERENCES school(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

\copy school(name,image,location) from 'starter_data/hh-schools.csv' delimiter ',' csv header;
\copy restriction(name,type) from 'starter_data/hh-restrictions.csv' delimiter ',' csv header;
\copy community(name,description,school_id,image_url) from 'starter_data/hh-communities.csv' delimiter ',' csv header;
\copy restaurant(name,image_url,location,description) from 'starter_data/hh-restaurants.csv' delimiter ',' csv header;
