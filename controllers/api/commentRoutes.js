const router = require('express').Router();
const { Comment, Post } = require('../../models');
const withAuth = require('../../utils/auth');

// POST route to create comment
router.post('/', withAuth, async (req, res) => {
	try {
		// Creating a new comment using the Comment model, spreading the request body,
		// and setting the userId to the authenticated user's session userId
		const newComment = await Comment.create({
			...req.body,
			userId: req.session.userId,
		});
		// Sending the newly created comment as a JSON response
		res.json(newComment);
	} catch (error) {
		// Handling errors by sending a 500 Internal Server Error response with the error details
		res.status(500).json(error);
	}
});
//export configured router
module.exports = router;
