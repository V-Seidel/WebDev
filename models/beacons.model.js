// Modelo para os Beacons:
// name: Nome do dispositivo (Pode ser repetido?)
// MAC_Beacon: Endereço MAC do beacon
// MAC_Local: Endereço MAC da sala local (adicionar futuramente o nome da sala diretamente no lugar)
// RSSI: Valor do RSSI obtido (adicionar futuramente o nível de precisão da posição no lugar)

const mongoose = require('mongoose');

function toLower (v) {
    return v.toLowerCase();
}

const beaconsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        set: toLower
    },
    MAC_Beacon: {
        type: String,
        required: true,
        unique: true
    }, 
    MAC_Local: {
        type: String,
        required: false
    },
    RSSI: {
        type: String,
        required: false
    },
    status: {
        type: Number,
        required: true
    }},
    {
    versionKey: false
});

Beacons = mongoose.model('beacons', beaconsSchema);
