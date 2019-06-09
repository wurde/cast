'use strict'

module.exports = {
  up: `\
CREATE TABLE IF NOT EXISTS schema_migrations (
  version integer PRIMARY KEY
);
`,

  down: `\
DROP TABLE If EXISTS schema_migrations;
`
}
