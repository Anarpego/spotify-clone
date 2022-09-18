const modelSong = require('../models/validator-song.model');

const validateSong = (req, res, next) => {
  const validate = (data) => modelSong.validate(data);
  const data = req.body;
  // global.log.debug(`Validating data: ${JSON.stringify(data)}`)
  const validationResult = validate(data);
  if (validationResult.error) {
    global.log.error({ ...validationResult.error });
    return res.status(400).send({ ...validationResult.error });
  }
  next();
};
module.exports = {
  validateSong,
};
