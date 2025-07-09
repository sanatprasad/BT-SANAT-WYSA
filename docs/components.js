module.exports = {
  schemas: {
    User: {
      type: 'object',
      properties: {
        _id: { type: 'string', format: 'ObjectId' },
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
        accountType: { type: 'integer' },
        profile: { type: 'string' },
        dateCreated: { type: 'number' }
      }
    },
    SleepEntry: {
      type: 'object',
      properties: {
        _id: { type: 'string', format: 'ObjectId' },
        userId: { type: 'string', format: 'ObjectId' },
        struggleDuration: { type: 'string' },
        sleepTime: { type: 'string' },
        wakeTime: { type: 'string' },
        hoursOfSleep: { type: 'number' },
        createdAt: { type: 'string', format: 'date-time' }
      }
    }
  },
  responses: {
    UnauthorizedError: {
      description: 'Access token is missing or invalid',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string' }
            }
          }
        }
      }
    }
  },
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Enter JWT Bearer token **_only_**'
    }
  }
}; 