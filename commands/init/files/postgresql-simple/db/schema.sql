BEGIN TRANSACTION;

/**
 * Track database migrations.
 */

CREATE TABLE IF NOT EXISTS schema_migrations (
  version bigint PRIMARY KEY
);

END TRANSACTION;
