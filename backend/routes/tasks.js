const router = require('express').Router();
const User = require('../model/user');
const auth_verify = require("../middleware/auth_verify");
const { v4: v4ID} = require("uuid");

router.get('/', (req, res)=>{res.send('Tasks route')});

router.get('/getalltasks', auth_verify, (req, res)=> {
    const { user_id } = req.body.user_token;
    // console.log(req);

    User.findOne({user_id}).then(async(user)=>{
        console.log(user);
        return res.json({message: 'Target user tasks found', user_token: {email: user.email, userName: user.userName, uid: user.uid}, res_data: {tasks: user?.tasks}});
    }).catch((err)=>{
        console.log(err)
    })
});

router.post('/addtask',auth_verify, (req, res) =>{
    const { user_id } = req.body.user_token;
    const { task_data } = req.body;
    const date = new Date();

    // User.findOne({user_id}).then((user)=>{
    //     console.log(user);
    //     return res.json({message: "Target user tasks found", user_token: {email: user.email, userName: user.userName, uid: user.uid}, res_data: {tasks: user?.tasks}})
    // }).catch((err)=>{
    //     console.log(err)
    // })l

    const newTask = {
        taskID: v4ID(),
        title: task_data.title,
        created: Date.now(),
        description: task_data.description,
        expiry: {
            date: task_data.expiry.date,
            time: task_data.expiry.time
        }
    }

    console.log(`Creating New Task: \n${JSON.stringify(newTask)}`);

    // User.updateOne({user_id: user_id}, {
    //     $push: {
    //         tasks: newTask
    //     }
    // })

    res.status(200).send({status: "success", taskData: {...newTask}})
})

module.exports = router;