var promise = require('bluebird');
var useragent = require('useragent');

var options = {
  // Initialization Options
  promiseLib: promise,
  query: function(e) {
    console.log('QUERY:', e.query);
    if (e.params) {
      console.log('PARAMS:', e.params);
    }
  },
};

var pgp = require('pg-promise')(options);

var connectionConfig =
  process.env.DATABASE_URL ||
  'postgres://matthias:matthias@localhost:5432/async';
var db = pgp(connectionConfig);

function getAllBenchmarks(type) {
  return function(req, res, next) {
    const chromiumBasedSqlStr = `LOWER(browser) LIKE 'chromium%'
                OR LOWER(browser) LIKE 'chrome%'
                OR LOWER(browser) LIKE 'opera%'
                OR LOWER(browser) LIKE 'uc browser%'
                OR LOWER(browser) LIKE 'samsung mobile%'`;

    const isAvgMode = req.query.mode === 'avg';
    const isMinMode = req.query.mode === 'min';
    const maxN = parseInt(req.query.max_n) || 45;
    let browser;
    if (req.query.browser !== 'undefined') {
      browser = req.query.browser;
    }
    let os;
    if (req.query.os !== 'undefined') {
      os = req.query.os;
    }
    let numCores = parseInt(req.query.num_cores) || undefined;
    if (isAvgMode) {
      if (browser) {
        if (browser === 'chromium based') {
          if (os) {
            console.log('NUM CORES', numCores);
            if (numCores) {
              db.any(
                `SELECT
                n, AVG(duration)
              FROM $1:name
              WHERE (
                ${chromiumBasedSqlStr}
                )
                AND LOWER(os) LIKE $2
                AND n <= $3
                AND num_cores = $4
              GROUP BY n
              ORDER BY n`,
                [`${type}_benchmarks`, `${os}%`, maxN, numCores]
              )
                .then(avgSuccessCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
                n, AVG(duration)
              FROM $1:name
              WHERE (
                ${chromiumBasedSqlStr}
                )
                AND LOWER(os) LIKE $2
                AND n <= $3
              GROUP BY n
              ORDER BY n`,
                [`${type}_benchmarks`, `${os}%`, maxN]
              )
                .then(avgSuccessCb(res))
                .catch(errorCb);
            }
          } else {
            if (numCores) {
              db.any(
                `SELECT
                n, AVG(duration)
              FROM $1:name
              WHERE (
                ${chromiumBasedSqlStr}
                )
                AND n <= $2 
                and num_cores = $3
              GROUP BY n
              ORDER BY n`,
                [`${type}_benchmarks`, maxN, numCores]
              )
                .then(avgSuccessCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
                n, AVG(duration)
              FROM $1:name
              WHERE (
                ${chromiumBasedSqlStr}
                )
                AND n <= $2 
              GROUP BY n
              ORDER BY n`,
                [`${type}_benchmarks`, maxN]
              )
                .then(avgSuccessCb(res))
                .catch(errorCb);
            }
          }
        } else if (browser === 'firefox based') {
          if (os) {
            if (numCores) {
              db.any(
                `SELECT
                n, AVG(duration)
              FROM $1:name
              WHERE LOWER(browser) LIKE 'firefox%' 
                AND LOWER(os) LIKE $2
                AND n <= $3
                AND num_cores = $4
              GROUP BY n
              ORDER BY n`,
                [`${type}_benchmarks`, `${os}%`, maxN, numCores]
              )
                .then(avgSuccessCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
                n, AVG(duration)
              FROM $1:name
              WHERE LOWER(browser) LIKE 'firefox%' 
                AND LOWER(os) LIKE $2
                AND n <= $3
              GROUP BY n
              ORDER BY n`,
                [`${type}_benchmarks`, `${os}%`, maxN]
              )
                .then(avgSuccessCb(res))
                .catch(errorCb);
            }
          } else {
            if (numCores) {
              db.any(
                `SELECT
                n, AVG(duration)
              FROM 
                $1:name 
              WHERE LOWER(browser) LIKE 'firefox%'
                AND n <= $2
                AND num_cores = $3
              GROUP BY n
              ORDER BY n`,
                [`${type}_benchmarks`, maxN, numCores]
              )
                .then(avgSuccessCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
                n, AVG(duration)
              FROM 
                $1:name 
              WHERE LOWER(browser) LIKE 'firefox%' AND n <= $2
              GROUP BY n
              ORDER BY n`,
                [`${type}_benchmarks`, maxN]
              )
                .then(avgSuccessCb(res))
                .catch(errorCb);
            }
          }
        } else if (browser === 'firefox') {
          if (os) {
            if (numCores) {
              db.any(
                `SELECT
                n, AVG(duration)
              FROM $1:name
              WHERE LOWER(browser) LIKE 'firefox%'
                AND NOT LOWER(browser) LIKE 'firefox mobile%'
                AND LOWER(os) LIKE $2
                AND n <= $3
                AND num_cores = $4
              GROUP BY n
              ORDER BY n`,
                [`${type}_benchmarks`, `${os}%`, maxN, numCores]
              )
                .then(avgSuccessCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
                n, AVG(duration)
              FROM $1:name
              WHERE LOWER(browser) LIKE 'firefox%'
                AND NOT LOWER(browser) LIKE 'firefox mobile%'
                AND LOWER(os) LIKE $2
                AND n <= $3
              GROUP BY n
              ORDER BY n`,
                [`${type}_benchmarks`, `${os}%`, maxN]
              )
                .then(avgSuccessCb(res))
                .catch(errorCb);
            }
          } else {
            if (numCores) {
              db.any(
                `SELECT
                n, AVG(duration)
              FROM 
                $1:name 
              WHERE LOWER(browser) LIKE 'firefox%'
                AND NOT LOWER(browser) LIKE 'firefox mobile%'
                AND n <= $2
                AND num_cores = $3
              GROUP BY n
              ORDER BY n`,
                [`${type}_benchmarks`, maxN, numCores]
              )
                .then(avgSuccessCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
                n, AVG(duration)
              FROM 
                $1:name 
              WHERE LOWER(browser) LIKE 'firefox%'
                AND NOT LOWER(browser) LIKE 'firefox mobile%'
                AND n <= $2
              GROUP BY n
              ORDER BY n`,
                [`${type}_benchmarks`, maxN]
              )
                .then(avgSuccessCb(res))
                .catch(errorCb);
            }
          }
        } else if (browser === 'chrome') {
          if (os) {
            if (numCores) {
              db.any(
                `SELECT
                n, AVG(duration)
              FROM $1:name
              WHERE LOWER(browser) LIKE 'chrome%'
                AND NOT LOWER(browser) LIKE 'chrome mobile%'
                AND LOWER(os) LIKE $2
                AND n <= $3
                AND num_cores = $4
              GROUP BY n
              ORDER BY n`,
                [`${type}_benchmarks`, `${os}%`, maxN, numCores]
              )
                .then(avgSuccessCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
                n, AVG(duration)
              FROM $1:name
              WHERE LOWER(browser) LIKE 'chrome%'
                AND NOT LOWER(browser) LIKE 'chrome mobile%'
                AND LOWER(os) LIKE $2
                AND n <= $3
              GROUP BY n
              ORDER BY n`,
                [`${type}_benchmarks`, `${os}%`, maxN]
              )
                .then(avgSuccessCb(res))
                .catch(errorCb);
            }
          } else {
            if (numCores) {
              db.any(
                `SELECT
                n, AVG(duration)
              FROM 
                $1:name 
              WHERE LOWER(browser) LIKE 'chrome%'
                AND NOT LOWER(browser) LIKE 'chrome mobile%'
                AND n <= $2
                AND num_cores = $3
              GROUP BY n
              ORDER BY n`,
                [`${type}_benchmarks`, maxN, numCores]
              )
                .then(avgSuccessCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
                n, AVG(duration)
              FROM 
                $1:name 
              WHERE LOWER(browser) LIKE 'chrome%'
                AND NOT LOWER(browser) LIKE 'chrome mobile%'
                AND n <= $2
              GROUP BY n
              ORDER BY n`,
                [`${type}_benchmarks`, maxN]
              )
                .then(avgSuccessCb(res))
                .catch(errorCb);
            }
          }
        } else if (browser === 'opera') {
          if (os) {
            if (numCores) {
              db.any(
                `SELECT
                n, AVG(duration)
              FROM $1:name
              WHERE LOWER(browser) LIKE 'opera%'
                AND NOT LOWER(browser) LIKE 'opera mobile%'
                AND LOWER(os) LIKE $2
                AND n <= $3
                AND num_cores = $4
              GROUP BY n
              ORDER BY n`,
                [`${type}_benchmarks`, `${os}%`, maxN, numCores]
              )
                .then(avgSuccessCb(res))
                .catch(errorCb);
            }
          } else {
            db.any(
              `SELECT
                n, AVG(duration)
              FROM 
                $1:name 
              WHERE LOWER(browser) LIKE 'opera%'
                AND NOT LOWER(browser) LIKE 'opera mobile%'
                AND n <= $2
              GROUP BY n
              ORDER BY n`,
              [`${type}_benchmarks`, maxN]
            )
              .then(avgSuccessCb(res))
              .catch(errorCb);
          }
        } else {
          if (os) {
            if (numCores) {
              db.any(
                `SELECT
                n, AVG(duration)
              FROM $1:name
              WHERE LOWER(browser) LIKE $2
                AND LOWER(os) LIKE $3
                AND n <= $4
                AND num_cores = $5
              GROUP BY n
              ORDER BY n`,
                [`${type}_benchmarks`, `${browser}%`, `${os}%`, maxN, numCores]
              )
                .then(avgSuccessCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
                n, AVG(duration)
              FROM $1:name
              WHERE LOWER(browser) LIKE $2
                AND LOWER(os) LIKE $3
                AND n <= $4
              GROUP BY n
              ORDER BY n`,
                [`${type}_benchmarks`, `${browser}%`, `${os}%`, maxN]
              )
                .then(avgSuccessCb(res))
                .catch(errorCb);
            }
          } else {
            if (numCores) {
              db.any(
                `SELECT
                n, AVG(duration)
              FROM $1:name
              WHERE LOWER(browser) LIKE $2 AND n <= $3 AND num_cores = $4
              GROUP BY n
              ORDER BY n`,
                [`${type}_benchmarks`, `${browser}%`, maxN, numCores]
              )
                .then(avgSuccessCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
                n, AVG(duration)
              FROM $1:name
              WHERE LOWER(browser) LIKE $2 AND n <= $3
              GROUP BY n
              ORDER BY n`,
                [`${type}_benchmarks`, `${browser}%`, maxN]
              )
                .then(avgSuccessCb(res))
                .catch(errorCb);
            }
          }
        }
      } else {
        if (os) {
          if (numCores) {
            db.any(
              `SELECT
              n, AVG(duration)
            FROM $1:name
            WHERE LOWER(os) LIKE $2 AND n <= $3 AND num_cores = $4
            GROUP BY n
            ORDER BY n`,
              [`${type}_benchmarks`, `${os}%`, maxN, numCores]
            )
              .then(avgSuccessCb(res))
              .catch(errorCb);
          } else {
            db.any(
              `SELECT
              n, AVG(duration)
            FROM $1:name
            WHERE LOWER(os) LIKE $2 AND n <= $3
            GROUP BY n
            ORDER BY n`,
              [`${type}_benchmarks`, `${os}%`, maxN]
            )
              .then(avgSuccessCb(res))
              .catch(errorCb);
          }
        } else {
          if (numCores) {
            db.any(
              `SELECT
              n, AVG(duration)
            FROM $1:name
            WHERE n <= $2 AND num_cores = $3
            GROUP BY n
            ORDER BY n`,
              [`${type}_benchmarks`, maxN, numCores]
            )
              .then(avgSuccessCb(res))
              .catch(errorCb);
          } else {
            db.any(
              `SELECT
              n, AVG(duration)
            FROM $1:name
            WHERE n <= $2  
            GROUP BY n
            ORDER BY n`,
              [`${type}_benchmarks`, maxN]
            )
              .then(avgSuccessCb(res))
              .catch(errorCb);
          }
        }
      }
    } else if (isMinMode) {
      if (browser) {
        if (browser === 'chromium based') {
          if (os) {
            if (numCores) {
              db.any(
                `SELECT
              n, MIN(duration)
            FROM $1:name
            WHERE (
              ${chromiumBasedSqlStr}
              )
              AND LOWER(os) LIKE $2
              AND n <= $3
              AND num_cores = $4
            GROUP BY n
            ORDER BY n`,
                [`${type}_benchmarks`, `${os}%`, maxN, numCores]
              )
                .then(minSuccessCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
              n, MIN(duration)
            FROM $1:name
            WHERE (
              ${chromiumBasedSqlStr}
              )
              AND LOWER(os) LIKE $2
              AND n <= $3
            GROUP BY n
            ORDER BY n`,
                [`${type}_benchmarks`, `${os}%`, maxN]
              )
                .then(minSuccessCb(res))
                .catch(errorCb);
            }
          } else {
            if (numCores) {
              db.any(
                `SELECT
                n, MIN(duration)
              FROM $1:name
              WHERE (
                ${chromiumBasedSqlStr}
                )
                AND n <= $2
                AND num_cores = $3
              GROUP BY n
              ORDER BY n`,
                [`${type}_benchmarks`, maxN, numCores]
              )
                .then(minSuccessCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
                n, MIN(duration)
              FROM $1:name
              WHERE (
                ${chromiumBasedSqlStr}
                )
                AND n <= $2
              GROUP BY n
              ORDER BY n`,
                [`${type}_benchmarks`, maxN]
              )
                .then(minSuccessCb(res))
                .catch(errorCb);
            }
          }
        } else if (browser === 'firefox based') {
          if (os) {
            if (numCores) {
              db.any(
                `SELECT
              n, MIN(duration)
            FROM $1:name
            WHERE LOWER(browser) LIKE 'firefox%'
              AND LOWER(os) LIKE $2
              AND n <= $3
              AND num_cores = $4
            GROUP BY n
            ORDER BY n`,
                [`${type}_benchmarks`, `${os}%`, maxN, numCores]
              )
                .then(minSuccessCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
              n, MIN(duration)
            FROM $1:name
            WHERE LOWER(browser) LIKE 'firefox%'
              AND LOWER(os) LIKE $2
              AND n <= $3
            GROUP BY n
            ORDER BY n`,
                [`${type}_benchmarks`, `${os}%`, maxN]
              )
                .then(minSuccessCb(res))
                .catch(errorCb);
            }
          } else {
            if (numCores) {
              db.any(
                `SELECT
              n, MIN(duration)
            FROM $1:name
            WHERE LOWER(browser) LIKE 'firefox%' AND n <= $2 AND num_cores = $3
            GROUP BY n
            ORDER BY n`,
                [`${type}_benchmarks`, maxN, numCores]
              )
                .then(minSuccessCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
              n, MIN(duration)
            FROM $1:name
            WHERE LOWER(browser) LIKE 'firefox%' AND n <= $2
            GROUP BY n
            ORDER BY n`,
                [`${type}_benchmarks`, maxN]
              )
                .then(minSuccessCb(res))
                .catch(errorCb);
            }
          }
        } else if (browser === 'chrome') {
          if (os) {
            if (numCores) {
              db.any(
                `SELECT
              n, MIN(duration)
            FROM $1:name
            WHERE LOWER(browser) LIKE 'chrome%'
              AND NOT WHERE LOWER(browse) LIKE 'chrome mobile%'
              AND LOWER(os) LIKE $2
              AND n <= $3
              AND num_cores = $4
            GROUP BY n
            ORDER BY n`,
                [`${type}_benchmarks`, `${os}%`, maxN, numCores]
              )
                .then(minSuccessCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
              n, MIN(duration)
            FROM $1:name
            WHERE LOWER(browser) LIKE 'chrome%'
              AND NOT WHERE LOWER(browse) LIKE 'chrome mobile%'
              AND LOWER(os) LIKE $2
              AND n <= $3
            GROUP BY n
            ORDER BY n`,
                [`${type}_benchmarks`, `${os}%`, maxN]
              )
                .then(minSuccessCb(res))
                .catch(errorCb);
            }
          } else {
            if (numCores) {
              db.any(
                `SELECT
              n, MIN(duration)
            FROM $1:name
            WHERE LOWER(browser) LIKE 'chrome%'
              AND NOT WHERE LOWER(browse) LIKE 'chrome mobile%'
              AND n <= $2
              AND num_cores = $3
            GROUP BY n
            ORDER BY n`,
                [`${type}_benchmarks`, maxN, numCores]
              )
                .then(minSuccessCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
              n, MIN(duration)
            FROM $1:name
            WHERE LOWER(browser) LIKE 'chrome%'
              AND NOT WHERE LOWER(browse) LIKE 'chrome mobile%'
              AND n <= $2
            GROUP BY n
            ORDER BY n`,
                [`${type}_benchmarks`, maxN]
              )
                .then(minSuccessCb(res))
                .catch(errorCb);
            }
          }
        } else if (browser === 'firefox') {
          if (os) {
            if (numCores) {
              db.any(
                `SELECT
              n, MIN(duration)
            FROM $1:name
            WHERE LOWER(browser) LIKE 'firefox%'
              AND NOT WHERE LOWER(browse) LIKE 'firefox mobile%'
              AND LOWER(os) LIKE $2
              AND n <= $3
              AND num_cores = $4
            GROUP BY n
            ORDER BY n`,
                [`${type}_benchmarks`, `${os}%`, maxN, numCores]
              )
                .then(minSuccessCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
              n, MIN(duration)
            FROM $1:name
            WHERE LOWER(browser) LIKE 'firefox%'
              AND NOT WHERE LOWER(browse) LIKE 'firefox mobile%'
              AND LOWER(os) LIKE $2
              AND n <= $3
            GROUP BY n
            ORDER BY n`,
                [`${type}_benchmarks`, `${os}%`, maxN]
              )
                .then(minSuccessCb(res))
                .catch(errorCb);
            }
          } else {
            if (numCores) {
              db.any(
                `SELECT
              n, MIN(duration)
            FROM $1:name
            WHERE LOWER(browser) LIKE 'firefox%'
              AND NOT WHERE LOWER(browse) LIKE 'firefox mobile%'
              AND n <= $2
              AND num_cores = $3
            GROUP BY n
            ORDER BY n`,
                [`${type}_benchmarks`, maxN, numCores]
              )
                .then(minSuccessCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
              n, MIN(duration)
            FROM $1:name
            WHERE LOWER(browser) LIKE 'firefox%'
              AND NOT WHERE LOWER(browse) LIKE 'firefox mobile%'
              AND n <= $2
            GROUP BY n
            ORDER BY n`,
                [`${type}_benchmarks`, maxN]
              )
                .then(minSuccessCb(res))
                .catch(errorCb);
            }
          }
        } else {
          if (os) {
            if (numCores) {
              db.any(
                `SELECT
              n, MIN(duration)
            FROM $1:name
            WHERE LOWER(browser) LIKE $2
              AND LOWER(os) LIKE $3
              AND n <= $4
              AND num_cores = $5
            GROUP BY n
            ORDER BY n`,
                [`${type}_benchmarks`, `${browser}%`, `${os}%`, maxN, numCores]
              )
                .then(minSuccessCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
              n, MIN(duration)
            FROM $1:name
            WHERE LOWER(browser) LIKE $2 AND LOWER(os) LIKE $3 AND n <= $4
            GROUP BY n
            ORDER BY n`,
                [`${type}_benchmarks`, `${browser}%`, `${os}%`, maxN]
              )
                .then(minSuccessCb(res))
                .catch(errorCb);
            }
          } else {
            if (numCores) {
              db.any(
                `SELECT
              n, MIN(duration)
            FROM $1:name
            WHERE LOWER(browser) LIKE $2
              AND n <= $3
              AND num_cores = $4
            GROUP BY n
            ORDER BY n`,
                [`${type}_benchmarks`, `${browser}%`, maxN, numCores]
              )
                .then(minSuccessCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
              n, MIN(duration)
            FROM $1:name
            WHERE LOWER(browser) LIKE $2 AND n <= $3
            GROUP BY n
            ORDER BY n`,
                [`${type}_benchmarks`, `${browser}%`, maxN]
              )
                .then(minSuccessCb(res))
                .catch(errorCb);
            }
          }
        }
      } else {
        if (os) {
          if (numCores) {
            db.any(
              `SELECT
              n, MIN(duration)
            FROM $1:name
            WHERE LOWER(os) LIKE $2 AND n <= $3 AND num_cores = $4
            GROUP BY n
            ORDER BY n`,
              [`${type}_benchmarks`, `${os}%`, maxN, numCores]
            )
              .then(minSuccessCb(res))
              .catch(errorCb);
          } else {
            db.any(
              `SELECT
              n, MIN(duration)
            FROM $1:name
            WHERE LOWER(os) LIKE $2 AND n <= $3
            GROUP BY n
            ORDER BY n`,
              [`${type}_benchmarks`, `${os}%`, maxN]
            )
              .then(minSuccessCb(res))
              .catch(errorCb);
          }
        } else {
          if (numCores) {
            db.any(
              `SELECT
              n, MIN(duration)
            FROM $1:name
            WHERE n <= $2 AND num_cores = $3
            GROUP BY n
            ORDER BY n`,
              [`${type}_benchmarks`, maxN, numCores]
            )
              .then(minSuccessCb(res))
              .catch(errorCb);
          } else {
            db.any(
              `SELECT
              n, MIN(duration)
            FROM $1:name
            WHERE n <= $2
            GROUP BY n
            ORDER BY n`,
              [`${type}_benchmarks`, maxN]
            )
              .then(minSuccessCb(res))
              .catch(errorCb);
          }
        }
      }
    } else {
      if (browser) {
        if (browser === 'chromium based') {
          if (os) {
            if (numCores) {
              db.any(
                `SELECT
                *
              FROM $1:name
              WHERE (
                ${chromiumBasedSqlStr}
                )
                AND LOWER(os) LIKE $2
                AND n <= $3
                AND num_cores = $4`,
                [`${type}_benchmarks`, `${os}%`, maxN, numCores]
              )
                .then(successCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
                *
              FROM $1:name
              WHERE (
                ${chromiumBasedSqlStr}
                )
                AND LOWER(os) LIKE $2
                AND n <= $3`,
                [`${type}_benchmarks`, `${os}%`, maxN]
              )
                .then(successCb(res))
                .catch(errorCb);
            }
          } else {
            if (numCores) {
              db.any(
                `SELECT
                *
              FROM $1:name
              WHERE (
                ${chromiumBasedSqlStr}
                )
                AND n <= $2
                AND num_cores = $3`,
                [`${type}_benchmarks`, maxN, numCores]
              )
                .then(successCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
                *
              FROM $1:name
              WHERE (
                ${chromiumBasedSqlStr}
                )
                AND n <= $2`,
                [`${type}_benchmarks`, maxN]
              )
                .then(successCb(res))
                .catch(errorCb);
            }
          }
        } else if (browser === 'firefox based') {
          if (os) {
            if (numCores) {
              db.any(
                `SELECT
                *
              FROM $1:name
              WHERE LOWER(browser) LIKE 'firefox%'
                AND LOWER(os) LIKE $2
                AND n <= $3
                AND num_cores = $4`,
                [`${type}_benchmarks`, `${os}%`, maxN, numCores]
              )
                .then(successCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
                *
              FROM $1:name
              WHERE LOWER(browser) LIKE 'firefox%'
                AND LOWER(os) LIKE $2
                AND n <= $3`,
                [`${type}_benchmarks`, `${os}%`, maxN]
              )
                .then(successCb(res))
                .catch(errorCb);
            }
          } else {
            if (numCores) {
              db.any(
                `SELECT
                *
              FROM $1:name
              WHERE LOWER(browser) LIKE 'firefox%'
                AND n <= $2
                AND num_cores = $3`,
                [`${type}_benchmarks`, maxN, numCores]
              )
                .then(successCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
                *
              FROM $1:name
              WHERE LOWER(browser) LIKE 'firefox%' AND n <= $2`,
                [`${type}_benchmarks`, maxN]
              )
                .then(successCb(res))
                .catch(errorCb);
            }
          }
        } else if (browser === 'chrome') {
          if (os) {
            if (numCores) {
              db.any(
                `SELECT
                *
              FROM $1:name
              WHERE LOWER(browser) LIKE 'chrome%'
                AND NOT LOWER(browser) LIKE 'chrome mobile%'
                AND LOWER(os) LIKE $2
                AND n <= $3
                AND num_cores = $4`,
                [`${type}_benchmarks`, `${os}%`, maxN, numCores]
              )
                .then(successCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
                *
              FROM $1:name
              WHERE LOWER(browser) LIKE 'chrome%'
                AND NOT LOWER(browser) LIKE 'chrome mobile%'
                AND LOWER(os) LIKE $2
                AND n <= $3`,
                [`${type}_benchmarks`, `${os}%`, maxN]
              )
                .then(successCb(res))
                .catch(errorCb);
            }
          } else {
            if (numCores) {
              db.any(
                `SELECT
                *
              FROM $1:name
              WHERE LOWER(browser) LIKE 'chrome%'
                AND NOT LOWER(browser) LIKE 'chrome mobile%'
                AND n <= $2
                AND num_cores = $3`,
                [`${type}_benchmarks`, maxN, numCores]
              )
                .then(successCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
                *
              FROM $1:name
              WHERE LOWER(browser) LIKE 'chrome%'
                AND NOT LOWER(browser) LIKE 'chrome mobile%'
                AND n <= $2`,
                [`${type}_benchmarks`, maxN]
              )
                .then(successCb(res))
                .catch(errorCb);
            }
          }
        } else if (browser === 'firefox') {
          if (os) {
            if (numCores) {
              db.any(
                `SELECT
                *
              FROM $1:name
              WHERE LOWER(browser) LIKE 'firefox%'
                AND NOT LOWER(browser) LIKE 'firefox mobile%'
                AND LOWER(os) LIKE $2
                AND n <= $3
                AND num_cores = $4`,
                [`${type}_benchmarks`, `${os}%`, maxN, numCores]
              )
                .then(successCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
                *
              FROM $1:name
              WHERE LOWER(browser) LIKE 'firefox%'
                AND NOT LOWER(browser) LIKE 'firefox mobile%'
                AND LOWER(os) LIKE $2
                AND n <= $3`,
                [`${type}_benchmarks`, `${os}%`, maxN]
              )
                .then(successCb(res))
                .catch(errorCb);
            }
          } else {
            if (numCores) {
              db.any(
                `SELECT
                *
              FROM $1:name
              WHERE LOWER(browser) LIKE 'firefox%'
                AND NOT LOWER(browser) LIKE 'firefox mobile%'
                AND n <= $2
                AND num_cores = $3`,
                [`${type}_benchmarks`, maxN, numCores]
              )
                .then(successCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
                *
              FROM $1:name
              WHERE LOWER(browser) LIKE 'firefox%'
                AND NOT LOWER(browser) LIKE 'firefox mobile%'
                AND n <= $2`,
                [`${type}_benchmarks`, maxN]
              )
                .then(successCb(res))
                .catch(errorCb);
            }
          }
        } else {
          if (os) {
            if (numCores) {
              db.any(
                `SELECT
                *
              FROM $1:name
              WHERE LOWER(browser) LIKE $2 AND LOWER(os) LIKE $3
              AND n <= $4
              AND num_cores = $5`,
                [
                  `${type}_benchmarks`,
                  `${browser}%`,
                  `${os}%`,
                  maxN,
                  ,
                  numCores,
                ]
              )
                .then(successCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
                *
              FROM $1:name
              WHERE LOWER(browser) LIKE $2 AND LOWER(os) LIKE $3 AND n <= $4 `,
                [`${type}_benchmarks`, `${browser}%`, `${os}%`, maxN]
              )
                .then(successCb(res))
                .catch(errorCb);
            }
          } else {
            if (numCores) {
              db.any(
                `SELECT
                *
              FROM $1:name
              WHERE LOWER(browser) LIKE $2 AND n <= $3 AND num_cores = $4`,
                [`${type}_benchmarks`, `${browser}%`, maxN, numCores]
              )
                .then(successCb(res))
                .catch(errorCb);
            } else {
              db.any(
                `SELECT
                *
              FROM $1:name
              WHERE LOWER(browser) LIKE $2 AND n <= $3`,
                [`${type}_benchmarks`, `${browser}%`, maxN]
              )
                .then(successCb(res))
                .catch(errorCb);
            }
          }
        }
      } else {
        if (os) {
          if (numCores) {
            db.any(
              `SELECT
              *
            FROM $1:name
            WHERE LOWER(os) LIKE $2 AND n <= $3 AND num_cores = $4`,
              [`${type}_benchmarks`, `${os}%`, maxN, numCores]
            )
              .then(successCb(res))
              .catch(errorCb);
          } else {
            db.any(
              `SELECT
              *
            FROM $1:name
            WHERE LOWER(os) LIKE $2 AND n <= $3`,
              [`${type}_benchmarks`, `${os}%`, maxN]
            )
              .then(successCb(res))
              .catch(errorCb);
          }
        } else {
          if (numCores) {
            db.any(
              `SELECT
              *
            FROM $1:name
            WHERE n <= $2 AND num_cores = $3`,
              [`${type}_benchmarks`, maxN, numCores]
            )
              .then(successCb(res))
              .catch(errorCb);
          } else {
            db.any(
              `SELECT
              *
            FROM $1:name
            WHERE n <= $2`,
              [`${type}_benchmarks`, maxN]
            )
              .then(successCb(res))
              .catch(errorCb);
          }
        }
      }
    }
  };
}

function getSingleBenchmark(type) {
  return function(req, res, next) {
    var benchmarkId = parseInt(req.params.id);
    db.one(
      `SELECT
        *
      FROM $1:name
      WHERE id = $2`,
      [`${type}_benchmarks`, benchmarkId]
    )
      .then(function(data) {
        res.status(200).json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE benchmark',
        });
      })
      .catch(function(err) {
        return next(err);
      });
  };
}

function createBenchmark(type) {
  return function(req, res, next) {
    req.body.duration = parseInt(req.body.duration);
    req.body.n = parseInt(req.body.n);
    req.body.num_cores = parseInt(req.body.num_cores);
    const properties = ['num_cores', 'n', 'duration'];
    properties.forEach(property => {
      req.body[property] = req.body[property] || null;
    });
    req.body.type = `${type}_benchmarks`;

    const agent = useragent.parse(req.headers['user-agent']);
    req.body.browser = agent.toAgent();
    req.body.os = agent.os.toString();

    db.none(
      'INSERT INTO ${type:name} (browser, os, num_cores, n, duration)' +
        'VALUES (${browser}, ${os}, ${num_cores}, ${n}, ${duration})',
      req.body
    )
      .then(function() {
        res.status(200).json({
          status: 'success',
          message: 'Inserted one benchmark',
        });
      })
      .catch(function(err) {
        return next(err);
      });
  };
}

function avgSuccessCb(res) {
  return function(data) {
    const structuredData = {};
    data.forEach(function(item) {
      structuredData[item.n] = item.avg;
    });
    res.status(200).json({
      status: 'success',
      data: structuredData,
      message: 'Retrieved ALL benchmarks',
    });
  };
}

function minSuccessCb(res) {
  return function(data) {
    const structuredData = {};
    data.forEach(function(item) {
      structuredData[item.n] = item.min;
    });
    res.status(200).json({
      status: 'success',
      data: structuredData,
      message: 'Retrieved ALL benchmarks',
    });
  };
}

function successCb(res) {
  return function(data) {
    res.status(200).json({
      status: 'success',
      data: data,
      message: 'Retrieved ALL benchmarks',
    });
  };
}

function errorCb(err) {
  return next(err);
}

module.exports = {
  getAllSyncBenchmarks: getAllBenchmarks('sync'),
  getSingleSyncBenchmark: getSingleBenchmark('sync'),
  createSyncBenchmark: createBenchmark('sync'),
  getAllSyncBusyBenchmarks: getAllBenchmarks('sync_busy'),
  getSingleSyncBusyBenchmark: getSingleBenchmark('sync_busy'),
  createSyncBusyBenchmark: createBenchmark('sync_busy'),
  getAllSyncMemoBenchmarks: getAllBenchmarks('sync_memo'),
  getSingleSyncMemoBenchmark: getSingleBenchmark('sync_memo'),
  createSyncMemoBenchmark: createBenchmark('sync_memo'),
  getAllAsyncBenchmarks: getAllBenchmarks('async'),
  getSingleAsyncBenchmark: getSingleBenchmark('async'),
  createAsyncBenchmark: createBenchmark('async'),
  getAllAsyncBusyBenchmarks: getAllBenchmarks('async_busy'),
  getSingleAsyncBusyBenchmark: getSingleBenchmark('async_busy'),
  createAsyncBusyBenchmark: createBenchmark('async_busy'),
  getAllAsyncMemoBenchmarks: getAllBenchmarks('async_memo'),
  getSingleAsyncMemoBenchmark: getSingleBenchmark('async_memo'),
  createAsyncMemoBenchmark: createBenchmark('async_memo'),
};
