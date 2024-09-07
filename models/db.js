const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('paciente', 'postgres', '', {
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    dialect: 'postgres'});

async function connectDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        throw new Error(`Unable to connect to the database: ${error.message}`);
    }
}
connectDatabase();
module.exports = sequelize;