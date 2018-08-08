-- set up locally: `psql -f database.sql`
-- set up on heroku: comment out line 7 and `cat database.sql | heroku pg:psql`

DROP DATABASE IF EXISTS async;
CREATE DATABASE async;

\c async;

DROP TABLE IF EXISTS sync_benchmarks
CASCADE;
DROP TABLE IF EXISTS sync_busy_benchmarks
CASCADE;
DROP TABLE IF EXISTS sync_memo_benchmarks
CASCADE;
DROP TABLE IF EXISTS async_benchmarks
CASCADE;
DROP TABLE IF EXISTS async_busy_benchmarks
CASCADE;
DROP TABLE IF EXISTS async_memo_benchmarks
CASCADE;

CREATE TABLE sync_benchmarks
(
  ID SERIAL PRIMARY KEY,
  browser VARCHAR,
  os VARCHAR,
  num_cores INTEGER,
  n INTEGER,
  duration INTEGER
);

CREATE TABLE sync_busy_benchmarks
(
  ID SERIAL PRIMARY KEY,
  browser VARCHAR,
  os VARCHAR,
  num_cores INTEGER,
  n INTEGER,
  duration INTEGER
);

CREATE TABLE sync_memo_benchmarks
(
  ID SERIAL PRIMARY KEY,
  browser VARCHAR,
  os VARCHAR,
  num_cores INTEGER,
  n INTEGER,
  duration INTEGER
);

CREATE TABLE async_benchmarks
(
  ID SERIAL PRIMARY KEY,
  browser VARCHAR,
  os VARCHAR,
  num_cores INTEGER,
  n INTEGER,
  duration INTEGER
);

CREATE TABLE async_busy_benchmarks
(
  ID SERIAL PRIMARY KEY,
  browser VARCHAR,
  os VARCHAR,
  num_cores INTEGER,
  n INTEGER,
  duration INTEGER
);

CREATE TABLE async_memo_benchmarks
(
  ID SERIAL PRIMARY KEY,
  browser VARCHAR,
  os VARCHAR,
  num_cores INTEGER,
  n INTEGER,
  duration INTEGER
);

CREATE INDEX sync_benchmarks_num_cores ON sync_benchmarks ( num_cores );
CREATE INDEX sync_busy_benchmarks_num_cores ON sync_busy_benchmarks ( num_cores );
CREATE INDEX sync_memo_benchmarks_num_cores ON sync_memo_benchmarks ( num_cores );
CREATE INDEX async_benchmarks_num_cores ON async_benchmarks ( num_cores );
CREATE INDEX async_busy_benchmarks_num_cores ON async_busy_benchmarks ( num_cores );
CREATE INDEX async_memo_benchmarks_num_cores ON async_memo_benchmarks ( num_cores );

