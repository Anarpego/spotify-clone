const Joi = require('joi');

const validationArtistArtist = {
  'string.base': 'artist is required',
  'string.empty': 'artist is empty',
  'any.required': 'Este valor es requerido',
};
module.exports = Joi.object().keys({
  artist: Joi.string().trim().required().messages(validationArtistArtist),
});
