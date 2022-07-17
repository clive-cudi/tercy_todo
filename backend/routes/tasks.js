const router = require('express').Router();
const User = require('../model/user');
const auth_verify = require("../middleware/auth_verify");

router.get('/', (req, res)=>{res.send('Tasks route')});

router.get('/getalltasks', auth_verify, (req, res)=> {
    const user_id = req.body.user_token;
    // console.log(req);

    User.findOne({user_id}).then(async(user)=>{
        console.log(user);
        return res.json({message: 'Target user tasks found', user_token: {}})
    }).catch((err)=>{
        console.log(err)
    })
})

module.exports = router;