START TRANSACTION;
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    mycategory VARCHAR NOT NULL,
    users_id INTEGER,
    FOREIGN KEY (users_id) REFERENCES users (id) on delete cascade
);
COMMIT;
