const Joi = require('joi');

/*
{
  "id": "123", // STRING, REQUERIDO 10 max, 1 min
  "message": "hola mundo" // STRING, REQUERIDO
  "album": {
    "name": "The Division Bell",
    "songs": [
      {
        "name": "Marooned",
      }
    ]
  }
}
*/

const validationIdMessages = {
  'string.base': 'ID is required',
  'string.empty': 'ID is empty',
  'string.min': 'Se necesitan al menos {#limit} caracter',
  'string.max': 'Se necesita a lo mucho {#limit} caracterees',
  'any.required': 'Este valor es requerido',
};

const validationMessageMessages = {
  'string.base': 'Message is required',
  'string.empty': 'Message is empty',
  'string.min': 'Se necesitan al menos {#limit} caracter',
  'string.max': 'Se necesita a lo mucho {#limit} caracterees',
  'any.required': 'Este valor es requerido',
};

const validationArtistArtist = {
  'string.base': 'artist is required',
  'string.empty': 'artist is empty',
  'any.required': 'Este valor es requerido',
};
module.exports = Joi.object().keys({
  id: Joi.string()
    .trim()
    .max(10)
    .min(1)
    .required()
    .messages(validationIdMessages),
  message: Joi.string()
    .trim()
    .max(255)
    .min(10)
    .required()
    .messages(validationMessageMessages),
  artist: Joi.string().trim().required().messages(validationArtistArtist),
});
