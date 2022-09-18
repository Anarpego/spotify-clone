const Joi = require('joi');

const validationSongName = {
  'string.base': 'name is required',
  'string.empty': 'name is empty',
  'any.required': 'Este valor es requerido',
};
/* eslint-disable */
const validationSongAlbumId = {
  'number.base': 'artist_id is required',
  'number.integer': 'int is empty',
  'any.required': 'Este valor es requerido',
};
/* eslint-enable */
const validationSongFile = {
  'string.base': 'file is required',
  'string.empty': 'file is empty',
  'any.required': 'Este valor es requerido',
};

const validationSongCoverImage = {
  'string.base': 'cover_image is required',
  'string.empty': 'cover_image is empty',
  'any.required': 'Este valor es requerido',
};
module.exports = Joi.object().keys({
  name: Joi.string().trim().required().messages(validationSongName),
  album_id: Joi.number().integer().required(),
  file: Joi.string().required().messages(validationSongFile),
  cover_image: Joi.string()
    .trim()
    .required()
    .messages(validationSongCoverImage),
});
