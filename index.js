require('dotenv').config();
const bodyParser = require('body-parser');
const dbConnect = require('./config/dbConnect.js');
const { notFound, errorHandler } = require("./middlewares/errorHandler")
const express = require('express');
const app = express();
const port = process.env.PORT
const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productRoute');
const articleblogRouter = require("./routes/articleblogRoute");
const cookieParser= require("cookie-parser");
const jwt=require('jsonwebtoken');
const morgan= require("morgan");

dbConnect();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/user',authRouter);
app.use('/api/product',productRouter);
app.use('/api/blog',articleblogRouter);
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})