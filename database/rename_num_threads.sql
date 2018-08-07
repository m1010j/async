-- \c
-- async;

ALTER TABLE sync_benchmarks 
RENAME COLUMN num_threads TO num_cores;

ALTER TABLE sync_memo_benchmarks 
RENAME COLUMN num_threads TO num_cores;

ALTER TABLE sync_busy_benchmarks 
RENAME COLUMN num_threads TO num_cores;

ALTER TABLE async_benchmarks 
RENAME COLUMN num_threads TO num_cores;

ALTER TABLE async_memo_benchmarks 
RENAME COLUMN num_threads TO num_cores;

ALTER TABLE async_busy_benchmarks 
RENAME COLUMN num_threads TO num_cores;