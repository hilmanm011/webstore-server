const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

let playerSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Email harus diisi']
    },
    name: {
        type: String,
        require: [true, 'Nama harus diisi'],
        maxlength: [225,'Panjang nama harus antara 3 - 225 karakter'],
        minlength: [3,'Panjang nama harus antara 3 - 225 karakter']
    },
    username: {
        type: String,
        require: [true, 'Nama harus diisi'],
        maxlength: [225,'Panjang nama harus antara 3 - 225 karakter'],
        minlength: [3,'Panjang nama harus antara 3 - 225 karakter']
    },
    password: {
        type: String,
        require: [true, 'Password harus diisi'],
        maxlength: [225,'Panjang password maksimal 225 karakter'],
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    avatar: {
        type: String
    },
    fileName: {
        type: String
    },
    phoneNumber: {
        type: String,
        require: [true, 'Nomor Hp harus diisi'],
        maxlength: [13,'Panjang nomor hp harus antara 9 - 13 karakter'],
        minlength: [9,'Panjang nomor hp harus antara 9 - 13 karakter']
    },
    favorite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
}, { timestamps: true } )



playerSchema.path('email').validate(async(value)=>{
    try {
        const count = await mongoose.model('Player').countDocuments({ email: value })
        // console.log(count);
        return !count
    } catch (err) {
        throw err
    }
}, attr => `${attr.value} sudah terdaftar`)

playerSchema.pre('save', function(next){
    console.log(this.password)
    this.password = bcrypt.hashSync(this.password);
    next()
})

module.exports = mongoose.model('Player', playerSchema)