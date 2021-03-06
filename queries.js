var promise = require('bluebird');
var useragent = require('useragent');
var escape = require('pg-escape');

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
  process.env.DATABASE_URL || 'postgres://localhost:5432/async';
var db = pgp(connectionConfig);

function getAllBenchmarks(type) {
  return function(req, res, next) {
    const isAvgMode = req.query.mode === 'avg';
    const isMinMode = req.query.mode === 'min';
    const maxN = req.query.max_n || '45';
    const withWorker = req.query.with_worker;
    let browser;
    if (req.query.browser !== 'undefined') {
      browser = req.query.browser;
    }
    let os;
    if (req.query.os !== 'undefined') {
      os = req.query.os;
    }
    let numCores = parseInt(req.query.num_cores) || undefined;

    const selectStr = escape(
      'SELECT n, ROUND(%s(duration), 2) AS duration ',
      req.query.mode && req.query.mode.toUpperCase()
    );
    const fromStr = escape('FROM %s_benchmarks ', type);
    const whereStrs = [];
    switch (browser) {
      case 'chromium based':
        whereStrs.push(
          "(LOWER(browser) LIKE 'chromium%' " +
            "OR LOWER(browser) LIKE 'chrome%' " +
            "OR LOWER(browser) LIKE 'opera%' " +
            "OR LOWER(browser) LIKE 'uc browser%' " +
            "OR LOWER(browser) LIKE 'samsung mobile%')"
        );
        break;
      case 'firefox based':
        whereStrs.push("LOWER(browser) LIKE 'firefox%'");
        break;
      case 'chrome':
        whereStrs.push(
          "LOWER(browser) LIKE 'chrome%' " +
            "AND NOT LOWER(browser) LIKE 'chrome mobile%'"
        );
        break;
      case 'firefox':
        whereStrs.push(
          "LOWER(browser) LIKE 'firefox%' " +
            "AND NOT LOWER(browser) LIKE 'firefox mobile%'" +
            "AND NOT LOWER(browser) LIKE 'firefox ios%'"
        );
        break;
      case 'firefox mobile':
        whereStrs.push(
          "(LOWER(browser) LIKE 'firefox mobile%'" +
            "OR LOWER(browser) LIKE 'firefox ios%')"
        );
        break;
      case 'opera':
        whereStrs.push(
          "LOWER(browser) LIKE 'opera%' " +
            "AND NOT LOWER(browser) LIKE 'opera mobile%'"
        );
        break;
      case 'undefined':
      case undefined:
        break;
      default:
        whereStrs.push(escape("LOWER(browser) LIKE '%s%%'", browser));
    }
    if (withWorker && withWorker !== 'undefined') {
      whereStrs.push(escape('with_worker = %s', withWorker));
    }
    if (os !== undefined && os !== 'linux') {
      whereStrs.push(escape("LOWER(os) LIKE '%s%%'", os));
    } else if (os === 'linux') {
      whereStrs.push("(LOWER(os) LIKE 'linux%' OR LOWER(os) LIKE 'ubuntu%')");
    }
    whereStrs.push(escape('n <= %s', `${maxN}`));
    if (numCores !== undefined) {
      whereStrs.push(escape('num_cores = %s', `${numCores}`));
    }
    const groupAndOrderStr = ' GROUP BY n ORDER BY n';

    if (isAvgMode || isMinMode) {
      const queryStr =
        selectStr +
        fromStr +
        ' WHERE ' +
        whereStrs.join(' AND ') +
        groupAndOrderStr;
      if (isAvgMode) {
        db.any(queryStr)
          .then(avgOrMinSuccessCb(res))
          .catch(errorCb);
      } else if (isMinMode) {
        db.any(queryStr)
          .then(avgOrMinSuccessCb(res))
          .catch(errorCb);
      }
    } else {
      if (!req.query.max_n) {
        whereStrs.pop();
      }
      let queryStr = 'SELECT * ' + fromStr;
      if (whereStrs.length) {
        queryStr += ' WHERE ' + whereStrs.join(' AND ');
      }
      db.any(queryStr)
        .then(successCb(res))
        .catch(errorCb);
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
    const properties = ['num_cores', 'n'];
    properties.forEach(property => {
      req.body[property] = req.body[property] || null;
    });
    req.body.duration = req.body.duration || 0;
    req.body.with_worker = req.body.with_worker || false;
    req.body.type = `${type}_benchmarks`;

    const agent = useragent.parse(req.headers['user-agent']);
    req.body.browser = agent.toAgent();
    req.body.os = agent.os.toString();

    db.none(
      'INSERT INTO ${type:name} (browser, os, num_cores, n, duration, with_worker)' +
        'VALUES (${browser}, ${os}, ${num_cores}, ${n}, ${duration}, ${with_worker})',
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

function avgOrMinSuccessCb(res) {
  return function(data) {
    const structuredData = {};
    data.forEach(function(item) {
      structuredData[item.n] = item.duration;
    });
    res.status(200).json({
      status: 'success',
      data: structuredData,
      message: 'Retrieved benchmarks',
    });
  };
}

function successCb(res) {
  return function(data) {
    res.status(200).json({
      status: 'success',
      data: data,
      message: 'Retrieved benchmarks',
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
