const express = require('express');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes/stream.routes');
require('./logger/logger');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const corsOptions = { origin: false, optionsSuccessStatus: 200 };

const PORT = 3002;
const app = express();

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(express.json());
app.use(morgan('common', {}));

app.use('/', router);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, () => {
  global.log.info(`SERVER RUNNING ON PORT: ${PORT}`);
});
