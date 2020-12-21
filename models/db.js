const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://adminP:test123@cluster0.trqxw.mongodb.net/ecommerceOrders",{useNewUrlParser:true, useUnifiedTopology: true}, function(err)
{
    if(!err) {
console.log("MongoDB connected");
    }else{
console.log("errors" + err);
    }

});
require("./order.model");
