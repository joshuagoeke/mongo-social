const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);
router.route('/:userId').delete(deleteUser);
router.route('/:userId').put(updateUser);
//make these add friend

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/friendId').post(addFriend).delete(removeFriend);


// /api/users/:userId/friends/:friendId
// router.route('/:userId/friends/:friendId').delete(removeFriend);


module.exports = router;
