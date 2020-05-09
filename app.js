const express = require('express');
const app = express();
const port = 3000;
const userRoute = require("./routes/user");
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

const db = require('./config/mongo').mongoURI;

mongoose.connect(
        db,
        { useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoute);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))