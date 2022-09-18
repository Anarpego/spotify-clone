const { Router } = require('express');
const {
  createArtist,
  getArtists,
  createAlbum,
  getAlbums,
  getOneAlbum,
  getOneArtist,
  deleteArtist,
  deleteAlbum,
  updateAlbum,
  reporteArtistas,
  reporteAlbums,
} = require('../controllers/stream.controller');
const router = Router();
const validator = require('../midlewares/validator');

router.post('/createArtist', [validator.validateArtist], createArtist);
router.post('/createAlbum', [validator.validateAlbum], createAlbum);
router.put('/updateAlbum/:id', [validator.validateAlbum], updateAlbum);
router.get('/getArtists', getArtists);
router.get('/getOneAlbum/:id', getOneAlbum);
router.get('/getAlbums', getAlbums);
router.get('/getOneArtist/:id', getOneArtist);
router.get('/reporteArtistas', reporteArtistas);
router.get('/reporteAlbums', reporteAlbums);
router.delete('/deleteArtist/:id', deleteArtist);
router.delete('/deleteAlbum/:id', deleteAlbum);

module.exports = router;
