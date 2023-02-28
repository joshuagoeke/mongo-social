const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addThought,
  removeThought,
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getUsers).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/user/:userId/thoughts
router.route('/:userId/thoughts').post(addThought);

// /api/user/:userId/thoughts/:thoughtId
router.route('/:userId/thoughts/:thoughtId').delete(removeThought);


module.exports = router;
