const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMRI = {
  body: Joi.object().keys({
    image: Joi.string().required(),
    classification: Joi.string(),
    age: Joi.number().required(),
    user: Joi.required().custom(objectId),
    genre: Joi.string().valid('Femenino', 'Masculino', 'Otro'),
  }),
};

const getMRI = {
  params: Joi.object().keys({
    mriId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createMRI,
  getMRI,
};
