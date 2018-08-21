-- set up locally: `psql -f database.sql`
-- set up on heroku: comment out lines 4-7 and `cat database.sql | heroku pg:psql`

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
  duration INTEGER DEFAULT 0 NOT NULL,
  with_worker BOOLEAN
);

CREATE TABLE sync_busy_benchmarks
(
  ID SERIAL PRIMARY KEY,
  browser VARCHAR,
  os VARCHAR,
  num_cores INTEGER,
  n INTEGER,
  duration INTEGER DEFAULT 0 NOT NULL,
  with_worker BOOLEAN
);

CREATE TABLE sync_memo_benchmarks
(
  ID SERIAL PRIMARY KEY,
  browser VARCHAR,
  os VARCHAR,
  num_cores INTEGER,
  n INTEGER,
  duration INTEGER DEFAULT 0 NOT NULL,
  with_worker BOOLEAN
);

CREATE TABLE async_benchmarks
(
  ID SERIAL PRIMARY KEY,
  browser VARCHAR,
  os VARCHAR,
  num_cores INTEGER,
  n INTEGER,
  duration INTEGER DEFAULT 0 NOT NULL,
  with_worker BOOLEAN
);

CREATE TABLE async_busy_benchmarks
(
  ID SERIAL PRIMARY KEY,
  browser VARCHAR,
  os VARCHAR,
  num_cores INTEGER,
  n INTEGER,
  duration INTEGER DEFAULT 0 NOT NULL,
  with_worker BOOLEAN
);

CREATE TABLE async_memo_benchmarks
(
  ID SERIAL PRIMARY KEY,
  browser VARCHAR,
  os VARCHAR,
  num_cores INTEGER,
  n INTEGER,
  duration INTEGER DEFAULT 0 NOT NULL,
  with_worker BOOLEAN
);

CREATE INDEX sync_benchmarks_num_cores ON sync_benchmarks ( num_cores );
CREATE INDEX sync_busy_benchmarks_num_cores ON sync_busy_benchmarks ( num_cores );
CREATE INDEX sync_memo_benchmarks_num_cores ON sync_memo_benchmarks ( num_cores );
CREATE INDEX async_benchmarks_num_cores ON async_benchmarks ( num_cores );
CREATE INDEX async_busy_benchmarks_num_cores ON async_busy_benchmarks ( num_cores );
CREATE INDEX async_memo_benchmarks_num_cores ON async_memo_benchmarks ( num_cores );

CREATE INDEX sync_benchmarks_n ON sync_benchmarks ( n );
CREATE INDEX sync_busy_benchmarks_n ON sync_busy_benchmarks ( n );
CREATE INDEX sync_memo_benchmarks_n ON sync_memo_benchmarks ( n );
CREATE INDEX async_benchmarks_n ON async_benchmarks ( n );
CREATE INDEX async_busy_benchmarks_n ON async_busy_benchmarks ( n );
CREATE INDEX async_memo_benchmarks_n ON async_memo_benchmarks ( n );

CREATE INDEX sync_benchmarks_with_worker ON sync_benchmarks ( with_worker );
CREATE INDEX sync_busy_benchmarks_with_worker ON sync_busy_benchmarks ( with_worker );
CREATE INDEX sync_memo_benchmarks_with_worker ON sync_memo_benchmarks ( with_worker );
CREATE INDEX async_benchmarks_with_worker ON async_benchmarks ( with_worker );
CREATE INDEX async_busy_benchmarks_with_worker ON async_busy_benchmarks ( with_worker );
CREATE INDEX async_memo_benchmarks_with_worker ON async_memo_benchmarks ( with_worker );

