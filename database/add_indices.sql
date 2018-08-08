CREATE INDEX sync_browser ON sync_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'firefox%' AND LOWER(browser) NOT LIKE 'firefox mobile%';
CREATE INDEX sync_browser ON sync_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'firefox mobile%';
CREATE INDEX sync_browser ON sync_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'chrome%' AND LOWER(browser) NOT LIKE 'chrome mobile%';
CREATE INDEX sync_browser ON sync_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'chrome mobile%';
CREATE INDEX sync_browser ON sync_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'opera%' AND LOWER(browser) NOT LIKE 'opera mobile%';
CREATE INDEX sync_browser ON sync_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'opera mobile%';
CREATE INDEX sync_browser ON sync_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'samsung mobile%';
CREATE INDEX sync_browser ON sync_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'uc browser%';
CREATE INDEX sync_browser ON sync_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'edge%';

CREATE INDEX sync_os ON sync_benchmarks ( os )
WHERE LOWER(os) LIKE 'android%';
CREATE INDEX sync_os ON sync_benchmarks ( os )
WHERE LOWER(os) LIKE 'ubuntu%';
CREATE INDEX sync_os ON sync_benchmarks ( os )
WHERE LOWER(os) LIKE 'linux%';
CREATE INDEX sync_os ON sync_benchmarks ( os )
WHERE LOWER(os) LIKE 'windows%';
