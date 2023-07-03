const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const { schema } = require("./validation");
const { MongoClient } = require("mongodb");
const app = express();
// const authentication =("./auth.js")
// const middleware = require("./middleware")

app.use(bodyParser.json());
app.use(express.json());
// app.use(middleware);

const PORT = process.env.PORT || 5000;
dotenv.config({ path: "./config.env" });
MongoClient.connect("mongodb://127.0.0.1:27017/now", {
  useNewUrlParser: true,

});
// const productSchema = new mongoose.Schema({
//   productGeneralList: String,
//   productSingleList: String,
//   retrive: String,
// });

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String
})

const users = mongoose.model("users", userSchema)

app.post('/signup', async (req, res) => {

  console.log(mentor)
  
   const user = new users({
        username: mentor.username,
        email: mentor.email,
        password: mentor.password,
      });

  
    user.save();
    res.status(201).send(user);
  
});


app.post('/login', async (req, res) => {
  
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User({ email: req.body.email });
  if (!user) {
    return res.status(400).send('Invalid email or password.');
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send('Invalid email or password.');
  }
  // const token = jwt.sign({ _id: user._id }, 'your-secret-key');
  // res.send(token);
});

//update user information
// Update user route
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const user = await User(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name;
    user.email = email;

    await user.save();

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
