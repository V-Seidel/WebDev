const express = require('express');
const mongoose = require('mongoose');
require('../models/beacons.model');

const router = express.Router();

//----------------------------------Rota visualização dos Beacons---------------------------------------------//
router.get('/', (req, res) => {
    res.render('../views/Beacon/addOrEdit.hbs', {
        viewTitle:'Inserir Beacon'
    });
});


//----------------------------------Rota Criação/Edição dos Beacons---------------------------------------------//
router.post('/', (req, res) => {
    //Verificar se queremos editar ou criar um beacon
    if(req.body._id == "")
    {
        insertRecord(req, res);
    }
    else
    {
        updateRecord(req, res);
    }

});


//----------------------------------Função Editar Beacons---------------------------------------------//
function updateRecord(req, res)
{
    Beacons.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err, doc) => {

        if(!err)
        {
            res.redirect('beacon/list')
        }
        else
        {
            console.log('Ocorreu um erro na edição do dispositivo =>' + err);
            handleError(err, req.body);
            res.render('../views/Beacon/addOrEdit.hbs', {
                viewTitle: 'Atualizar Beacon',
                beacon: req.body
            });
        }
    });
}



//----------------------------------Função Criar Beacons---------------------------------------------//
function insertRecord(req, res)
{
    var beacon = new Beacons();
    
    beacon.name = req.body.name.toLowerCase();
    beacon.MAC_Beacon = req.body.MAC_Beacon;
    beacon.status = 0;

    if(beacon.name == "" || beacon.MAC_Beacon == "")
    {
        res.render('../views/Beacon/addOrEdit.hbs', {
            viewTitle: 'Inserir Beacon',
            error: 'Complete todos os campos',
            beacon: req.body
        });
        return;
    }
    else if(validateMacAdress(beacon.MAC_Beacon)==false)
    {
        res.render('../views/Beacon/addOrEdit.hbs', {
            viewTitle: 'Inserir Beacon',
            error: 'O endereço ' + beacon.MAC_Beacon + ' não é um MAC válido',
            beacon: req.body
        });
        return;
    }
    else
    {
        beacon.save((err, doc) =>{
            if(!err)
            {
                res.redirect('beacon/list');
            }
            else
            {   
                console.log('Ocorreu um erro na criação do dispositivo =>' + err);
                handleError(err, req.body);
                res.render('../views/Beacon/addOrEdit.hbs', {
                    viewTitle: 'Inserir Beacon',
                    beacon: req.body
                });
            }
        });
    }
}


//----------------------------------Função Deletar Beacons---------------------------------------------//



//----------------------------------Rota/Função Visualização lista dos Beacons---------------------------------------------//
router.get('/list', (req, res) => {
    Beacons.find({}).then(list =>{
        res.render('../views/Beacon/list.hbs',{
            list: list.map(oneItem => oneItem.toJSON())
        });
    });
});

module.exports = router;


//----------------------------------Rota/Função Edição dos Beacons---------------------------------------------//
router.get('/:id', (req, res) => {
    Beacons.findById(req.params.id).then(doc =>{
        res.render('../views/Beacon/addOrEdit.hbs', {
            viewTitle: 'Atualizar Beacon',
            beacon: doc.toJSON()
        });
    })
});


//----------------------------------Rota/Função Delete dos Beacons---------------------------------------------//
router.get('/delete/:id',(req,res) => {
    Beacons.findByIdAndRemove(req.params.id,(err,doc) => {
        if(!err){
            res.redirect('/beacon/list');
        }
        else{
            console.log("Ocorreu um erro no processo de deletar beacon " + err);
        }
    })
})



//----------------------------------Funções indiretas---------------------------------------------//
function validateMacAdress(macAddress) //Verificação de um endereço MAC
{
    var regexp = /^[0-9a-f]{1,2}([\.:-])(?:[0-9a-f]{1,2}\1){4}[0-9a-f]{1,2}$/i;
    if(regexp.test(macAddress)) {
        return true;
}   else {
        return false;
    }
}

function handleError(err, body) //Verficação dos erros e correções aplicados ao mongoose
{
    if(err.code == 11000){
        body['duplicateKey'] = "O endereço utilizado já existe"
    }
}
