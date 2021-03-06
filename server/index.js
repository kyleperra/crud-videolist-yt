// * THIS IS THE ENTRYPOINT FOR THE SERVER (NODEMON -- see package.json scripts 'start')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const controllers = require('./controllers');

// this links our server to the dist folder, which will default to index.html when left like this:
app.use(express.static('dist'));
app.use(bodyParser.json());
// allows urlencoded body params
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  console.log(req.method + ' request incurred at ' + req.path);
  next();
});

// get all records from search_history table
app.get('/api/queries', controllers.queries.getAll);

// get last record from search_history table
app.get('/api/queries/last', controllers.queries.getLast);

// get all videos from videos table from a given queryId
app.get('/api/videos/:queryId', controllers.videos.getAll);

// get a video entry from a given queryId and videoId
// app.get('/api/videos/:queryId/:videoId', controllers.videos.getVideo);

// store a query into search_history table
app.post('/api/queries', controllers.queries.storeQuery);

// store all videos returned from a youtube API search query
app.post('/api/videos', controllers.videos.storeVideos);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})