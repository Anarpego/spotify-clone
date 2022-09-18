// UNIT TESTING

// pruebas unitarias => unidad => una parte especifica del codigo
// describe => QUE ES LO QUE ESTOY PROBANDO

describe('Logger', () => {
  // genera una funcion controlada por JEST
  // jest lleva control de lo siguiente:
  // - se llamo o no a la funcion
  // - cuantas veces se llamo
  // - con que parametros se llamo
  // - que retorno / si-y-no
  const mockInfo = jest.fn();
  const mockAdd = jest.fn();

  const loadLogger = (env) => {
    process.env.NODE_ENV = env || 'dev';
    jest.resetModules();
    require('../logger');
  };

  // jest: jest es un paquete de herramientas para probar nuestro codigo =>
  // MOCK: jest.mock => RECIBE UNA FUNCION O EL NOMBRE DE UN PAQUETE como primer parametro
  // como segundo parametro => una funcion, QUE ES LA QUE VA A SOBREESCRIBIR AL PAQUETE O FUNCION QUE PASAMOS DE PRIMERO
  jest.mock('winston', () => {
    const mFormat = {
      colorize: jest.fn(),
      combine: jest.fn(),
      simple: jest.fn(),
      json: jest.fn(),
      print: jest.fn(),
      timestamp: jest.fn(),
    };

    const mTransports = {
      Console: jest.fn(),
      File: jest.fn(),
    };

    return {
      format: mFormat,
      transports: mTransports,
      createLogger: jest.fn().mockReturnValue({
        add: mockAdd,
        info: mockInfo,
      }),
    };
  });

  loadLogger();
  it('should use global.log to log info', () => {
    const result = global.log.info('Hola mundo!');
    expect(mockInfo).toHaveBeenCalled();
    expect(mockInfo).toHaveBeenCalledWith('Hola mundo!');
  });

  it('should use winston.logger.add to add Console transport when NODE_ENV != prod', () => {
    expect(mockAdd).toHaveBeenCalled();
  });

  it('shouldnt call logger.add to add Console transport when NODE_ENV == prod', () => {
    mockAdd.mockClear();
    loadLogger('prod');
    expect(mockAdd).not.toHaveBeenCalled();
  });
});