CREATE INDEX sync_browser_firefox ON sync_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'firefox%' AND LOWER(browser) NOT LIKE 'firefox mobile%';
CREATE INDEX sync_browser_firefox_mobile ON sync_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'firefox mobile%';
CREATE INDEX sync_browser_chromium ON sync_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'chromium%';
CREATE INDEX sync_browser_chrome ON sync_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'chrome%' AND LOWER(browser) NOT LIKE 'chrome mobile%';
CREATE INDEX sync_browser_chrome_mobile ON sync_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'chrome mobile%';
CREATE INDEX sync_browser_opera ON sync_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'opera%' AND LOWER(browser) NOT LIKE 'opera mobile%';
CREATE INDEX sync_browser_opera_mobile ON sync_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'opera mobile%';
CREATE INDEX sync_browser_samsung_mobile ON sync_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'samsung mobile%';
CREATE INDEX sync_browser_uc_browser ON sync_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'uc browser%';
CREATE INDEX sync_browser_edge ON sync_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'edge%';
CREATE INDEX sync_browser_safari ON sync_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'safari%';
CREATE INDEX sync_browser_mobile_safari ON sync_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'mobile safari%';

CREATE INDEX sync_busy_browser_firefox ON sync_busy_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'firefox%' AND LOWER(browser) NOT LIKE 'firefox mobile%';
CREATE INDEX sync_busy_browser_firefox_mobile ON sync_busy_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'firefox mobile%';
CREATE INDEX sync_busy_browser_chromium ON sync_busy_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'chromium%';
CREATE INDEX sync_busy_browser_chrome ON sync_busy_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'chrome%' AND LOWER(browser) NOT LIKE 'chrome mobile%';
CREATE INDEX sync_busy_browser_chrome_mobile ON sync_busy_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'chrome mobile%';
CREATE INDEX sync_busy_browser_opera ON sync_busy_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'opera%' AND LOWER(browser) NOT LIKE 'opera mobile%';
CREATE INDEX sync_busy_browser_opera_mobile ON sync_busy_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'opera mobile%';
CREATE INDEX sync_busy_browser_samsung_mobile ON sync_busy_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'samsung mobile%';
CREATE INDEX sync_busy_browser_uc_browser ON sync_busy_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'uc browser%';
CREATE INDEX sync_busy_browser_edge ON sync_busy_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'edge%';
CREATE INDEX sync_busy_browser_safari ON sync_busy_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'safari%';
CREATE INDEX sync_busy_browser_mobile_safari ON sync_busy_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'mobile safari%';

CREATE INDEX sync_memo_browser_firefox ON sync_memo_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'firefox%' AND LOWER(browser) NOT LIKE 'firefox mobile%';
CREATE INDEX sync_memo_browser_firefox_mobile ON sync_memo_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'firefox mobile%';
CREATE INDEX sync_memo_browser_chromium ON sync_memo_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'chromium%';
CREATE INDEX sync_memo_browser_chrome ON sync_memo_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'chrome%' AND LOWER(browser) NOT LIKE 'chrome mobile%';
CREATE INDEX sync_memo_browser_chrome_mobile ON sync_memo_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'chrome mobile%';
CREATE INDEX sync_memo_browser_opera ON sync_memo_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'opera%' AND LOWER(browser) NOT LIKE 'opera mobile%';
CREATE INDEX sync_memo_browser_opera_mobile ON sync_memo_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'opera mobile%';
CREATE INDEX sync_memo_browser_samsung_mobile ON sync_memo_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'samsung mobile%';
CREATE INDEX sync_memo_browser_uc_browser ON sync_memo_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'uc browser%';
CREATE INDEX sync_memo_browser_edge ON sync_memo_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'edge%';
CREATE INDEX sync_memo_browser_safari ON sync_memo_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'safari%';
CREATE INDEX sync_memo_browser_mobile_safari ON sync_memo_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'mobile safari%';

CREATE INDEX async_browser_firefox ON async_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'firefox%' AND LOWER(browser) NOT LIKE 'firefox mobile%';
CREATE INDEX async_browser_firefox_mobile ON async_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'firefox mobile%';
CREATE INDEX async_browser_chromium ON async_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'chromium%';
CREATE INDEX async_browser_chrome ON async_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'chrome%' AND LOWER(browser) NOT LIKE 'chrome mobile%';
CREATE INDEX async_browser_chrome_mobile ON async_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'chrome mobile%';
CREATE INDEX async_browser_opera ON async_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'opera%' AND LOWER(browser) NOT LIKE 'opera mobile%';
CREATE INDEX async_browser_opera_mobile ON async_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'opera mobile%';
CREATE INDEX async_browser_samsung_mobile ON async_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'samsung mobile%';
CREATE INDEX async_browser_uc_browser ON async_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'uc browser%';
CREATE INDEX async_browser_edge ON async_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'edge%';
CREATE INDEX async_browser_safari ON async_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'safari%';
CREATE INDEX async_browser_mobile_safari ON async_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'mobile safari%';

