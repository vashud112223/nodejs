const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");
const { authRouter } = require("./routes/auth");
const { profileRouter } = require("./routes/profile");
const { requestRouter } = require("./routes/request");
const { userRouter } = require("./routes/user");
const cors = require("cors")

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials:true,
}));

app.use(express.json()); // this is use as middleware to convert the json into javascript object.

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter)

// get user by email

// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     const user = await User.find({ emailId: userEmail });
//     if (user.length === 0) {
//       res.status(404).send("User not found");
//     } else {
//       res.send(user);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });
//Feed Api - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({});
    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     const user = await User.findOne({ emailId: userEmail });
//     if (!user) {
//       res.status(404).send("User not found");
//     } else {
//       res.send(user);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

app.get("/userid", async (req, res) => {
  const userId = req.body._id;
  try {
    const user = await User.findById({ _id: userId });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Delete the user
app.delete("/delete", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId }); // or (userId) both work
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send("user deleted successfully");
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Update the user

app.patch("/update/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const Allowed_Update = ["age", "firstName", "lastName", "skills", "gender"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      Allowed_Update.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("skiils cannot be greater than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);

    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send("Update failed:" + err.message);
  }
});

// app.use('/',(req,res)=> {
//     res.end("namaste")
// })

// after the / whatever path we will give it still give the same output because it starts with /
// order matters here
// app.use('/hello',(req,res)=> {
//     res.end("Hello from the server")
// })
// if we use (use) it will matches all the http methods

app.get("/user", userAuth, (req, res) => {
  console.log(req.query);
  res.send({ firstname: "Ashu", lastname: "verma" });
});

// app.use('/route',rh,[rh2,rh3],rh4) rh-route handler
app.use("/user", [
  (req, res, next) => {
    console.log("Handling the route user ");
    next();
    //    res.send(" Response")

    // res.send({"firstname":"Ashu","lastname":"verma"}) // if we are not send the response back it will hanging
    //there are multiple route handler
  },
  (req, res) => {
    console.log("Handling the route user 2");
    res.send("2nd Response");
  },
]);

app.get("/user/:userId/:name/:password", (req, res) => {
  console.log(req.params);
  res.send({ firstname: "Ashu", lastname: "verma" });
});
// we can also give path as (ab?c),(ab+c),a(bc)+d,/a/

app.post("/user", (req, res) => {
  res.send("User added succesfully");
});

app.get("/admin/getAllUser", (req, res) => {
  res.send("All Data sent");
});

app.delete("/admin/deleteUser", (req, res) => {
  res.send("Deleted User");
});
// here we are authorizing the user on every http call so to resolve that we need middleware

app.get("/getUserData", (req, res) => {
  try {
    throw new Error("ddd");
  } catch (err) {
    res.status(500).send("something Error Contact us");
  }
});
// if any error this will handle so always put it last
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
      console.log("Server is successfully on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection cannot be established");
  });
