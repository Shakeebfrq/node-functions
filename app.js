const express = require('express');
const router  = require('express').Router();
const productsRouter = require('./routers/productsRouter')

const app = express();
app.use(express.json())
app.use(router)

const logTimestamp = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Request made to ${req.method} ${req.url}`);
    next(); 
};

app.use(logTimestamp)
router.use('/api/products', productsRouter)


PORT = 3000;
app.listen(PORT,()=>{
    console.log("server started")
});


module.exports = app;