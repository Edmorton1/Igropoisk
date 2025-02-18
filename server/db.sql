CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(255) NOT NULL UNIQUE,
    mail VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    game INT NOT NULL,
    text TEXT NOT NULL,
    user_id INT NOT NULL,

    CONSTRAINT user_id_fk_comment FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
ALTER TABLE comments ADD COLUMN created_at DATE DEFAULT NOW() NOT NULL;

CREATE TABLE relations(
    id SERIAL PRIMARY KEY,
    game INT NOT NULL,
    status relation_status NOT NULL,
    user_id INT NOT NULL,
    ALTER TABLE relations ADD COLUMN grade INT CHECK (grade BETWEEN 1 AND 10),

    CONSTRAINT user_id_fk_relations FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tokens(
    user_id INT PRIMARY KEY,
    token VARCHAR(255),

    CONSTRAINT user_id_fk_tokens FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TYPE relation_status AS ENUM ('passed', 'dropped', 'planned', 'play')

-- create table games(
-- 	id SERIAL PRIMARY KEY,
-- 	game INT
-- );

create table games(
	steam_id INT PRIMARY KEY,
	name VARCHAR(255),
	genres INT[],
	release_date VARCHAR(255),
	developers TEXT[],
	publishers TEXT[],
	total_reviews INT,
	total_negative INT
);

create table appids(
	appid int pRIMARY KEY
);

DROP TABLE users;
DROP TABLE comment;
DROP TABLE relations;
DROP TABLE tokens;