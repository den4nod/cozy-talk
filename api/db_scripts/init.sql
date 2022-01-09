SELECT 'CREATE DATABASE cozy_talk_db'
WHERE NOT EXISTS(SELECT FROM pg_database WHERE datname = 'cozy_talk_db');

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
SELECT uuid_generate_v4();

-- DROP all tables before initializing the from scratch
DROP TABLE IF EXISTS avatars CASCADE;
DROP TABLE IF EXISTS universities CASCADE;
DROP TABLE IF EXISTS visibility_statuses CASCADE;
DROP TABLE IF EXISTS friendship_request_statuses CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS comments_treepath CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS friendships CASCADE;
DROP TABLE IF EXISTS liked_articles CASCADE;

CREATE TABLE IF NOT EXISTS avatars
(
    avatar_id   uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    avatar_path varchar(255)                    NOT NULL
);

CREATE TABLE IF NOT EXISTS universities
(
    university_id   uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    university_name varchar(255)                    NOT NULL
);

CREATE SEQUENCE IF NOT EXISTS v_status_id;
CREATE TABLE IF NOT EXISTS visibility_statuses
(
    visibility_status_id   smallint DEFAULT nextval('v_status_id') NOT NULL PRIMARY KEY,
    visibility_status_name varchar(30)                             NOT NULL,
    UNIQUE (visibility_status_name)
);

INSERT INTO visibility_statuses(visibility_status_name)
VALUES ('All'),
       ('Friends'),
       ('Only Me');

CREATE SEQUENCE IF NOT EXISTS f_status_id;
CREATE TABLE IF NOT EXISTS friendship_request_statuses
(
    friendship_request_status_id smallint DEFAULT nextval('f_status_id') NOT NULL PRIMARY KEY,
    status_name                  varchar(30)                             NOT NULL,
    UNIQUE (status_name)
);

CREATE TABLE IF NOT EXISTS users
(
    user_id                         uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    name                            varchar(255)                    NOT NULL,
    birth_date                      date,
    avatar_id                       uuid,
    email                           varchar(50)                     NOT NULL,
    phone                           varchar(13)                     NOT NULL,
    university_id                   uuid,
    name_visibility_status_id       smallint,
    email_visibility_status_id      smallint,
    phone_visibility_status_id      smallint,
    university_visibility_status_id smallint,
    FOREIGN KEY (avatar_id) REFERENCES avatars (avatar_id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (university_id) REFERENCES universities (university_id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (name_visibility_status_id) REFERENCES visibility_statuses (visibility_status_id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (email_visibility_status_id) REFERENCES visibility_statuses (visibility_status_id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (phone_visibility_status_id) REFERENCES visibility_statuses (visibility_status_id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (university_visibility_status_id) REFERENCES visibility_statuses (visibility_status_id)
        ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.date_edited = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS articles
(
    article_id                   uuid      DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    article_body                 text      NOT NULL,
    user_id                      uuid      NOT NULL,
    article_visibility_status_id smallint,
    date_crated                  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_edited                  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (article_visibility_status_id) REFERENCES visibility_statuses (visibility_status_id)
        ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE OR REPLACE TRIGGER set_article_timestamp
    BEFORE UPDATE ON articles
    FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.date_edited = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS comments
(
    comment_id   uuid               DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    article_id   uuid      NOT NULL,
    user_id      uuid      NOT NULL,
    comment_text text      NOT NULL,
    date_crated  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_edited  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles (article_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE OR REPLACE TRIGGER set_comment_timestamp
    BEFORE UPDATE ON comments
    FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TABLE IF NOT EXISTS comments_treepath
(
    comment_treepath_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    parent_comment_id   uuid,
    child_comment_id    uuid,
    UNIQUE (parent_comment_id, child_comment_id),
    FOREIGN KEY (parent_comment_id) REFERENCES comments (comment_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (child_comment_id) REFERENCES comments (comment_id)
        ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS friendships
(
    friendship_id                uuid      DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    user_sender_id               uuid      NOT NULL,
    user_receiver_id             uuid      NOT NULL,
    friendship_request_status_id smallint  NOT NULL,
    date                         timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_sender_id, user_receiver_id, friendship_request_status_id),
    FOREIGN KEY (user_sender_id) REFERENCES users (user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_receiver_id) REFERENCES users (user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (friendship_request_status_id) REFERENCES friendship_request_statuses (friendship_request_status_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS liked_articles
(
    article_id uuid NOT NULL,
    user_id    uuid NOT NULL,
    PRIMARY KEY (article_id, user_id),
    UNIQUE (article_id, user_id),
    FOREIGN KEY (article_id) REFERENCES articles (article_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);
