// ObjectId() method for converting studentId string into an ObjectId for querying database
//const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// TODO: Create an aggregate function to get the number of students overall
const headCount = async () =>
  User.aggregate()
    .count('userCount')
    // Your code here
    .then((numberOfUsers) => numberOfUsers);

// // Execute the aggregate method on the User model and calculate the overall grade by using the $avg operator
// const grade = async (studentId) =>
//   User.aggregate([
//     // TODO: Ensure we include only the student who can match the given ObjectId using the $match operator
//     { $match: { _id: ObjectId(studentId) } 
//     },
//     {
//       $unwind: '$assignments',
//     },
//     // TODO: Group information for the student with the given ObjectId alongside an overall grade calculated using the $avg operator
//     {
//       // Your code here
//       $group: {
//         _id: studentId,
//         grade: { $avg: '$assignments.score' },
//       },
//     },
//   ]);

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          headCount: await headCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId})
      .select('-__v')
      .lean()
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user,
              grade: await grade(req.params.userId),
            })
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
  // Delete a user and remove them from the course
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .then((course) =>
        !course
          ? res.status(404).json({
              message: 'User deleted, but no courses found',
            })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an thought to a user
  addThought(req, res) {
    console.log('You are adding an thought');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { thoughts: req.body } },
      { runValidators: true, new: true }
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

  // Remove thought from a user
  removeThought(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { thought: { thoughtID: req.params.thoughtID } } },
      { runValidators: true, new: true }
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
