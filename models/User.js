const mongoose = require('mongoose')

const userSchema= new mongoose.Schema({

    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    country_isd:{
        type: String,
        required: true
    },
    mobile:{
        type: Number,
        required: true
    },
    address1:{
        type: String,
        required: true
    },
    address2:{
        type: String,
        required: false
    },
    countries:{
        type: [String],
        required: true
    },
    states:{
        type: [String],
        required: true
    },
    zip:{
        type: Number,
        required: true
    },
    accountCreatedOn:{
        type: String,
        required: true,
        immutable: true,
        default: () => { return new Date(Date.now()).toLocaleString('en-IN',{ timeZone: 'Asia/Kolkata'}) }
    }

}, {timestamps: true})

module.exports = mongoose.models.User || mongoose.model('User', userSchema, 'User')