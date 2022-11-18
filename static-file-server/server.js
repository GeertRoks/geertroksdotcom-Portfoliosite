const express = require('express');
const serveIndex = require('serve-index');
const app = express();
const port = 3434;

app.use(express.static('public'));
app.use('/images', express.static('public/images'), serveIndex('public/images', {'icons': true}));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
