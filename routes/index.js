var express = require('express');

var router = express.Router();

var db = require('../queries');

router.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>

    <head>
      <meta name="csrf-token" content="${req.csrfToken()}">
      <title>Explorations in Asynchronicity</title>
      <link rel='shortcut icon' type='image/x-icon' href='./favicon.ico' />
      <script type="text/javascript" src="./bundle.js"></script>
      <script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>
      <link href="https://fonts.googleapis.com/css?family=Arsenal|Oxygen+Mono" rel="stylesheet">
      <link rel="stylesheet" href="./stylesheets/reset.css">
      <link rel="stylesheet" href="./stylesheets/styles.css">
      <link rel="stylesheet" href="./stylesheets/sunburst.css">
      <script defer="" src="https://use.fontawesome.com/releases/v5.0.1/js/all.js"></script>
    </head>

    <body>
      <h1>Explorations in Asynchronicity</h1>
      <div class="subtitle">
        <span>by
          <a href="http://www.matthiasjenny.com">Matthias Jenny</a>
        </span>
        <a href="https://github.com/m1010j/async-explorations/">
          <i class="fab fa-github"></i>
        </a>
      </div>
      <main id="main"></main>
    </body>

    </html>
  `);
});
router.get('/api/sync_benchmarks', db.getAllSyncBenchmarks);
router.get('/api/sync_benchmarks/:id', db.getSingleSyncBenchmark);
router.post('/api/sync_benchmarks', db.createSyncBenchmark);
router.get('/api/sync_busy_benchmarks', db.getAllSyncBusyBenchmarks);
router.get('/api/sync_busy_benchmarks/:id', db.getSingleSyncBusyBenchmark);
router.post('/api/sync_busy_benchmarks', db.createSyncBusyBenchmark);
router.get('/api/sync_memo_benchmarks', db.getAllSyncMemoBenchmarks);
router.get('/api/sync_memo_benchmarks/:id', db.getSingleSyncMemoBenchmark);
router.post('/api/sync_memo_benchmarks', db.createSyncMemoBenchmark);
router.get('/api/async_benchmarks', db.getAllAsyncBenchmarks);
router.get('/api/async_benchmarks/:id', db.getSingleAsyncBenchmark);
router.post('/api/async_benchmarks', db.createAsyncBenchmark);
router.get('/api/async_busy_benchmarks', db.getAllAsyncBusyBenchmarks);
router.get('/api/async_busy_benchmarks/:id', db.getSingleAsyncBusyBenchmark);
router.post('/api/async_busy_benchmarks', db.createAsyncBusyBenchmark);
router.get('/api/async_memo_benchmarks', db.getAllAsyncMemoBenchmarks);
router.get('/api/async_memo_benchmarks/:id', db.getSingleAsyncMemoBenchmark);
router.post('/api/async_memo_benchmarks', db.createAsyncMemoBenchmark);

module.exports = router;
