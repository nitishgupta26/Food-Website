// Express is a web application framework for JS
const express = require("express");
const path = require("path");
const app = express();
const fs = require('fs');
const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://admin-mishalgupta:M2001$upta@cluster0-31tcr.mongodb.net/kitchen24', { useNewUrlParser: true });
mongoose.connect('mongodb+srv://nitish26:nitishmongodb123@cluster0.3ogir.mongodb.net/?retryWrites=true&w=majority' ,{ useNewUrlParser: true });
const port = process.env.PORT || 3000;

// define mongoose  scheme
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    order: String
});

var Order = mongoose.model('Order', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))// For serving static files
app.use(express.urlencoded());//ye form ka data express tak lane mai help karta hai

app.set('view engine', 'pug');// Set the template engine as html
app.set('views', path.join(__dirname, 'views'));// Set the views directory

//END POINTS
app.get('/', (req, res) => {
    const con = 'Best Online Food Delivery Service in India | Kitchen24.com'
    const params = { 'title': 'Best Online Food Delivery Service in India | Kitchen24.com'}
     // render isliye use kar rahe hai send ki jagh ku ki hum yaha pug use kar rahe hai
    res.status(200).render('kitchen.pug',params);
});

app.post('/', (req, res) => {
    // object banayega and then save karega data  and promise return karega
     var myData = new Order(req.body);
    myData.save().then(() => {
        res.send("Your order is Sucessfully Done 👍");
    }).catch(() => {
        res.status(400).send("Order Failed!")
     });
})

//START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});