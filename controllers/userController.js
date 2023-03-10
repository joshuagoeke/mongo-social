// ObjectId() method for converting studentId string into an ObjectId for querying database
//const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// .populate('friends')  //in the response object
// .populate('thoughts') //include thoughts and friends
//add .populate('thoughts') and .populate('friends')
module.exports = {
  // Get all users
  getUsers(req, res) {
    console.log('getting users!');
    User.find()
      .select('-__v') // exclude the __v field
     
      
      .then((users) => res.json(users))
      .catch((err) =>  res.status(500).json(err));
      
  },

  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId})
      .select('-__v')
      .lean()
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // update a user by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
    .catch((err) => res.status(500).json(err));
  },
  // Delete a user by _id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
    .then((user) =>{
      if (!user) {
        res.status(400).json({ message: 'No user found with that ID :(' });
      }
      // return Thought.deleteMany({_id: { $in: user.thoughts }});
    }
    )
    .then(() => res.json({ message: 'User deleted!' }))
    .catch((err) => res.status(500).json(err));
  },
  

  // Add an friend to a user
  addFriend(req, res) {
    console.log('You are adding an friend');
    console.log("userId", req.params.userId);
    console.log("friendId", req.params.friendId);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } }, {new: true}
      
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove friend from a user
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId  } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
