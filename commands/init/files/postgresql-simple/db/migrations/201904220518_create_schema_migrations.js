'use strict'

module.exports = {
  up: `\
CREATE TABLE IF NOT EXISTS schema_migrations (
  version bigint PRIMARY KEY
);
`,

  down: `\
DROP TABLE If EXISTS schema_migrations;
`
}
