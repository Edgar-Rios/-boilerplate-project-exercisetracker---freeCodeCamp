require('dotenv').config();

const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: false }));
// app.use(express.json())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// MI CODIGO
const router = require('./src/routes/users');
app.use('/api/users', router);


// Error handler
app.use(function (err, req, res, next) {
  if (err) {
    res
      .status(err.status || 500)
      .type("txt")
      .send(err.message || "SERVER ERROR");
  }
});
// 


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
