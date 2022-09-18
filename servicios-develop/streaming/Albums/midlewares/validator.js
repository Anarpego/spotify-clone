const modelArtist = require('../models/validator-artist.model');
const modelAlbum = require('../models/validator-album.model');

const validateArtist = (req, res, next) => {
  const validate = (data) => modelArtist.validate(data);
  const data = req.body;
  global.log.debug(`Validating data: ${JSON.stringify(data)}`);
  const validationResult = validate(data);
  if (validationResult.error) {
    global.log.error({ ...validationResult.error });
    return res.status(400).send({ ...validationResult.error });
  }
  next();
};

const validateAlbum = (req, res, next) => {
  const validate = (data) => modelAlbum.validate(data);
  const data = req.body;
  global.log.debug(`Validating data: ${JSON.stringify(data)}`);
  const validationResult = validate(data);
  if (validationResult.error) {
    global.log.error({ ...validationResult.error });
    return res.status(400).send({ ...validationResult.error });
  }
  next();
};

module.exports = {
  validateArtist,
  validateAlbum,
};
