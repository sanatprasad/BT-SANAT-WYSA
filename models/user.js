const mongoose=require('mongoose');
const time=require("../middlewares/epochTime")
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        validate: {
            validator: function(v) {
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/.test(v);
            },
            message: 'Password must contain at least one letter and one number.'
        }
    },
    accountType: {
        type: Number,
    },
    profile:{
        type:String,
        required:[false]
    },
    dateCreated: {
        type: Number,
        default: time.epochtime()   
    }
});

const userModel=mongoose.model('users',userSchema);

module.exports=userModel;