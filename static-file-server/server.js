const express = require('express');
const serveIndex = require('serve-index');
const app = express();
const port = 3434;

app.use(express.static('public'));
app.use('/', express.static('public/'), serveIndex('public/', {'icons': true}));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
