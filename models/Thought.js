const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
  reactionID: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
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


const thoughtSchema = new Schema(
  {
    thoughtId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
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
