const router = require('express').Router();
const User = require('../model/user');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {res.send('Auth route')});

router.post('/login', (req, res) => {
    const {email, password} = req.body;

    User.findOne({email}).then(async (user) => {
        console.log('user', user);
        if(user){
            if (user?.password && await bycrypt.compare(password, user?.password)){
                const token = jwt.sign({user_id: user.uid, email: `${user.email}`, userName: `${user.userName}`}, process.env.TOKEN_KEY ?? 'wpqofdjamcliveqjdmxzw', {expiresIn: '1h'});
                console.log(token)
                return res.json({message: `Successful Login`,user_token: {user, token, error: {status: false, message: null, code: null}}});
            } else {
                return res.json({message: 'Invalid credentials', user_token: {
                    user: null,
                    token: null,
                    error: {
                        status: true,
                        code: 'invalid_credentials',
                    }
                }});
            }
        } else {
            return res.json({
                message: 'User not found',
                user_token: {
                    token: null,
                    error: {
                        status: true,
                        code: 'user_not_found'
                    }
                }
            })
        }
    }).catch(err => {
        console.log(err);
    });
})

router.post('/register', async (req, res) => {
    const {email, userName, password} = req.body;
    let existing_userStatus = false;

    console.log({
        email,
        userName,
        password
    })

    // check if user already exists
    User.findOne({'email': email}, async(err, user) => {
        if(err){
            console.log(err);
            return res.json({error: {status: true, code: 'db_error'}});
        }
        if (user !== null) {
            console.log('user already exists');
            existing_userStatus = true;
            return res.status(400).json({message: 'User already exists', user_token: {
                user: null,
                token: null,
                error: {status: true, code: 'user_exists'}
            }});
        } else {
                // generate a uid for each new user
                const uid = Math.random().toString(36).substring(2, 15) + `Tercy` + Math.random().toString(36).substring(2, 15);

                console.log(uid);
            
                // encrypt password
            
                const encryptedPassword = await bycrypt.hash(password, 10);
            
                const user = new User({email, userName, password: encryptedPassword, uid});
            
                user.save().then((r)=>{
                    // create a JWT token for the user
            
                    const token = jwt.sign(
                        {user_id: user.uid, email: `${user.email}`, userName: `${user.userName}`},
                        process.env.TOKEN_KEY ?? 'wpqofdjamcliveqjdmxzw',
                        {expiresIn: '1h'}
                    )
            
                    console.log(r);
                    return res.json({message: 'user created', user_token: {
                        ...user?._doc,
                        token,
                        error: {status: false, code: null}
                    }});
                }).catch((err)=>{
                    console.log(err);
                    return res.status(400).json({message: 'Error creating user', user_token: {
                        token: null,
                        error: {status: true, code: 'db_error'}
                    }});
                });
        }
    }).clone().catch(err => {
        console.log(err);
        return res.status(400).json({message: 'Error creating user', user_token: {
            token: null,
            error: {status: true, code: 'db_error'}
        }});
    })


});


module.exports = router;