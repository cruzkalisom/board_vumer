const router = require('express').Router()

router.get('/admin', (req, res) => {
    res.render('admin')
})

module.exports = router