CREATE INDEX async_busy_browser_firefox ON async_busy_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'firefox%' AND LOWER(browser) NOT LIKE 'firefox mobile%';
CREATE INDEX async_busy_browser_firefox_mobile ON async_busy_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'firefox mobile%';
CREATE INDEX async_busy_browser_chromium ON async_busy_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'chromium%';
CREATE INDEX async_busy_browser_chrome ON async_busy_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'chrome%' AND LOWER(browser) NOT LIKE 'chrome mobile%';
CREATE INDEX async_busy_browser_chrome_mobile ON async_busy_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'chrome mobile%';
CREATE INDEX async_busy_browser_opera ON async_busy_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'opera%' AND LOWER(browser) NOT LIKE 'opera mobile%';
CREATE INDEX async_busy_browser_opera_mobile ON async_busy_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'opera mobile%';
CREATE INDEX async_busy_browser_samsung_mobile ON async_busy_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'samsung mobile%';
CREATE INDEX async_busy_browser_uc_browser ON async_busy_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'uc browser%';
CREATE INDEX async_busy_browser_edge ON async_busy_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'edge%';
CREATE INDEX async_busy_browser_safari ON async_busy_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'safari%';
CREATE INDEX async_busy_browser_mobile_safari ON async_busy_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'mobile safari%';

CREATE INDEX async_memo_browser_firefox ON async_memo_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'firefox%' AND LOWER(browser) NOT LIKE 'firefox mobile%';
CREATE INDEX async_memo_browser_firefox_mobile ON async_memo_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'firefox mobile%';
CREATE INDEX async_memo_browser_chromium ON async_memo_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'chromium%';
CREATE INDEX async_memo_browser_chrome ON async_memo_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'chrome%' AND LOWER(browser) NOT LIKE 'chrome mobile%';
CREATE INDEX async_memo_browser_chrome_mobile ON async_memo_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'chrome mobile%';
CREATE INDEX async_memo_browser_opera ON async_memo_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'opera%' AND LOWER(browser) NOT LIKE 'opera mobile%';
CREATE INDEX async_memo_browser_opera_mobile ON async_memo_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'opera mobile%';
CREATE INDEX async_memo_browser_samsung_mobile ON async_memo_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'samsung mobile%';
CREATE INDEX async_memo_browser_uc_browser ON async_memo_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'uc browser%';
CREATE INDEX async_memo_browser_edge ON async_memo_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'edge%';
CREATE INDEX async_memo_browser_safari ON async_memo_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'safari%';
CREATE INDEX async_memo_browser_mobile_safari ON async_memo_benchmarks ( browser )
WHERE LOWER(browser) LIKE 'mobile safari%';

CREATE INDEX sync_os_android ON sync_benchmarks ( os )
WHERE LOWER(os) LIKE 'android%';
CREATE INDEX sync_os_ubuntu ON sync_benchmarks ( os )
WHERE LOWER(os) LIKE 'ubuntu%';
CREATE INDEX sync_os_linux ON sync_benchmarks ( os )
WHERE LOWER(os) LIKE 'linux%';
CREATE INDEX sync_os_windows ON sync_benchmarks ( os )
WHERE LOWER(os) LIKE 'windows%';
CREATE INDEX sync_os_ios ON sync_benchmarks ( os )
WHERE LOWER(os) LIKE 'ios%';
CREATE INDEX sync_os_mac_os ON sync_benchmarks ( os )
WHERE LOWER(os) LIKE 'mac os%';

