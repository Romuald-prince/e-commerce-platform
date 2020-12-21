// Require
const express= require("express");
const mongoose= require("mongoose");
const Order= mongoose.model("Order");


var router= express.Router();
mongoose.set("useFindAndModify",false);
// Router
router.get("/", function(req, res){
    res.render("menu");
});
router.get("/cart", function(req, res){
    res.render("cart");
});
router.get("/order", function(req, res){
    res.render("order");
});
router.get("/admin", function(req, res){
    Order.find(function(err, docs){
if(!err){
    res.render("admin",{
      order:docs  
    });
}else{
          console.log("error in order: " + err);  
}
    });
});
router.get("/order/:id", function(req, res){
    Order.findById(req.params.id, (err, doc) => {
            if (!err) {
                res.render("order", { order: doc });
            } else {
                console.log("error findById: " + err);
            }
        });
});
router.get("/order/delete/:id", function(req, res){
Order.findByIdAndRemove(req.params.id, function(err, doc){
if(!err){
    res.redirect("/admin");
}else{
    console.log("error in delete: " + err);
}
});
});

// POST

router.post("/cart", function(req, res){
    insertOrder(req, res);
});
router.post("/order", function(req, res){
    updateOrder(req, res);
});

// Function
function updateOrder(req, res){
    Order.findOneAndUpdate({_id:req.body._id}, req.body,{new:true},function(err, doc){
        if(!err){
            res.redirect("/admin");
        }else{
           console.log("Update error  " + err); 
        }
    });
}
    function insertOrder(req, res) {
        var d= new Date();
        var t= d.getTime();
        var counter= t;
        counter+=1;
        var order = new Order();
        order.total = req.body.total;
        order.order= counter;
        order.save(function(err, doc){
            if(!err){
                console.log("order: " +order);
                res.redirect("/admin");
            }else{
                console.log("error insertOrder: " + err);
            }
        });
    }


module.exports=router;
