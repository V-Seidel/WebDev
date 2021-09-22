// Conexão e configuração do banco de dados

const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://Seidel:password@cluster0.nenbp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{useUnifiedTopology:true, useNewUrlParser:true}, (err) => {
    if(!err){
        console.log('Conexão com o banco de dados estabelecida.');
    }
    else {
        console.log('Erro ocorrido na conexão:'+ err);
    }
});

// Incluindo os modelos 

require('./beacons.model'); //Schema dos Beacons
