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

    // verify the task data
    if(!task_data.title || !task_data.description || !task_data.expiry.date || !task_data.expiry.time){
        return res.status(400).json({message: "Task data is incomplete", user_token: {...req.body.user_token}, error: {status: true, code: 'task_data_incomplete'}});
    }


    // function that returns the nextDay of the given date while taking note of the month and year

    function nextDay(date, month, year){
        let nextDay = new Date();

        // check if the year is a leap year; if yes, then check if the month is february and if the date is greater than 28

        if(year % 4 === 0 && month === 2 && date === 29){
            if(year % 100 === 0){
                if(year % 400 === 0){
                    console.log('leap year also');
                    nextDay.setDate(nextDay.getFullYear() + "-" + (nextDay.getMonth() + 1) + "-" + 1);

                    return nextDay;
                }
            }else{
                console.log("leap year");
                nextDay.setDate(nextDay.getFullYear() + "-" + (nextDay.getMonth() + 1) + "-" + 1);

                return nextDay;
            }
        }

        // check if the month has ended and if the date is greater than the number of days in the month

        const daysInMonth = new Date(year, month, 0).getDate();

        if(date > daysInMonth){
            console.log("month has ended");
            nextDay.setDate(nextDay.getFullYear() + "-" + (nextDay.getMonth() + 1) + "-" + 1);

            return nextDay;
        }
        
        nextDay.setDate(nextDay.getFullYear() + "-" + nextDay.getMonth() + "-" + (nextDay.getDate() + 1));

        console.log(nextDay.getFullYear() + "-" + nextDay.getMonth() + "-" + (nextDay.getDate() + 1))

        return nextDay;
    }


    // set expiry times to a default value if not provided i.e after 1 day

    if(!task_data.expiry.date || !task_data.expiry.time){
        // add 1 day to the expiry date
        task_data.expiry.date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate());
        task_data.expiry.time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        

        // console.log(new Date(`${task_data.expiry.date}T${task_data.expiry.time}`));

        // console.log('1995-12-17T03:24:00')
    }

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


// return res.json({message: 'Invalid credentials', user_token: {
//     user: null,
//     token: null,
//     error: {
//         status: true,
//         code: 'invalid_credentials',
//     }
// }});