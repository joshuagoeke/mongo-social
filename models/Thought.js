const { Schema, model } = require('mongoose');

 // reactionId: {
  //   type: Schema.Types.ObjectId,
  //   default: () => new Types.ObjectId(),
  // },

const reactionSchema = new Schema(
  {
 
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get:timestamp=>format_date(timestamp)
  },
  
},
{
  toJSON: {
    getters: true,
  },
  id: false,
}
)


// thoughtId: {
    //   type: Schema.Types.ObjectId,
    //   default: () => new Types.ObjectId(),
    // },

const thoughtSchema = new Schema(
  {
    
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    username: {
      type: String,
      required: true,
    },

    reactions:[ 
      reactionSchema 
    ],
    
    createdAt: {
      type: Date,
      default: Date.now,
      get:timestamp=>format_date(timestamp)
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Thought = model('thought', thoughtSchema);
module.exports = Thought;
