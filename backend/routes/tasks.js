const router = require("express").Router();
const User = require("../model/user");
const auth_verify = require("../middleware/auth_verify");
const { v4: v4ID } = require("uuid");
const moment = require("moment");

router.get("/", (req, res) => {
  res.send("Tasks route");
});

router.get("/getalltasks", auth_verify, (req, res) => {
  const { user_id } = req.body.user_token;

  User.findOne({ user_id })
    .then(async (user) => {
      console.log(user);
      return res.json({
        message: "Target user tasks found",
        user_token: {
          email: user.email,
          userName: user.userName,
          uid: user.uid,
        },
        res_data: { tasks: user?.tasks },
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/addtask", auth_verify, (req, res) => {
  const { user_id } = req.body.user_token;
  const { task_data } = req.body;
  const date = new Date();

  // verify the task data
  if (!task_data.title || !task_data.description) {
    return res.status(400).json({
      message: "Task data is incomplete",
      user_token: { ...req.body.user_token },
      error: { status: true, code: "task_data_incomplete" },
    });
  }

  // function that returns the nextDay of the given date while taking note of the month and year

  function nextDay(date, month, year) {
    let nextDay = new Date();

    // check if the year is a leap year; if yes, then check if the month is february and if the date is greater than 28

    if (year % 4 === 0 && month === 2 && date === 29) {
      if (year % 100 === 0) {
        if (year % 400 === 0) {
          console.log("leap year also");
          nextDay.setDate(
            nextDay.getFullYear() + "-" + (nextDay.getMonth() + 1) + "-" + 1
          );

          return nextDay;
        }
      } else {
        console.log("leap year");
        nextDay.setDate(
          nextDay.getFullYear() + "-" + (nextDay.getMonth() + 1) + "-" + 1
        );

        return nextDay;
      }
    }

    // check if the month has ended and if the date is greater than the number of days in the month

    const daysInMonth = new Date(year, month, 0).getDate();

    if (date > daysInMonth) {
      console.log("month has ended");
      nextDay.setDate(
        nextDay.getFullYear() + "-" + (nextDay.getMonth() + 1) + "-" + 1
      );

      return nextDay;
    }

    nextDay.setDate(
      nextDay.getFullYear() +
        "-" +
        nextDay.getMonth() +
        "-" +
        (nextDay.getDate() + 1)
    );

    console.log(
      nextDay.getFullYear() +
        "-" +
        nextDay.getMonth() +
        "-" +
        (nextDay.getDate() + 1)
    );

    return nextDay;
  }

  // set expiry times to a default value if not provided i.e after 1 day

  if (!task_data.expiry.date || !task_data.expiry.time) {
    // add 1 day to the expiry date
    // task_data.expiry.date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate());
    // task_data.expiry.time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    task_data.expiry.date = moment().add(1, "days").format("YYYY-MM-DD");
    task_data.expiry.time =
      moment().hour() + ":" + moment().minute() + ":" + moment().second();

    // console.log(task_data.expiry.date + " " + task_data.expiry.time);
  }

  const newTask = {
    taskID: v4ID(),
    title: task_data.title,
    // title: "",
    created: moment().format("YYYY-MM-DD HH:mm:ss"),
    description: task_data.description,
    expiry: {
      date: task_data.expiry.date,
      time: task_data.expiry.time
        ? task_data.expiry.time
        : date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
    },
  };

  console.log(`Creating New Task: \n${JSON.stringify(newTask)}`);

  // prevent multiple similar tasks from being created

  User.findOne({ user_id })
    .then(async (user) => {
      if (user) {
        const { tasks } = user;
        const { taskID, title } = newTask;
        const taskIdExists = tasks.created.find(
          (task) => task.taskID === taskID
        );
        const taskTitleExists = tasks.created.find(
          (task) =>
            task.title.trim().toLowerCase() === title.trim().toLowerCase()
        );

        console.log(title);
        console.log(
          tasks.created.map((task) => task.title.trim().toLowerCase())
        );

        if (taskIdExists || taskTitleExists) {
          return {
            code: 400,
            resString: res.status(400).json({
              message: "Task already exists",
              user_token: { ...req.body.user_token },
              error: { status: true, code: "task_already_exists" },
            }),
          };
        }

        return {
          code: 200,
          resString: null,
        };
      } else {
        return {
          code: 400,
          resString: res.status(400).json({
            message: "User not found",
            user_token: { ...req.body.user_token },
            error: { status: true, code: "user_not_found" },
          }),
        };
      }
    })
    .then((res_) => {
      console.log(res_.code);
      if (res_.code === 400) {
        // console.log(res_.resString);
        return res_.resString;
      } else {
        User.updateOne(
          { uid: user_id },
          {
            $push: {
              "tasks.created": newTask,
            },
          }
        )
          .then(() => {
            return res.json({
              message: "Task created",
              user_token: { ...req.body.user_token },
              res_data: { task: newTask },
              error: { status: false, code: null },
            });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({
              message: "Task creation failed",
              user_token: { ...req.body.user_token },
              res_data: null,
              error: { status: true, code: "task_creation_failed" },
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Task creation failed",
        user_token: { ...req.body.user_token },
        res_data: null,
        error: { status: true, code: "task_creation_failed" },
      });
    });
});

module.exports = router;
