\echo 'Delete and recreate auth_starter db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE healthhero;
CREATE DATABASE healthhero;
\connect healthhero

\i healthhero-schema.sql

\i populate.sql
