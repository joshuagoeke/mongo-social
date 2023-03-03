//TODO Update index.js when thought routes and controller are updated
//copy user and change friends to reactions
const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  // addReaction,
  // removeReaction,
} = require('../../controllers/thoughtController');

// /api/users/
router.route('/').get(getThoughts).post(createThought);

// /api/users/:userId/thoughts/:thoughtId
router.route('/:userId/thoughts/:thoughtId').get(getSingleThought).delete(deleteThought);

router.route('/:userId/thoughts/:thoughtId').put(updateThought);

// /api/users/:userId/reactions/:reactionsId
// router.route('/:userId/reactions/reactionsId').post(addReaction).delete(removeReaction);


// /api/users/:userId/reactions/:reactionsId
// router.route('/:userId/reactions/:reactionsId')


module.exports = router;