require('./database.js');
const express = require('express');
const { User, validateUser } = require('./models/User');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('./models/User');


// Parse JSON in the request body
app.use(express.json());

// Sign-up route
app.post('/signup', async (req, res) => {
  // Validate the request body
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if the user already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send('User already registered.');
  }

  // Create a new user
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // Save the user to the database
  await user.save();

  res.send('User registered successfully.');
});



// Parse JSON in the request body
app.use(express.json());

// Login route
app.post('/login', async (req, res) => {
  // Validate the request body
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }


  // Validate the password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send('Invalid email or password.');
  }

  // Generate a JSON Web Token (JWT)
  const token = jwt.sign({ _id: user._id }, 'your-secret-key');
  res.send(token);
});

const port = 3000; // Specify the port number you want to use

app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});
