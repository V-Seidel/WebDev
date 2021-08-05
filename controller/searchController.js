const express = require('express');
const mongoose = require('mongoose');
require('../models/beacons.model');

const router = express.Router();


//----------------------------------Rota Visualização da página---------------------------------------------//
router.get('/', (req, res) => {
    res.render('../views/search.hbs');
});

router.post('/', (req, res) => {

    searchBar(req, res);

});


//----------------------------------Função Barra de pesquisa---------------------------------------------//
function searchBar(req, res){
    let hint = "";
    let response = "";
    let searchQ = req.body.query.toLowerCase();

    if(searchQ.length > 0){
    Beacons.find(function(err,results){
        if(err){
        console.log(err);
        }
        else{
        results.forEach(function(result){
            if(result.name.indexOf(searchQ) != -1){
                if(hint === ""){
                    hint = "<a onclick='callName(this.innerHTML)'>" + result.name + "</a>";
                }
                else{
                    hint = hint + "<br /> <a onclick='callName(this.innerHTML)'>" + result.name + "</a>";
                }
        }
        })
    }
    if(hint===""){
        response = "";
    }else{
        response = hint;
    }

    res.send({response: response});
    })
    }
};

module.exports = router;
