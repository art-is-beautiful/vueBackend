START TRANSACTION;
    ALTER TABLE "users" ADD CONSTRAINT user_username UNIQUE (username);
COMMIT;