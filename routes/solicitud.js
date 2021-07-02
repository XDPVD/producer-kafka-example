const express = require('express');
const router = express.Router();

router.get('/contacto',(req,res)=>{
    res.render('formCrearMensaje', {errors: []});
})

router.post('/contacto/', (req,res) => {
    console.log('SUBMIT');
    const {firstName, lastName, 
        dni, telephone, email, reason, comments } = req.body;

    const errors = [];

    if(firstName === undefined || firstName===""){
        errors.push({text: 'Por favor, escriba su nombres'});
    }

    if(lastName === undefined ||lastName ===""){
        errors.push({text: 'Por favor, escriba su nombres'});
    }

    console.log(errors);
    if(errors.length > 0){
        res.render('formCrearMensaje',{
            errors,
            'prevInfo': req.body
        });
    }
    else{
        res.send('Ok');
    }
})

module.exports = router;