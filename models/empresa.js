const Sequelize = require('sequelize');
const { connection } = require('../database/config');


const sequelize = connection()

const Empresa = sequelize.define('empresas', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    nombre: {
        type: Sequelize.TEXT
    },
    nit: {
        type: Sequelize.TEXT,
    },
    telefono:{
        type: Sequelize.TEXT,
    },
    correo: {
        type: Sequelize.TEXT
    },
    clienteId:{
        type: Sequelize.INTEGER
    },
}, {
    timestamps: false
});

module.exports = {
    Empresa
};
