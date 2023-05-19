//Connect database postgres sequelize 
const {Sequelize} = require ('sequelize');
const database = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host: 'localhost',
        dialect: 'postgres'
    
    }
);

sequelize.authenticate()
.then( () => {
    console.log('successfully connected to PostgresSQL!');
}).catch( (error) => {
    console.log('unable to connect to the Database!');
    console.error(error);
});
sequelize.sync({alter: true});

module.exports = sequelize;
