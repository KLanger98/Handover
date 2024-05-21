const { Schema, model } = require('mongoose');

const flagSchema = new Schema(
  {
    flagText: {
      type: String,
      required: true
    },
    referenceProcess: {
        type: Schema.Types.ObjectId,
        references: "process"
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    formattedDate: {
        type: String
    },
    postedBy: {
        type:Schema.Types.ObjectId,
        references: "user"
    }

  }
);


const Flag = model('flag', flagSchema);

module.exports = Flag;
