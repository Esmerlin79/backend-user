const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        
        await mongoose.connect( process.env.CNN, { 
            retryWrites: true, 
            w: 'majority' 
        });

        console.log('Database online')
    } catch (error) {
        console.log(error);
        throw new Error('Failed to connect to the database');
    }
}

module.exports = {
    dbConnection
}