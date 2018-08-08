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
    db.any('SELECT * FROM $1:name', `${type}_benchmarks`)
      .then(function(data) {
        res.status(200).json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL benchmarks',
        });
      })
      .catch(function(err) {
        return next(err);
      })
      .catch(function(err) {
        return next(err);
      });
  };
}

function getSingleBenchmark(type) {
  return function(req, res, next) {
    var benchmarkId = parseInt(req.params.id);
    db.one('SELECT * FROM $1:name WHERE id = $2', [
      `${type}_benchmarks`,
      benchmarkId,
    ])
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
    const properties = [
      'num_cores',
      'n',
      'duration',
    ];
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
