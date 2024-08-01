const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'E-Commerce API',
    version: '1.0.0',
    description: 'API documentation for the E-Commerce application',
  },
  servers: [
    {
      url: 'http://localhost:4000', 
      description: 'Local development server',
    },
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, './routes/*.js')], // Path to the API docs
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
