

const
mongoose = require('mongoose')
bcrypt = require('bcrypt-nodejs')
uniqid = require('uniqid')
userSchema = new mongoose.Schema({
    name: {type: String },
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true },
    user_PhNumber: {type: String},
    user_department: {type: String},
    user_division: {type: String},
    user_supervisor: {type: String},
    user_divisionPhone: {type: String},
    user_imageURL: {type: String}

})


userSchema.methods.generateHash = function(password){
return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}


userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

//checks if password was changed
userSchema.pre('save', function(next) {
    if(this.isModified('password')) {
        this.password = this.generateHash(this.password)
    }
    next()
})


const User = mongoose.model('User', userSchema)
module.exports = User


