const mongoose = require('mongoose');

const connectDB = ()=>{
    mongoose.connect('mongodb://mongo:27017/login',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(()=>{
        console.log('Connected succesfully to DB')
    })
    .catch(err => console.log({
        'Error': 'Something gone wrong when try connected to db'
    }))
    
}

module.exports = connectDB;