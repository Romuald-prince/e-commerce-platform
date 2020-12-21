require("./models/db");
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");
const orderController = require("./controllers/orderController");

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname,"/public")));
app.set("views",path.join(__dirname,"views"));
app.engine("hbs", exphbs({
extname: "hbs",
defaultLayout: "mainLayout",
layoutsDir:__dirname+ "/views/",
runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}));
app.set("view engine", "hbs");




let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function(){
    console.log("Server has started successfully");
});
app.use("/", orderController);
