START TRANSACTION;
  ALTER TABLE "users" ADD "photo" VARCHAR DEFAULT ('https://s3.eu-central-1.amazonaws.com/artem.db2-lecture/users/photos_17/1620654760523.jpg');
COMMIT;