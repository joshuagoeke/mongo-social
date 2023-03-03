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

// /api/thoughts/:userId/
router.route('/:userId/').post(createThought);

// /api/thoughts/
router.route('/').get(getThoughts);

// /api/thoughts/:thoughtId/
router.route('/:thoughtId').get(getSingleThought).put(updateThought)
.delete(deleteThought);

// /api/thoughts/:userId/reactions/:reactionsId
// router.route('/:userId/reactions/reactionsId').post(addReaction).delete(removeReaction);


// /api/thoughts/:userId/reactions/:reactionsId
// router.route('/:userId/reactions/:reactionsId')


module.exports = router;