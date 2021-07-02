const express = require('express');

// Initializations
const app = express();
const router = require('./routes/solicitud');

// Settings
app.set('view engine','ejs');
app.set('port', process.env.PORT || 3005);

// Middlewares

app.use(express.json());
app.use(express.urlencoded());

app.use(router);

app.use(express.static('public'));

// Global Variables

// Routes

// Static Files

// Server is listening
app.listen(app.get('port'), () =>{
    console.log('Server on port ',app.get('port'));
});