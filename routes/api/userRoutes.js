const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getUsers).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

//make these add friend

// /api/user/:userId/friends/:friendId
router.route('/:userId/friends/friendId').post(addFriend).delete(removeFriend);


// /api/user/:userId/friends/:friendId
// router.route('/:userId/friends/:friendId').delete(removeFriend);


module.exports = router;
