const Sequelize = require('sequelize');

const connection = () => {
    try {
        console.log('DB Connect');
        return new Sequelize({
          database: 'qubit-parking',
          username: 'Sebastian Gaspar',
          password: 'MAKseb1818',
          host: '209.209.40.84',
          port: 16907,
          dialect: "postgres",
          dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false 
            }
          },
        });
        // return new Sequelize({
        //     database: 'd9al1ca4d61sq2',
        //     username: 'prvscjlwwnztpj',
        //     password: 'd147b75b7db7b49bc426eaf880964dc503ab77b46136f2a1e175d05d515f322f',
        //     host: 'ec2-54-157-4-216.compute-1.amazonaws.com',
        //     port: 5432,
        //     dialect: "postgres",
        //     dialectOptions: {
        //       ssl: {
        //         require: true,
        //         rejectUnauthorized: false 
        //       }
        //     },
        //   });
        // return new Sequelize(
        //     'qubit-parking',
        //     'postgres',
        //     'root',
        //     {
        //         host: 'localhost',
        //         dialect: 'postgres',
        //         pool: {
        //             max: 5,
        //             min: 0,
        //             require: 3000,
        //             idle: 10000
        //         },
        //         loging: false
        //     }
        // );
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos');
    }
}
module.exports = {
    connection
}