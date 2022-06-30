const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const userRoutes = require("./Routes/users");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on("errror", (error) => console.log(error));
connection.once("open", () => console.log("Connected to MongoDB"));

app.get('/', (req,res) => {
    res.send('The page is woring fine');
});

app.use('/users', userRoutes);

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});


