var promise = require('bluebird');

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
var connectionString =
  process.env.DATABASE_URL ||
  'postgres://matthias:matthias@localhost:5432/async';
var db = pgp(connectionString);

function getAllBenchmarks(type) {
  return function(req, res, next) {
    db.any(`SELECT * FROM ${type}_benchmarks`)
      .then(function(data) {
        res.status(200).json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL benchmarks',
        });
      })
      .catch(function(err) {
        return next(err);
      });
  };
}

function getSingleBenchmark(type) {
  return function(req, res, next) {
    var benchmarkId = parseInt(req.params.id);
    db.one(`SELECT * FROM ${type}_benchmarks WHERE id = $1`, benchmarkId)
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
    req.body.num_threads = parseInt(req.body.num_threads);
    const properties = [
      'browser_engine',
      'browser_name',
      'browser_platform',
      'browser_version_1',
      'browser_version_2',
      'num_threads',
      'n',
      'duration',
    ];
    properties.forEach(property => {
      req.body[property] = req.body[property] || null;
    });

    db.none(
      `INSERT INTO ${type}_benchmarks (browser_engine, browser_name, browser_platform, browser_version_1, browser_version_2, num_threads, n, duration)` +
        'VALUES (${browser_engine}, ${browser_name}, ${browser_platform}, ${browser_version_1}, ${browser_version_2}, ${num_threads}, ${n}, ${duration})',
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
