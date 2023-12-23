const express = require('express');
const productsRouter  = require('express').Router();
const fs = require('fs')
const path = require('path')




const myProducts = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'allproducts.json'), 'utf-8'));



productsRouter.get('/', (req, res, next) => {
    try {
        res.json({
            status: 'success',
            data: myProducts
        });
        next();
    } catch (err) {
        console.error(err);  
        res.status(404).json({
            status: 'Fail',
            message: 'bad request'
        });
    }
});


productsRouter.get('/:id', (req, res, next) => {
    const id = req.params.id * 1;

    if (id > myProducts.length) {
        res.status(404).json({ message: 'Invalid Id' });
    } else {
        const product = myProducts.find(el => el.id === id);
        res.json({
            status: 'success',
            data: product
        });
    }

    next();
})



productsRouter.post('/', (req, res, next) => {
    try {
        const newId = myProducts[myProducts.length - 1].id + 1;
        const newProduct = Object.assign({ id: newId }, req.body);

        myProducts.push(newProduct);

        fs.writeFile(path.resolve(__dirname, '..', 'allproducts.json'), JSON.stringify(myProducts), (err) => {
            if (err) {
                res.status(500).json({
                    status: 'fail',
                    message: 'Error writing to file',
                    error: err.message
                });
            } else {
                res.status(201).json({
                    status: 'success',
                    data: newProduct
                });
                next(); 
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: 'Error processing request',
            error: err.message
        });
    }
});



        


productsRouter.put('/:id', (req, res, next) => {
    const updatedProduct = req.body;

    myProducts.push(updatedProduct);

    fs.writeFile(path.resolve(__dirname, '..', 'allproducts.json'), JSON.stringify(myProducts), (err) => {
        if (err) {
            res.status(500).json({
                status: 'fail',
                message: 'Error writing to file',
                error: err.message
            });
        } else {
            res.status(201).json({
                status: 'success',
                data: updatedProduct
            });

            next(); 
        }
    });
});


productsRouter.delete('/:id', (req,res,next)=>{
    try{
    res.json({
        status: "success",
        data: null
    });
    next()
}catch(err){
    res.json({
        status: "fail"
    })
}
})










module.exports = productsRouter