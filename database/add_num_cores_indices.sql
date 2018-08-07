\c
async;

CREATE INDEX sync_benchmarks_num_threads ON sync_benchmarks ( num_threads );
CREATE INDEX sync_busy_benchmarks_num_threads ON sync_busy_benchmarks ( num_threads );
CREATE INDEX sync_memo_benchmarks_num_threads ON sync_memo_benchmarks ( num_threads );
CREATE INDEX async_benchmarks_num_threads ON async_benchmarks ( num_threads );
CREATE INDEX async_busy_benchmarks_num_threads ON async_busy_benchmarks ( num_threads );
CREATE INDEX async_memo_benchmarks_num_threads ON async_memo_benchmarks ( num_threads );