const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 3000;

// Enable CORS
app.use(cors()); // Use the cors middleware

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => {
  console.error('MongoDB Connection Error:', err);
  process.exit(1); // Exit the process with an error code
});

// Define MongoDB schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Middleware to parse JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/submit-form', (req, res) => {
  const { username, email, password } = req.body;

  console.log('Received form data:', req.body); // Log received data

  // Validate received data
  if (!username || !email || !password) {
    console.error('Validation Error: All fields are required.');
    return res.status(400).send('Validation Error: All fields are required.');
  }

  // Create a new user instance
  const newUser = new User({
    username: username,
    email: email,
    password: password
  });

  // Save user to MongoDB
  newUser.save()
    .then(() => {
      console.log('User saved to MongoDB...');
      res.status(200).send('User saved to MongoDB...');
    })
    .catch(err => {
      console.error('Error saving user to MongoDB:', err);
      res.status(500).send('Error saving user to MongoDB. Please try again later.');
    });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
