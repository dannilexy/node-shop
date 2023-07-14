const express = require('express');
const router = express.Router();
router.get("/", (req, res, next) => {
    res.status(200).json({
        message : "Orders retrieved!"
    })
})

router.post("/", (req, res, next) => {
    var order = {
        productId : req.body.productId,
        quantity: req.body.quantity,
    }
    res.status(201).json({
        message : "Order Created!",
        order: order
    })
})

router.get("/:orderId", (req, res, next) => {
    res.status(200).json({
        message : "Order Details!",
        orderId : req.params.orderId
    })
})

router.delete("/:orderId", (req, res, next) => {
    res.status(200).json({
        message : "Order Deleted!",
        orderId : req.params.orderId
    })
})

module.exports = router;