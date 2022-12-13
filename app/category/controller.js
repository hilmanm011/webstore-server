const Category = require('./model')
module.exports ={
    index: async(req,res)=>{
        try {

            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { 
                message: alertMessage, 
                status: alertStatus 
            }

            const category = await Category.find()
            console.log(category);
            res.render('admin/category/view_category',{
                category,
                alert,
                name: req.session.user.name,
                title: 'Halaman Kategori'
            })

        } catch (error) {
            console.log(err);
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', `danger`)
            res.redirect('/category')
        }
    },
    viewCreate : async(req,res)=>{
        try {
            res.render('admin/category/create',{
                name: req.session.user.name,
                title: 'Halaman Buat Kategori'
            })
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', `danger`)
            res.redirect('/category')
        }
    },
    actionsCreate : async(req,res)=>{
        try {
            const { name } = req.body

            let category = await Category({ name })
            await category.save()

            req.flash('alertMessage', `Berhasil tambah kategori`)
            req.flash('alertStatus', `success`)

            res.redirect('/category')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', `danger`)
            res.redirect('/category')
        }
    },
    viewEdit : async(req,res)=>{
        try {
            const { id } = req.params
            let category = await Category.findOne({_id: id})
            console.log(category);
            res.render('admin/category/edit',{
                category,
                name: req.session.user.name,
                title: 'Halaman Ubah Kategori'
            })

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', `danger`)
            res.redirect('/category')
        }
    },
    actionsEdit : async(req,res)=>{
        try {
            const { id } = req.params
            const { name } = req.body

            await Category.findOneAndUpdate({
                _id: id
            },{ name })

            req.flash('alertMessage', `Berhasil ubah kategori`)
            req.flash('alertStatus', `success`)

            res.redirect('/category')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', `danger`)
            res.redirect('/category')
        }
    },
    actionsDelete : async(req,res)=>{
        try {
            const { id } = req.params
            await Category.findOneAndRemove({ _id: id })
            req.flash('alertMessage', `Berhasil hapus kategori`)
            req.flash('alertStatus', `success`)

            res.redirect('/category')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', `danger`)
            res.redirect('/category')
        }
    }
}