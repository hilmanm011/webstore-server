const User = require('./model')
const bycript = require('bcryptjs')
module.exports ={
    viewSignin: async(req,res)=>{
        try {

            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { 
                message: alertMessage, 
                status: alertStatus 
            }
            if (req.session.user === null || req.session.user === undefined) {
                res.render('admin/users/view_signin',{
                    alert,
                    title: 'Halaman Signin'
                })
            } else {
                res.redirect('/dashboard')
            }
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', `danger`)
            res.redirect('/')
        }
    },
    actionSignin : async(req,res)=>{
        try {
            const { email, password } = req.body
            let check = await User.findOne({ email : email })
            if (check) {
                if (check.status === 'Y') {
                    const checkPassword = await bycript.compare(password, check.password)
                    console.log(checkPassword);
                    if (checkPassword) {

                        req.session.user = {
                            id: check._id,
                            email: check.email,
                            status: check.status,
                            name: check.name
                        }

                        res.redirect('/dashboard')
                    }
                } else {
                    req.flash('alertMessage', `Mohon maaf status anda belum aktif`)
                    req.flash('alertStatus', `danger`)
                    res.redirect('/')
                }
            } else {
                req.flash('alertMessage', `Email yang anda inputkan salah`)
                req.flash('alertStatus', `danger`)
                res.redirect('/')
            }

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', `danger`)
            res.redirect('/')
        }
    },
    actionsLogout : async(req,res)=>{
        req.session.destroy()
        res.redirect('/')
    }
}