describe('controller', () => {

    const mockPost = jest.fn()
    const mockJson = jest.fn().mockReturnValue(true)


    const mockCreateArtist = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {

            resolve(
                {
                    mensaje: 'Artista creado correctamente',
                    status: true,
                }
            )

        })

    )

    const mockgetOneArtist = jest.fn().mockReturnValue(

        [{
            artists: { artist: "testArtist" },
            status: true,
        }]


    )

    const mockGetArtists = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {

            resolve(
                {
                    mensaje: 'Artista creado correctamente',
                    status: true,
                }
            )

        })

    )

    const mockDeleteArtist = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {

            resolve(
                {
                    mensaje: 'Artista eliminado correctamente',
                    status: true,
                }
            )

        })

    )

    const mockDeleteAlbum = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {

            resolve(
                {
                    mensaje: 'Album eliminado correctamente',
                    status: true,
                }
            )

        })

    )


    const mockGetOneAlbum = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {

            resolve(
                {
                    id: {},
                    name: {},
                    artist: {},
                    cover_image: {}
                }
            )

        })

    )


    const mockGetAlbums = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {

            resolve([
                {
                    id: {},
                    name: {},
                    artist: {},
                    cover_image: {}
                }]
            )

        })

    )


    const mockCreateAlbum = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {

            resolve(
                {
                    mensaje: 'Album creado correctamente',
                    status: true,
                }
            )

        })

    )

    const mockUpdateAlbum = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {

            resolve(
                {
                    mensaje: 'Album actualizado correctamente',
                    status: true,
                }
            )

        })

    )

    const mockReporteArtistas = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {

            resolve(
                {
                    mensaje: 'Reporte de artistas enviado',
                    status: true,
                }
            )

        })

    )

    const mockReporteAlbums = jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {

            resolve(
                {
                    mensaje: 'Reporte de albums enviado',
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



    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };


    const mockNext = () => jest.fn()

    jest.mock('../../cache', () => {
        

        return jest.fn().mockImplementation(() => ({
            getAlbum: jest.fn().mockReturnValue([]),
            getAllAlbums: jest.fn().mockReturnValue([]),
            storeAlbums: jest.fn(),
            storeAllAlbums: jest.fn(),
            deleteAlbum: jest.fn(),
            deleteAlbums: jest.fn()
        }));

    })


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
            createArtist: mockCreateArtist,
            getOneArtist: mockgetOneArtist,
            deleteArtist: mockDeleteArtist,
            getArtists: mockGetArtists,
            deleteAlbum: mockDeleteAlbum,
            getOneAlbum: mockGetOneAlbum,
            getAlbums: mockGetAlbums,
            createAlbum: mockCreateAlbum,
            updateAlbum: mockUpdateAlbum,
            reporteArtistas: mockReporteArtistas,
            reporteAlbums: mockReporteAlbums
        }
        return {
            queries: mQueries
        }
    });





    jest.mock('express', () => {

        const mResponse = {
            //json: mockJson,
            status: jest.fn(()=>({
                json: jest.fn()
            }))
        }
        return { response: mResponse }

    })


    it('createArtist called', async () => {
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.createArtist({
            body: {
                artist: "test"
            }
        });

        console.log(responses)
        expect(mockCreateArtist).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })


    it('createArtist failed', async () => {
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.createArtist({

        });

        console.log(responses)
        expect(mockCreateArtist).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })
    it('getOneArtist called', async () => {
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.getOneArtist({
            params: {
                id: 1
            }
        });

        console.log(responses)
        expect(mockgetOneArtist).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })


    it('getOneArtist failed', async () => {
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.getOneArtist({

        });

        console.log(responses)
        expect(mockgetOneArtist).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })
    it('deleteArtist called', async () => {
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.deleteArtist({
            params: {
                id: 1
            }
        });

        console.log(responses)
        expect(mockDeleteArtist).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })

    it('deleteArtist failed', async () => {
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.deleteArtist({

        });

        console.log(responses)
        expect(mockDeleteArtist).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })


    it('getArtists called', async () => {
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.getArtists();

        console.log(responses)
        expect(mockgetOneArtist).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })

    it('deleteAlbum called', async () => {
        //require('cache')
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.deleteAlbum({
            params: {
                id: 1
            }
        });

        console.log(responses)
        expect(mockDeleteAlbum).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })


    it('deleteAlbum failed', async () => {
        //require('cache')
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.deleteAlbum({

        });

        console.log(responses)
        expect(mockDeleteAlbum).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })



    it('getAlbums called', async () => {
        //require('cache')
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.getAlbums();

        console.log(responses)
        //expect(mockGetAlbums).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })


    it('getOneAlbums called', async () => {
        //require('cache')
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.getOneAlbum({
            params:{
                id:1
            }
        });

        console.log(responses)
        //expect(mockGetOneAlbum).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })


    it('getOneAlbums failed', async () => {
        //require('cache')
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.getOneAlbum({

        });

        console.log(responses)
        //expect(mockGetOneAlbum).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })
    it('createAlbum called', async () => {
        //require('cache')
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.createAlbum({
            body: {
                name: "album1",
                artist_id: 1,
                cover_image: "imagen"
            }
        });

        console.log(responses)
        //expect(mockCreateAlbum).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })


    it('createAlbum failed', async () => {
        //require('cache')
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.createAlbum({

        });

        console.log(responses)
        //expect(mockCreateAlbum).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })

    it('updateAlbum called', async () => {
        //require('cache')
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.updateAlbum({
            body: {
                name: "album1",
                artist_id: 1,
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

    it('updateAlbum failed', async () => {
        //require('cache')
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.updateAlbum({

        });

        console.log(responses)
        //expect(mockCreateAlbum).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })
    it('reporteArtistas called', async () => {
        //require('cache')
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.reporteArtistas();

        console.log(responses)
        expect(mockReporteArtistas).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })

    it('reporteAlbums called', async () => {
        //require('cache')
        require('../../logger/logger')
        const controller = require('../stream.controller')
        const responses = await controller.reporteAlbums();

        console.log(responses)
        expect(mockReporteAlbums).toHaveBeenCalled()
        //expect(mockCreateArtist()).toBe(true)
    })


})
