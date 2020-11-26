const cors = require("cors");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const movieRoute = require("./routes/movies");
const genreRoute = require("./routes/genres");
const userRoute = require("./routes/users");

const app = express();

//To prevent CORS errors
app.use(cors());

//Connecting mongoDB
const databaseConfig = require("./config/keys");
console.log(databaseConfig);
mongoose.connect(databaseConfig, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Checking the connection to db
var db = mongoose.connection;
db.once("open", () => console.log("Mongo Database is connected now!"));
db.on("error", console.error.bind(console, "connection error:"));

app.use(express.static("./uploads"));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));

//App routes to handle requests
app.use("/api/movies", movieRoute);
app.use("/api/genres", genreRoute); //cache
app.use("/api/users", userRoute);

//Serve our static asset
app.use(express.static("frontend/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});


// var smtpTransport = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   auth: {
//     user: "sahilwasan000@gmail.com",
//     pass: "Sahil@12345"
//   }
// });
//
// app.get('/send',function(req,res){
//   var mailOptions={
//     to : req.query.to,
//     subject : req.query.subject,
//     text : req.query.text
//   };
//
//   console.log(mailOptions);
//
//   smtpTransport.sendMail(mailOptions, function(error, response){
//     if(error){
//       console.log(error);
//       res.end("error");
//     }else{
//       res.send("sent");
//       res.redirect('./index.html');
//     }
//   });
// });
//
// //-------------------------
//
// var messagebird = require('messagebird')('1cSVuw0XFcEDTSRIj0TTFNfEa');
// messagebird.messages.create({
//     originator : '+919953655095',
//     recipients : [ '+918860898362' ],
//     body : '****** This is your otp'
// },
// function (err, response) {
//       if (err) {
//         console.log("ERROR:");
//         console.log(err);
//     } else {
//         console.log("SUCCESS:");
//         console.log(response);
//     }
// });

const port = process.env.PORT || 5000;
console.log(port);
app.listen(port, () => console.log(`Server running on port ${port}`));
module.exports = app;
