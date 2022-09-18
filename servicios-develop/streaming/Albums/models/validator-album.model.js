const Joi = require('joi');

const validationAlbumName = {
  'string.base': 'name is required',
  'string.empty': 'name is empty',
  'any.required': 'Este valor es requerido',
};
/* eslint-disable */
const validationAlbumArtistId = {
  'number.base': 'artist_id is required',
  'number.integer': 'int is empty',
  'any.required': 'Este valor es requerido',
};
/* eslint-enable */
const validationAlbumCoverImage = {
  'string.base': 'cover_image is required',
  'string.empty': 'cover_image is empty',
  'any.required': 'Este valor es requerido',
};
module.exports = Joi.object().keys({
  name: Joi.string().trim().required().messages(validationAlbumName),
  artist_id: Joi.number().integer().required(),
  cover_image: Joi.string()
    .trim()
    .required()
    .messages(validationAlbumCoverImage),
});
