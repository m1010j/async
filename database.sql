-- seed locally: `psql -f database.sql`
-- seed on heroku: comment out line 7 and `cat database.sql | heroku pg:psql`

DROP DATABASE IF EXISTS async;
CREATE DATABASE async;

\c async;

CREATE TABLE sync_benchmarks
(
  ID SERIAL PRIMARY KEY,
  browser_engine VARCHAR,
  browser_name VARCHAR,
  browser_platform VARCHAR,
  browser_version_1 VARCHAR,
  browser_version_2 VARCHAR,
  num_threads INTEGER,
  n INTEGER,
  duration INTEGER
);

CREATE TABLE sync_busy_benchmarks
(
  ID SERIAL PRIMARY KEY,
  browser_engine VARCHAR,
  browser_name VARCHAR,
  browser_platform VARCHAR,
  browser_version_1 VARCHAR,
  browser_version_2 VARCHAR,
  num_threads INTEGER,
  n INTEGER,
  duration INTEGER
);

CREATE TABLE sync_memo_benchmarks
(
  ID SERIAL PRIMARY KEY,
  browser_engine VARCHAR,
  browser_name VARCHAR,
  browser_platform VARCHAR,
  browser_version_1 VARCHAR,
  browser_version_2 VARCHAR,
  num_threads INTEGER,
  n INTEGER,
  duration INTEGER
);

CREATE TABLE async_benchmarks
(
  ID SERIAL PRIMARY KEY,
  browser_engine VARCHAR,
  browser_name VARCHAR,
  browser_platform VARCHAR,
  browser_version_1 VARCHAR,
  browser_version_2 VARCHAR,
  num_threads INTEGER,
  n INTEGER,
  duration INTEGER
);

CREATE TABLE async_busy_benchmarks
(
  ID SERIAL PRIMARY KEY,
  browser_engine VARCHAR,
  browser_name VARCHAR,
  browser_platform VARCHAR,
  browser_version_1 VARCHAR,
  browser_version_2 VARCHAR,
  num_threads INTEGER,
  n INTEGER,
  duration INTEGER
);

CREATE TABLE async_memo_benchmarks
(
  ID SERIAL PRIMARY KEY,
  browser_engine VARCHAR,
  browser_name VARCHAR,
  browser_platform VARCHAR,
  browser_version_1 VARCHAR,
  browser_version_2 VARCHAR,
  num_threads INTEGER,
  n INTEGER,
  duration INTEGER
);