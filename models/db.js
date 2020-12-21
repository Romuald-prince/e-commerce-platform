const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ecommerceOrders",{useNewUrlParser:true, useUnifiedTopology: true}, function(err)
{
    if(!err) {
console.log("MongoDB connected");
    }else{
console.log("errors" + err);
    }

});
require("./order.model");
