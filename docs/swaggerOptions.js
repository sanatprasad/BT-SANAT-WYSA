const paths = require('./paths');
const components = require('./components');

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'Comprehensive API documentation for the LMS backend, including user, sleep assessment, and book/library endpoints.'
  },
  servers: [
    {
      url: 'http://localhost:8080',
      description: 'Local development server'
    }
  ],
  paths,
  components
}; 