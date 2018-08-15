var express = require('express');
var csurf = require('csurf');
var mcache = require('memory-cache');
var useragent = require('useragent');

var router = express.Router();

var csrfMiddleware = csurf({
  cookie: true,
});

var db = require('../queries');

var cache = function(duration) {
  return function(req, res, next) {
    let key = '__express__' + req.originalUrl || req.url;
    let cachedBody = mcache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = function(body) {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

router.get('/', csrfMiddleware, function(req, res) {
  const os = useragent.parse(req.headers['user-agent']).os.toString();
  const isMobile = os.slice(0, 3) === 'iOS' || os.slice(0, 7) === 'Android';

  res.render('index', {
    title: 'Explorations in Asynchronicity',
    csrf: req.csrfToken(),
    agreedToPivacyNotice: req.cookies.agreed_to_privacy_notice,
    isMobile: isMobile,
  });
});
router.get('/agree_to_privacy_notice', function(req, res) {
  res.cookie('agreed_to_privacy_notice', true);
  res.status(200).json({
    status: 'success',
    message: 'Successfully agreed to privacy notice',
  });
});
router.get('/api/sync_benchmarks', cache(10), db.getAllSyncBenchmarks);
router.get('/api/sync_benchmarks/:id', cache(10), db.getSingleSyncBenchmark);
router.post('/api/sync_benchmarks', csrfMiddleware, db.createSyncBenchmark);
router.get('/api/sync_busy_benchmarks', cache(10), db.getAllSyncBusyBenchmarks);
router.get(
  '/api/sync_busy_benchmarks/:id',
  cache(10),
  db.getSingleSyncBusyBenchmark
);
router.post(
  '/api/sync_busy_benchmarks',
  csrfMiddleware,
  db.createSyncBusyBenchmark
);
router.get('/api/sync_memo_benchmarks', cache(10), db.getAllSyncMemoBenchmarks);
router.get(
  '/api/sync_memo_benchmarks/:id',
  cache(10),
  db.getSingleSyncMemoBenchmark
);
router.post(
  '/api/sync_memo_benchmarks',
  csrfMiddleware,
  db.createSyncMemoBenchmark
);
router.get('/api/async_benchmarks', cache(10), db.getAllAsyncBenchmarks);
router.get('/api/async_benchmarks/:id', cache(10), db.getSingleAsyncBenchmark);
router.post('/api/async_benchmarks', csrfMiddleware, db.createAsyncBenchmark);
router.get(
  '/api/async_busy_benchmarks',
  cache(10),
  db.getAllAsyncBusyBenchmarks
);
router.get(
  '/api/async_busy_benchmarks/:id',
  cache(10),
  db.getSingleAsyncBusyBenchmark
);
router.post(
  '/api/async_busy_benchmarks',
  csrfMiddleware,
  db.createAsyncBusyBenchmark
);
router.get(
  '/api/async_memo_benchmarks',
  cache(10),
  db.getAllAsyncMemoBenchmarks
);
router.get(
  '/api/async_memo_benchmarks/:id',
  cache(10),
  db.getSingleAsyncMemoBenchmark
);
router.post(
  '/api/async_memo_benchmarks',
  csrfMiddleware,
  db.createAsyncMemoBenchmark
);

module.exports = router;
