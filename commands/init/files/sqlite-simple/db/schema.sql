BEGIN TRANSACTION;

/*
  Schema migrations
*/

CREATE TABLE IF NOT EXISTS schema_migrations (
  version integer PRIMARY KEY
);

END TRANSACTION;