CREATE INDEX sync_busy_os_android ON sync_busy_benchmarks ( os )
WHERE LOWER(os) LIKE 'android%';
CREATE INDEX sync_busy_os_ubuntu ON sync_busy_benchmarks ( os )
WHERE LOWER(os) LIKE 'ubuntu%';
CREATE INDEX sync_busy_os_linux ON sync_busy_benchmarks ( os )
WHERE LOWER(os) LIKE 'linux%';
CREATE INDEX sync_busy_os_windows ON sync_busy_benchmarks ( os )
WHERE LOWER(os) LIKE 'windows%';
CREATE INDEX sync_busy_os_ios ON sync_busy_benchmarks ( os )
WHERE LOWER(os) LIKE 'ios%';
CREATE INDEX sync_busy_os_mac_os ON sync_busy_benchmarks ( os )
WHERE LOWER(os) LIKE 'mac os%';

CREATE INDEX sync_memo_os_android ON sync_memo_benchmarks ( os )
WHERE LOWER(os) LIKE 'android%';
CREATE INDEX sync_memo_os_ubuntu ON sync_memo_benchmarks ( os )
WHERE LOWER(os) LIKE 'ubuntu%';
CREATE INDEX sync_memo_os_linux ON sync_memo_benchmarks ( os )
WHERE LOWER(os) LIKE 'linux%';
CREATE INDEX sync_memo_os_windows ON sync_memo_benchmarks ( os )
WHERE LOWER(os) LIKE 'windows%';
CREATE INDEX sync_memo_os_ios ON sync_memo_benchmarks ( os )
WHERE LOWER(os) LIKE 'ios%';
CREATE INDEX sync_memo_os_mac_os ON sync_memo_benchmarks ( os )
WHERE LOWER(os) LIKE 'mac os%';

CREATE INDEX async_os_android ON async_benchmarks ( os )
WHERE LOWER(os) LIKE 'android%';
CREATE INDEX async_os_ubuntu ON async_benchmarks ( os )
WHERE LOWER(os) LIKE 'ubuntu%';
CREATE INDEX async_os_linux ON async_benchmarks ( os )
WHERE LOWER(os) LIKE 'linux%';
CREATE INDEX async_os_windows ON async_benchmarks ( os )
WHERE LOWER(os) LIKE 'windows%';
CREATE INDEX async_os_ios ON async_benchmarks ( os )
WHERE LOWER(os) LIKE 'ios%';
CREATE INDEX async_os_mac_os ON async_benchmarks ( os )
WHERE LOWER(os) LIKE 'mac os%';

CREATE INDEX async_busy_os_android ON async_busy_benchmarks ( os )
WHERE LOWER(os) LIKE 'android%';
CREATE INDEX async_busy_os_ubuntu ON async_busy_benchmarks ( os )
WHERE LOWER(os) LIKE 'ubuntu%';
CREATE INDEX async_busy_os_linux ON async_busy_benchmarks ( os )
WHERE LOWER(os) LIKE 'linux%';
CREATE INDEX async_busy_os_windows ON async_busy_benchmarks ( os )
WHERE LOWER(os) LIKE 'windows%';
CREATE INDEX async_busy_os_ios ON async_busy_benchmarks ( os )
WHERE LOWER(os) LIKE 'ios%';
CREATE INDEX async_busy_os_mac_os ON async_busy_benchmarks ( os )
WHERE LOWER(os) LIKE 'mac os%';

CREATE INDEX async_memo_os_android ON async_memo_benchmarks ( os )
WHERE LOWER(os) LIKE 'android%';
CREATE INDEX async_memo_os_ubuntu ON async_memo_benchmarks ( os )
WHERE LOWER(os) LIKE 'ubuntu%';
CREATE INDEX async_memo_os_linux ON async_memo_benchmarks ( os )
WHERE LOWER(os) LIKE 'linux%';
CREATE INDEX async_memo_os_windows ON async_memo_benchmarks ( os )
WHERE LOWER(os) LIKE 'windows%';
CREATE INDEX async_memo_os_ios ON async_memo_benchmarks ( os )
WHERE LOWER(os) LIKE 'ios%';
CREATE INDEX async_memo_os_mac_os ON async_memo_benchmarks ( os )
WHERE LOWER(os) LIKE 'mac os%';