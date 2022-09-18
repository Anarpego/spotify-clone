const redis = require('redis');

module.exports = class CacheService {
  /**
   * Returns a new Redis Client CacheService
   */
  constructor() {
    this.connect();
  }

  connect() {
    this.redisClient = redis.createClient({
      url: 'redis://:asdcEWV42vES@35.197.73.225:6379',
    });

    this.redisClient
      .connect()
      .then((x) => console.log('CONECTADO A REDIS'))
      .catch((error) => {
        console.error('REDIS ERROR', error);
        setTimeout(this.connect(), 10000);
      });
  }

  async get(id) {
    const value = await this.redisClient.get(id);
    return value ? JSON.parse(value) : null;
  }

  async set(id, data) {
    await this.redisClient.set(id, JSON.stringify({ data }));
  }

  async del(id) {
    return await this.redisClient.del(id);
  }

  /**
   * (PROMISE) Obtiene el perfil de un usuario segun el ID
   * @param {String} idUsuario ID del usuario
   * @returns {Object} JSON - JSON de la informacion del usuario
   * @returns {null} null - En caso de que no exista el perfil en cache
   * @throws Lanza un Error en caso de alguna excepcion.
   */
  async getPerfil(idUsuario) {
    try {
      const perfil = await this.get(`profile-${idUsuario}`);
      return perfil ? JSON.parse(perfil.data) : null;
    } catch (error) {
      throw new Error(
        `Error al obtener el perfil del usuario ${idUsuario}\n`,
        error
      );
    }
  }

  /**
   * Guarda el perfil de un usuario segun el ID
   * @param {String} idUsuario ID del usuario
   * @param {Object} data JSON de la data del perfil de usuario
   * @throws Lanza un Error en caso de alguna excepcion.
   */
  async storePerfil(idUsuario, data) {
    try {
      await this.set(`profile-${idUsuario}`, JSON.stringify(data));
    } catch (error) {
      throw new Error(
        `Error al guardar el perfil del usuario ${idUsuario}\n`,
        error
      );
    }
  }

  /**
   * (PROMISE) Elimina el perfil de un usuario segun el ID
   * @param {String} idUsuario ID del usuario
   * @returns {number} 1 - En caso de eliminacion correcta
   * @returns {number} 0 - En caso de que no exista el perfil en cache
   * @throws Lanza un Error en caso de alguna excepcion.
   */
  async deletePerfil(idUsuario) {
    try {
      return await this.del(`profile-${idUsuario}`);
    } catch (error) {
      throw new Error(
        `Error al eliminar el perfil del usuario ${idUsuario}\n`,
        error
      );
    }
  }

  /**
   * (PROMISE) Obtiene la informacion de un Album segun el ID
   * @param {String} idAlbum ID del album
   * @returns {Object} JSON - JSON de la informacion del album
   * @returns {null} null - En caso de que no exista el album en cache
   * @throws Lanza un Error en caso de alguna excepcion.
   */
  async getAlbum(idAlbum) {
    try {
      const album = await this.get(`album-${idAlbum}`);
      return album ? JSON.parse(album.data) : null;
    } catch (error) {
      throw new Error(`Error al obtener el album con id ${idAlbum}\n`, error);
    }
  }

  /**
   * Guarda la informacion de un album segun el ID
   * @param {String} idAlbum ID del album
   * @param {Object} data JSON de la data del album
   * @throws Lanza un Error en caso de alguna excepcion.
   */
  async storeAlbum(idAlbum, data) {
    try {
      await this.set(`album-${idAlbum}`, JSON.stringify(data));
      console.log('Album guardado');
    } catch (error) {
      throw new Error(`Error al guardar el album con id ${idAlbum}\n`, error);
    }
  }

  /**
   * (PROMISE) Elimina la informacion de un album segun el ID
   * @param {String} idAlbum ID del album
   * @returns {number} 1 - En caso de eliminacion correcta
   * @returns {number} 0 - En caso de que no exista el album en cache
   * @throws Lanza un Error en caso de alguna excepcion.
   */
  async deleteAlbum(idAlbum) {
    try {
      return await this.del(`album-${idAlbum}`);
    } catch (error) {
      throw new Error(`Error al eliminar el album con id ${idAlbum}\n`, error);
    }
  }

  /**
   * (PROMISE) Obtiene la informacion de todos los albums
   * @returns {Object} JSON - JSON de la informacion de los albums
   * @returns {null} null - En caso de que no existan los albums en cache
   * @throws Lanza un Error en caso de alguna excepcion.
   */
  async getAllAlbums() {
    try {
      const albums = await this.get(`albums`);
      return albums ? JSON.parse(albums.data) : null;
    } catch (error) {
      throw new Error(`Error al obtener todos los albums\n`, error);
    }
  }

  /**
   * Guarda la informacion de todos los albums
   * @param {Object} data JSON de la data de los albums
   * @throws Lanza un Error en caso de alguna excepcion.
   */
  async storeAllAlbums(data) {
    try {
      await this.set(`albums`, JSON.stringify(data));
      console.log('Albums guardados');
    } catch (error) {
      throw new Error(`Error al guardar todos los albums\n`, error);
    }
  }

  /**
   * (PROMISE) Elimina la informacion de todos los albums
   * @returns {number} 1 - En caso de eliminacion correcta
   * @returns {number} 0 - En caso de que no exista los albums en cache
   * @throws Lanza un Error en caso de alguna excepcion.
   */
  async deleteAllAlbums() {
    try {
      return await this.del(`albums`);
    } catch (error) {
      throw new Error(`Error al eliminar todos los albums\n`, error);
    }
  }
};
