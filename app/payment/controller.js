const Payment = require('./model')
const Bank = require('../bank/model')
module.exports ={
    index: async(req,res)=>{
        try {

            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { 
                message: alertMessage, 
                status: alertStatus 
            }

            const payment = await Payment.find().populate('banks')
            console.log(payment)
            res.render('admin/payment/view_payment',{
                payment,
                alert,
                name: req.session.user.name,
                title: 'Halaman Pembayaran'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', `danger`)
            res.redirect('/payment')
        }
    },
    viewCreate : async(req,res)=>{
        try {
            const banks = await Bank.find()
            res.render('admin/payment/create',{
                banks,
                name: req.session.user.name,
                title: 'Halaman Tambah Pembayaran'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', `danger`)
            res.redirect('/payment')
        }
    },
    actionsCreate : async(req,res)=>{
        try {
            console.log(req.body)
            const { type, banks } = req.body

            let payment = await Payment({ type, banks })
            await payment.save()
            .then((resd)=>{
                console.log(resd);
            })
            req.flash('alertMessage', `Berhasil tambah payment`)
            req.flash('alertStatus', `success`)

            res.redirect('/payment')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', `danger`)
            res.redirect('/payment')
        }
    },
    viewEdit : async(req,res)=>{
        try {
            const { id } = req.params
            let payment = await Payment.findOne({_id: id})
            const banks = await Bank.find()
            console.log(payment);
            res.render('admin/payment/edit',{
                payment,
                banks,
                name: req.session.user.name,
                title: 'Halaman Ubah Pembayaran'
            })

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', `danger`)
            res.redirect('/payment')
        }
    },
    actionsEdit : async(req,res)=>{
        try {
            const { id } = req.params
            const { type, banks } = req.body

            await Payment.findOneAndUpdate({
                _id: id
            },{ type, banks })

            req.flash('alertMessage', `Berhasil ubah payment`)
            req.flash('alertStatus', `success`)

            res.redirect('/payment')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', `danger`)
            res.redirect('/payment')
        }
    },
    actionsDelete : async(req,res)=>{
        try {
            const { id } = req.params
            await Payment.findOneAndRemove({ _id: id })
            req.flash('alertMessage', `Berhasil hapus payment`)
            req.flash('alertStatus', `success`)

            res.redirect('/payment')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', `danger`)
            res.redirect('/payment')
        }
    }
}