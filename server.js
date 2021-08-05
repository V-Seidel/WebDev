const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHandlebars = require('express-handlebars');
const mongoose = require('mongoose');

//----------------------------Requires necessários---------------------------------------------//

require('./models/db');
const beaconController = require('./controller/beaconController');
const searchController = require('./controller/searchController');
const adminController = require('./controller/adminController');

//----------------------------Express/Static configuração---------------------------------------------//

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

//----------------------------Configuração das views de hbs---------------------------------------------//

app.set('views', path.join(__dirname,'views'));

app.engine('hbs', expressHandlebars({
  extname: 'hbs',
  defaultLayout: 'index',
  layoutsDir: __dirname + '/views/layouts'
}));

app.set('view engine', 'hbs');


//----------------------------------Server---------------------------------------------//

app.listen(3000, () => console.log('Ouvindo na porta 3000!'))

//Rota para a página os controles do beacon
app.use('/beacon', beaconController);

//Rota para a página inicial de pesquisa
app.use('/', searchController);

//Rota para a página de administração
app.use('/admin',adminController);