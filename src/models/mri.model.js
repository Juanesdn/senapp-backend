const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const mriSchema = mongoose.Schema(
  {
    image: {
      type: String,
    },
    classification: {
      type: String,
    },
    age: {
      type: Number,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    genre: {
      type: String,
      enum: ['Femenino', 'Masculino', 'Otro'],
    },
    observations: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
mriSchema.plugin(toJSON);

/**
 * @typedef MRI
 */
const MRI = mongoose.model('MRI', mriSchema);

module.exports = MRI;
