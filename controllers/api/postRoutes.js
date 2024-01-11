const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

// POST route for creating a new post
router.post('/', withAuth, async (req, res) => {
	try {
		// Creating a new post using the Post model, spreading the request body,
		// and setting the userId to the authenticated user's session userId
		const newPost = await Post.create({
			...req.body,
			userId: req.session.userId,
		});
		// Sending the newly created post as a JSON response
		res.json(newPost);
	} catch (err) {
		// Handling errors by sending a 500 Internal Server Error response with the error details
		res.status(500).json(err);
	}
});

// PUT route for updating post
router.put('/:id', withAuth, async (req, res) => {
	try {
		// Updating a post using the Post model's update method,
		// specifying the post's id from the request parameters and updating with the request body
		const [updatedPost] = await Post.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		if (updatedPost > 0) {
		// Checking if the post was successfully updated
			res.status(200).end();
		} else {
			res.status(404).end();
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// DELETE route for deleting a post
router.delete('/:id', withAuth, async (req, res) => {
	try {
		// Deleting a post using the Post model's destroy method,
		// specifying the post's id from the request parameters
		const [deletedPost] = Post.destroy({
			// removed await?!
			where: {
				id: req.params.id,
			},
		});
		// Checking if the post was successfully deleted	
		if (deletedPost > 0) {
			// as long as array of post elements > 0, this will work. else its not found bc post does not exist
			res.status(200).end();
		} else {
			res.status(404).end();
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
