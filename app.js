const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

 const uri = 'mongodb+srv://dannilexy:root@cluster0.xjzlv2s.mongodb.net/?retryWrites=true&w=majority';

    mongoose.connect(uri, {useNewUrlParser: true});
    mongoose.connection.once('open', function(){
      console.log('Conection has been made!');
    }).on('error', function(error){
        console.log('Error is: ', error);
    });


const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Adding CORS
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Orign, X-Requested-With, Content-Type, Accept, Authorization');
    // res.header('Access-Control-Allow-Headers', '*');
    if(req.method === "OPTIONS"){
        req.header('Access-Control', 'PUT ,GET, PATCH, DELETE, POST');
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


app.use((request, response, next) =>{
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;