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

function getAllSyncBenchmarks(req, res, next) {
  db.any('SELECT * FROM sync_benchmarks')
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
}

function getSingleSyncBenchmark(req, res, next) {
  var benchmarkId = parseInt(req.params.id);
  db.one('SELECT * FROM sync_benchmarks WHERE id = $1', benchmarkId)
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
}

function createSyncBenchmark(req, res, next) {
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
    'INSERT INTO sync_benchmarks (browser_engine, browser_name, browser_platform, browser_version_1, browser_version_2, num_threads, n, duration)' +
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
}

function getAllSyncBusyBenchmarks(req, res, next) {
  db.any('SELECT * FROM sync_busy_benchmarks')
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
}

function getSingleSyncBusyBenchmark(req, res, next) {
  var benchmarkId = parseInt(req.params.id);
  db.one('SELECT * FROM sync_busy_benchmarks WHERE id = $1', benchmarkId)
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
}

function createSyncBusyBenchmark(req, res, next) {
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
    'INSERT INTO sync_busy_benchmarks (browser_engine, browser_name, browser_platform, browser_version_1, browser_version_2, num_threads, n, duration)' +
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
}

function getAllSyncMemoBenchmarks(req, res, next) {
  db.any('SELECT * FROM sync_memo_benchmarks')
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
}

function getSingleSyncMemoBenchmark(req, res, next) {
  var benchmarkId = parseInt(req.params.id);
  db.one('SELECT * FROM sync_memo_benchmarks WHERE id = $1', benchmarkId)
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
}

function createSyncMemoBenchmark(req, res, next) {
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
    'INSERT INTO sync_memo_benchmarks (browser_engine, browser_name, browser_platform, browser_version_1, browser_version_2, num_threads, n, duration)' +
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
}

function getAllAsyncBenchmarks(req, res, next) {
  db.any('SELECT * FROM async_benchmarks')
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
}

function getSingleAsyncBenchmark(req, res, next) {
  var benchmarkId = parseInt(req.params.id);
  db.one('SELECT * FROM async_benchmarks WHERE id = $1', benchmarkId)
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
}

function createAsyncBenchmark(req, res, next) {
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
    'INSERT INTO async_benchmarks (browser_engine, browser_name, browser_platform, browser_version_1, browser_version_2, num_threads, n, duration)' +
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
}

function getAllAsyncBusyBenchmarks(req, res, next) {
  db.any('SELECT * FROM async_busy_benchmarks')
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
}

function getSingleAsyncBusyBenchmark(req, res, next) {
  var benchmarkId = parseInt(req.params.id);
  db.one('SELECT * FROM async_busy_benchmarks WHERE id = $1', benchmarkId)
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
}

function createAsyncBusyBenchmark(req, res, next) {
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
    'INSERT INTO async_busy_benchmarks (browser_engine, browser_name, browser_platform, browser_version_1, browser_version_2, num_threads, n, duration)' +
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
}

function getAllAsyncMemoBenchmarks(req, res, next) {
  db.any('SELECT * FROM async_memo_benchmarks')
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
}

function getSingleAsyncMemoBenchmark(req, res, next) {
  var benchmarkId = parseInt(req.params.id);
  db.one('SELECT * FROM async_memo_benchmarks WHERE id = $1', benchmarkId)
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
}

function createAsyncMemoBenchmark(req, res, next) {
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
    'INSERT INTO async_memo_benchmarks (browser_engine, browser_name, browser_platform, browser_version_1, browser_version_2, num_threads, n, duration)' +
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
}

module.exports = {
  getAllSyncBenchmarks: getAllSyncBenchmarks,
  getSingleSyncBenchmark: getSingleSyncBenchmark,
  createSyncBenchmark: createSyncBenchmark,
  getAllSyncBusyBenchmarks: getAllSyncBusyBenchmarks,
  getSingleSyncBusyBenchmark: getSingleSyncBusyBenchmark,
  createSyncBusyBenchmark: createSyncBusyBenchmark,
  getAllSyncMemoBenchmarks: getAllSyncMemoBenchmarks,
  getSingleSyncMemoBenchmark: getSingleSyncMemoBenchmark,
  createSyncMemoBenchmark: createSyncMemoBenchmark,
  getAllAsyncBenchmarks: getAllAsyncBenchmarks,
  getSingleAsyncBenchmark: getSingleAsyncBenchmark,
  createAsyncBenchmark: createAsyncBenchmark,
  getAllAsyncBusyBenchmarks: getAllAsyncBusyBenchmarks,
  getSingleAsyncBusyBenchmark: getSingleAsyncBusyBenchmark,
  createAsyncBusyBenchmark: createAsyncBusyBenchmark,
  getAllAsyncMemoBenchmarks: getAllAsyncMemoBenchmarks,
  getSingleAsyncMemoBenchmark: getSingleAsyncMemoBenchmark,
  createAsyncMemoBenchmark: createAsyncMemoBenchmark,
};
