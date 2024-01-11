const router = require('express').Router();
const { User } = require('../../models');

// POST route to handle user registration at '/userRoutes'
// Session information is handled in this route
router.post('/', async (req, res) => {
  try {
    // Creating a new user with the provided username and password from the request body
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    // Saving session information after successful user creation
    req.session.save(() => {
      req.session.userId = userData.id,
      req.session.username = userData.username,
      req.session.loggedIn = true,
      // Sending user data as a JSON response
      res.json(userData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// POST route to handle user login at '/userRoutes/login'
router.post('/login', async (req, res) => {
  try {
    // Finding user with the provided username from request body
    const userData = await User.findOne({ 
      where: {
        username: req.body.username,
      },
    });
    // Checking if user exists 
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // Checking if provided password matches user's stored password
    const password = await userData.checkPassword(req.body.password);

    if (!password) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // Save session information after successful login
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
      // Sending a JSON response indicating successful login
      res.json({ userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});
// POST route to handle user logout at '/userRoutes/logout'
router.post('/logout', (req, res) => {
    // Check if the user logged in
  if (req.session.loggedIn) {
    // Destroy session on logout
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;