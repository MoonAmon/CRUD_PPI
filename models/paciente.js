const {DataTypes} = require('sequelize');
const sequelize = require('./db');

const Paciente = sequelize.define('paciente', {
        cpf: {
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        nomeCompleto: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        idade: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        diaMarcado: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        horaMarcada: {
            type: DataTypes.TIME,
            allowNull: false,
        },
    },
    {
        tableName: 'paciente',
        timestamps: true,
    });
module.exports = Paciente;
