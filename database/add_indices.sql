CREATE INDEX sync_browser ON sync_benchmarks ( browser )
WHERE browser LIKE 'Firefox%' AND browser NOT LIKE 'Firefox Mobile%';
CREATE INDEX sync_browser ON sync_benchmarks ( browser )
WHERE browser LIKE 'Firefox Mobile%';
CREATE INDEX sync_browser ON sync_benchmarks ( browser )
WHERE browser LIKE 'Chrome%' AND browser NOT LIKE 'Chrome Mobile%';
CREATE INDEX sync_browser ON sync_benchmarks ( browser )
WHERE browser LIKE 'Chrome Mobile%';
CREATE INDEX sync_browser ON sync_benchmarks ( browser )
WHERE browser LIKE 'Opera%' AND browser NOT LIKE 'Opera Mobile%';
CREATE INDEX sync_browser ON sync_benchmarks ( browser )
WHERE browser LIKE 'Opera Mobile%';
CREATE INDEX sync_browser ON sync_benchmarks ( browser )
WHERE browser LIKE 'Samsung Mobile%';
CREATE INDEX sync_browser ON sync_benchmarks ( browser )
WHERE browser LIKE 'UC Browser%';
CREATE INDEX sync_browser ON sync_benchmarks ( browser )
WHERE browser LIKE 'Edge%';

CREATE INDEX sync_os ON sync_benchmarks ( os )
WHERE os LIKE 'Android%';
CREATE INDEX sync_os ON sync_benchmarks ( os )
WHERE os LIKE 'Ubuntu%';
CREATE INDEX sync_os ON sync_benchmarks ( os )
WHERE os LIKE 'Linux%';
CREATE INDEX sync_os ON sync_benchmarks ( os )
WHERE os LIKE 'Windows%';
