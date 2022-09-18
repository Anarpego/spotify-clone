const { Router } = require('express');
const {
  createSong,
  getSongs,
  getOneSong,
  getSongsByAlbum,
  deleteSong,
  updateSong,
  reporteCanciones,
  guardarHistorial,
  onRepeat,
  cancionesFavoritas,
  reporteArtistasConMasMinutosDeReproduccion,
  getHistorial,
  favoriteASong,
} = require('../controllers/stream.controller');
const router = Router();
const validator = require('../midlewares/validator');
const verify = require('../midlewares/auth');

router.post('/guardarHistorial', guardarHistorial);
router.post('/createSong', [validator.validateSong], createSong);
router.put('/updateSong/:id', [validator.validateSong], updateSong);
router.get('/getOneSong/:id', getOneSong);
router.get('/getSongs', getSongs);
router.get('/getSongsByAlbum/:id', getSongsByAlbum);
router.get('/reporteCanciones', reporteCanciones);
router.get('/onRepeat', [verify], onRepeat);
router.get('/getFavorites', [verify], cancionesFavoritas);
router.delete('/deleteSong/:id', deleteSong);
router.get('/reporteArtistas', reporteArtistasConMasMinutosDeReproduccion);
router.get('/getHistorial/:clienteId', getHistorial);
router.post('/favoriteSong', [verify], favoriteASong);

module.exports = router;
