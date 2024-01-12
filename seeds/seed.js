// Import necessary modules
const sequelize = require('../config/connection.js'); // Import database connection configuration
const { User, Post } = require('../models/index.js'); // Import User and Post models

const userData = require('./userData.js'); // Import user data for seeding
const postData = require('./postData.json'); // Import post data for seeding

// Define a function to seed the database
const seedDatabase = async () => {
  try {
    // Synchronize database schema 
    await sequelize.sync({ force: true });

    // Bulk create users with individual hooks and return created records
    await User.bulkCreate(userData, {
      individualHooks: true, // Execute hooks for each user creation
      returning: true, // Retrieve created user records
    });

    // Retrieve all created users
    const users = await User.findAll();

    // Map posts to include user IDs based on usernames
    const posts = postData.map(post => ({
      ...post, // Spread existing post data
      userId: users.find(user => user.username === post.username).id, // Assign user ID based on username match
    }));

    // Bulk create posts
    await Post.bulkCreate(posts);

    console.log('Database seeded successfully!'); // Log success message
  } catch (error) {
    console.error('Error seeding database:', error); // Log error if any
  } finally {
    process.exit(0); // Exit process gracefully
  }
};
// Execute the seedDatabase function
seedDatabase();