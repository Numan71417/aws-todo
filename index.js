const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri);

const itemSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model('Item', itemSchema);

app.get('/', async (req, res) => {
    try {
        const foundItems = await Item.find({});
        res.render('index', { items: foundItems });
    } catch (err) {
        console.log(err);
        res.send('An error occurred');
    }
});

app.post('/', async (req, res) => {
    const itemName = req.body.newItem;
    const item = new Item({
        name: itemName
    });
    await item.save();
    res.redirect('/');
});

app.post('/delete', async (req, res) => {
    const checkedItemId = req.body.checkbox;
    try {
        
        await Item.findOneAndDelete({_id:checkedItemId});
        console.log('Successfully deleted checked item.');
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.send('An error occurred');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
