const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err.message));
  },
  // Get a thought by id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    console.log('creating a most interesting thought');
    console.log(req.body);
    Thought.create(req.body).then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: thought } },
          { new: true }
        )
        .then((user) =>{
          !user
            ? res.status(404).json({ message: 'No user with that username' })
            : res.json({ username: user.username, thoughts: user.thoughts[0] });
          
        })
        
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err.message);
      });
  },

   // Update a thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a thought by id
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.findOneAndUpdate({thoughts: req.params.thoughtId}, {$pull: {thoughts: req.params.thoughtId}}, {new: true})
      )
      .then(() => res.json({ message: 'brain fart!' }))
      .catch((err) => res.status(500).json(err));
  },
 
// Create a reaction to a thought by thought id
addReaction(req, res) {
  console.log('reacting to content');
  console.log(req.body);
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $push: { reactions: req.body } },
    { new: true }
  )
  .populate({
    path:'reactions',
    select: '-__v'
  })
  // .select('-__v')
  .then(reaction => {
    if (!reaction) {
      return res.status(404).json({ message: 'No thought with that ID' });
  };
  res.json(reaction);
  })
  .catch(err => res.status(500).json(err.message));
},

  // Delete a reaction by thoughtId and reactionId
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
    .then((thought) => {
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
        return;
      };
      res.json(thought);
    })
    .catch(err => res.status(500).json(err.message));
  }

};
