const express = require('express');
const path = require('path');
const app = express();



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ...
app.use('/public', express.static(path.join(__dirname, 'public'))); //middleware static file


// Jalankan server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
