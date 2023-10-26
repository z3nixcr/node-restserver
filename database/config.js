const mongoose = require('mongoose')

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.MANGODB_CONN)
        console.log('DB connected and working...');

    } catch(error) {
        console.log(error);
        throw new Error('DB initialization failed')
    }

}

module.exports = {
    dbConnection
}