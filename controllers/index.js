// Importing Express Router module
const router = require('express').Router();
// Importing routes for home page
const homeRoutes = require('./homeRoutes.js');
// Importing routes for dashboard
const dashboardRoutes = require('./dashboardRoutes.js');
// Importing API routes
const apiRoutes = require('./api');
// Using the homeRoutes 
router.use('/', homeRoutes);
// Using the dashboardRoutes 
router.use('/dashboard', dashboardRoutes);
// Using apiRoutes 
router.use('/api', apiRoutes);
// Exporting router
module.exports = router;
