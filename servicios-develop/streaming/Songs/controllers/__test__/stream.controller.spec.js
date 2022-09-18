
describe('controller', () => {


    const mockDeleteSong = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {

            resolve(
                {
                    mensaje: 'cancion eliminada correctamente',
                    status: true,
                }
            )

        })

    )


    const mockGetOneSong = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {

            resolve(
                {
                    status: true,
                    song: {
                        id: 1,
                        name: 'song1',
                        album: {
                            id: 1,
                            name: 'album1',
                            artist: 'artist1',
                            cover_image: 'cover image',
                        },
                        file: 'file',
                        cover_image: 'cover image',
                    },
                }
            )

        })

    )


    const mockGetSongs = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {

            resolve(
                {
                    songs: [],
                    status: true,
                }
            )

        })

    )


    const mockCreateSong = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {

            resolve(
                {
                    mensaje: 'cancion creada correctamente',
                    status: true,
                }
            )

        })

    )

    const mockFavoriteASong = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {

            resolve(
                {
                    favorite: [],
                    mensaje: 'cancion creada correctamente',
                    status: true,
                }
            )

        })

    )


    const mockUpdateSong = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {

            resolve(
                {
                    mensaje: 'Cancion actualizadoa correctamente',
                    status: true,
                }
            )

        })

    )


    const mockGetSongsByAlbum = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {

            resolve(
                {
                    songs: [],
                    status: true,
                }
            )

        })

    )


    const mockReporteCanciones = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {

            resolve(
                {
                    songs: [],
                    status: true,
                }
            )

        })

    )


    const mockGuardarHistorial = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {

            resolve(
                {
                    mensaje: 'historial guardado correctamente',
                    status: true,
                }
            )

        })

    )


    const mockOnRepeat = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {


            resolve(
                {
                    songs: [],
                    status: true,
                }
            )

        })

    )


    const mockReporteArtistasConMasMinutosDeReproduccion = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {

            resolve(
                {
                    songs: [],
                    status: true,
                }
            )

        })

    )


    const mockCancionesFavoritas = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {

            resolve(
                {
                    songs: [],
                    status: true,
                }
            )

        })

    )

    const mockGetHistorial = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {

            resolve(
                {
                    songs: [],
                    status: true,
                }
            )

        })

    )
    beforeEach(() => {
        jest.resetModules();
    });

    const mockRequest = (body, params) => ({
        body,
        ...params,
    });

    jest.mock('@google-cloud/storage', () => {



        return {
            Storage: jest.fn().mockImplementation(() => ({
                bucket: jest.fn(() => ({
                    file: jest.fn(() => ({
                        createWriteStream: jest.fn(() => ({
                            on: jest.fn(),
                            end: jest.fn()
                        }))
                    }))
                }))
            }))
        }

    })

    jest.mock('../../db/queries', () => {


        const mQueries = {
            deleteSong: mockDeleteSong,
            getOneSong: mockGetOneSong,
            getSongs: mockGetSongs,
            createSong: mockCreateSong,
            updateSong: mockUpdateSong,
            getSongsByAlbum: mockGetSongsByAlbum,
            reporteCanciones: mockReporteCanciones,
            guardarHistorial: mockGuardarHistorial,
            onRepeat: mockOnRepeat,
            getFavorites: mockCancionesFavoritas,
            reporteArtistasConMasMinutosDeReproduccion:mockReporteArtistasConMasMinutosDeReproduccion,
            getHistorial: mockGetHistorial,
            favoriteSong: mockFavoriteASong

        }
        return {
            queries: mQueries
        }
    });





    jest.mock('express', () => {

        const mResponse = {
            //json: mockJson,
            status: jest.fn(() => ({
                json: jest.fn()
            }))
        }
        return { response: mResponse }

    })




    it('deleteSong called', async () => {
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.deleteSong({
            params: {
                id: 1
            }
        });

        console.log(responses)
        expect(mockDeleteSong).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })


    it('deleteSong failed', async () => {
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.deleteSong({

        });

        console.log(responses)
        expect(mockDeleteSong).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })

    it('getOneSong called', async () => {
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.getOneSong({
            params: {
                id: 1,
                album_id:2
            }
        });

        console.log(responses)
        expect(mockGetOneSong).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })


    it('getOneSong failed', async () => {
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.getOneSong({
            params: {

            }
        });

        console.log(responses)
        expect(mockGetOneSong).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })
    it('getSongs called', async () => {
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.getSongs();

        console.log(responses)
        expect(mockGetSongs).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })


    it('createSong called', async () => {
        //require('cache')
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.createSong({
            body: {
                name: "album1",
                album_id: 1,
                file: "file",
                cover_image: "imagen"
            }
        });

        console.log(responses)
        //expect(mockCreateAlbum).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })


    it('createSong failed', async () => {
        //require('cache')
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.createSong({
            body: {

            }
        });

        console.log(responses)
        //expect(mockCreateAlbum).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })

    it('updateSong called', async () => {
        //require('cache')
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.updateSong({
            body: {
                name: "album1",
                album_id: 1,
                file: "file",
                cover_image: "imagen"
            },
            params: {
                id: 1
            }
        });

        console.log(responses)
        //expect(mockCreateAlbum).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })


    it('updateSong failed', async () => {
        //require('cache')
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.updateSong({
            body: {

            },
            params: {
                id: 1
            }
        });

        console.log(responses)
        //expect(mockCreateAlbum).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })

    it('getSongsByAlbum called', async () => {
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.getSongsByAlbum({
            params: {
                id: 1
            }
        });

        console.log(responses)
        expect(mockGetSongsByAlbum).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })



    it('getSongsByAlbum failed', async () => {
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.getSongsByAlbum({

        });

        console.log(responses)
        expect(mockGetSongsByAlbum).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })
    it('reporteCanciones called', async () => {
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.reporteCanciones();

        console.log(responses)
        expect(mockReporteCanciones).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })


    it('guardarHistorial called', async () => {
        //require('cache')
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.guardarHistorial({
            body: {
                client_id: 1,
                song_id: 1,

            }
        });

        console.log(responses)
        expect(mockGuardarHistorial).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })


    it('guardarHistorial failed', async () => {
        //require('cache')
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.guardarHistorial({

        });

        console.log(responses)
        expect(mockGuardarHistorial).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })

    it('onRepeat called', async () => {
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.onRepeat({
            user: {
                client: 1
            }
        });

        console.log(responses)
        expect(mockOnRepeat).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })



    it('onRepeat failed', async () => {
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.onRepeat({
            user: {

            }
        });

        console.log(responses)
        expect(mockOnRepeat).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })

    it('cancionesFavoritas called', async () => {
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.cancionesFavoritas({
            user: {
                client: 1
            }
        });

        console.log(responses)
        expect(mockCancionesFavoritas).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })


    it('cancionesFavoritas failed', async () => {
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.cancionesFavoritas({
            user: {
            }
        });

        console.log(responses)
        expect(mockCancionesFavoritas).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })
    
    it('reporteArtistasConMasMinutosDeReproduccion called', async () => {
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.reporteArtistasConMasMinutosDeReproduccion();

        console.log(responses)
        expect(mockReporteArtistasConMasMinutosDeReproduccion).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })

    
    it('getHistorial called', async () => {
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.getHistorial({
            params: {
                clientId: 1
            }
        });

        console.log(responses)
        expect(mockGetHistorial).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })


    it('getHistorial failed', async () => {
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.getHistorial({

        });

        console.log(responses)
        expect(mockGetHistorial).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })

    it('favoriteSong called', async () => {
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.favoriteASong({
            user: {
                client: 1
            },
            body:{
                song_id: 1
            }
        });

        console.log(responses)
        expect(mockOnRepeat).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })

    it('favoriteSong failed', async () => {
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.favoriteASong({

        });

        console.log(responses)
        expect(mockOnRepeat).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })
})