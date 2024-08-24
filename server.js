// loading .env file creds
if (process.env.NODE_ENV !== 'production') {
     require('dotenv').config()
}

// Variables Initialization
const stripeSecretkey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000; 

// Middlewares
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
// DataBase Connection
mongoose.connect(process.env.MONGODBURI).then(()=>{
  console.log(`Successfully Logged to The DataBase..`);
}).catch((err)=>{
  console.log(err.message);
});
// Application listenining Gateway PORT
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});


app.get('/', (req, res) => {
    res.render('index');
});


app.get('/store', (req, res) => {
    fs.readFile('items.json', (err, data)=> {
        if (err) {
            res.status(500).end()
        } else {
          res.render('store.ejs', {
            stripePublicKey: stripePublicKey,
            items: JSON.parse(data)
          });
        }
    });
});