const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require("../modules/product");

router.get('/', (req, res, next) => {
   Product.find()
   .exec()
   .then(doc => {
    console.log(doc);
    res.json(doc).status(200);
   })
   .catch(err => {
    console.log(err);
    res.status(500).json(err);
   });
});

router.post('/', (req, res, next) => {
       var product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    });
    product.save().then(result =>{
        console.log(result);
    }).catch(err => {
        console.log(err);
    });
    res.status(200).json({
        message: "Handling POST Request to products",
        createdProduct: product
    });
});

router.get("/:productId", (req, res, next)=>{
    var id = req.params.productId;
    Product.findById(id)
   .exec()
   .then( doc =>{
    console.log(doc);
   res.status(200).json(doc);
   })
   .catch(err =>{
    console.log(err);
   });
});

router.put("/:productId", (req, res, next)=>{
    var id = req.params.productId;
    const update = {
        name: req.body.name,
        price:req.body.price
    }
    Product.findByIdAndUpdate({_id : id}, 
        update, {new: true}
        ).exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:{
                message: "An error occured while updating record."
            }
        });
    });
    
});

router.delete("/:productId", (req, res, next)=>{
    const id = req.params.productId;
   Product.deleteOne({_id : id})
   .exec()
   .then(result =>{
    console.log(result);
    res.status(200).json(result);
   })
   .catch(err => {
    console.log(err);
    res.status(500).json(err);
   });
    
});
module.exports = router;
