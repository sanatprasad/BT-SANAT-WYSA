module.exports = {
  // ========== User APIs ==========
  '/api/v1/user/register': {
    post: {
      summary: 'Register a new user',
      tags: ['User'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            example: {
              name: 'Aryan Kapoor',
              email: 'aryan.kapoor@example.com',
              password: 'SecurePass@123'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'User registered successfully',
          content: {
            'application/json': {
              example: {
                message: 'Register Successfully',
                success: true
              }
            }
          }
        },
        400: { description: 'Validation error' }
      }
    }
  },

  '/api/v1/user/login': {
    post: {
      summary: 'Login as a user',
      tags: ['User'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            example: {
              email: 'aryan.kapoor@example.com',
              password: 'SecurePass@123'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Login successful',
          content: {
            'application/json': {
              example: {
                name: 'Aryan Kapoor',
                email: 'aryan.kapoor@example.com',
                token: 'jwt_token_here',
                message: 'Login Successful'
              }
            }
          }
        },
        400: { description: 'Invalid credentials' }
      }
    }
  },

  '/api/v1/user/all': {
    get: {
      summary: 'Get all users (paginated)',
      tags: ['User'],
      parameters: [
        { in: 'query', name: 'page', schema: { type: 'integer' }, description: 'Page number' },
        { in: 'query', name: 'limit', schema: { type: 'integer' }, description: 'Users per page' }
      ],
      responses: {
        200: {
          description: 'List of users',
          content: {
            'application/json': {
              example: {
                users: [{ _id: '64a7bc1...', name: 'Aryan Kapoor', email: 'aryan.kapoor@example.com' }],
                total: 1,
                page: 1,
                totalPages: 1
              }
            }
          }
        }
      }
    }
  },

  '/api/v1/user/{id}': {
    get: {
      summary: 'Get user by ID',
      tags: ['User'],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      responses: {
        200: {
          description: 'User details',
          content: {
            'application/json': {
              example: {
                _id: '64a7bc1...',
                name: 'Aryan Kapoor',
                email: 'aryan.kapoor@example.com'
              }
            }
          }
        },
        404: { description: 'User not found' }
      }
    },
    put: {
      summary: 'Update user by ID',
      tags: ['User'],
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            example: {
              name: 'Aryan Raj Kapoor',
              email: 'aryan.r.kapoor@example.com'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'User updated',
          content: { 'application/json': { example: { status: 'updated' } } }
        },
        404: { description: 'User not found or no changes made' }
      }
    }
  },

  '/api/v1/user/{name}': {
    delete: {
      summary: 'Delete user by name',
      tags: ['User'],
      parameters: [{ in: 'path', name: 'name', required: true, schema: { type: 'string' } }],
      responses: {
        200: {
          description: 'User deleted',
          content: { 'application/json': { example: { message: 'User deleted successfully' } } }
        },
        404: { description: 'User not found' }
      }
    }
  },

  '/api/v1/user/changepassword': {
    post: {
      summary: 'Change user password',
      tags: ['User'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            example: {
              email: 'aryan.kapoor@example.com',
              oldpassword: 'SecurePass@123',
              newpassword: 'StrongerPass@456'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Password updated',
          content: { 'application/json': { example: { status: 'updated' } } }
        },
        400: { description: 'Invalid credentials' }
      }
    }
  },

  '/api/v1/user/reset-password': {
    post: {
      summary: 'Request password reset',
      tags: ['User'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            example: {
              email: 'aryan.kapoor@example.com'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Password reset link sent',
          content: { 'application/json': { example: { status: 'success', message: 'Password Reset Link Sent....' } } }
        },
        400: { description: 'Email is required' }
      }
    }
  },

  '/api/v1/user/password-updation/{id}/{token}': {
    post: {
      summary: 'Update password using reset token',
      tags: ['User'],
      parameters: [
        { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        { in: 'path', name: 'token', required: true, schema: { type: 'string' } }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            example: {
              password: 'StrongerPass@456',
              password_confirmation: 'StrongerPass@456'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Password updated',
          content: { 'application/json': { example: { status: 'updated' } } }
        },
        400: { description: 'Invalid token or user not found' }
      }
    }
  },

  // ========== Sleep APIs ==========
  '/api/v1/sleep/submit': {
    post: {
      summary: 'Submit a sleep assessment entry',
      tags: ['Sleep'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            example: {
              struggleDuration: '20 minutes',
              sleepTime: '23:00',
              wakeTime: '07:00',
              hoursOfSleep: 8
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Sleep entry saved successfully',
          content: { 'application/json': { example: { message: 'Sleep entry saved successfully' } } }
        },
        401: { description: 'Unauthorized' }
      }
    }
  },
'/api/v1/sleep/history': {
  get: {
    summary: 'Get sleep history for the logged-in user',
    tags: ['Sleep'],
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: 'List of sleep entries for the logged-in user',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
                entries: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      _id: { type: 'string' },
                      sleepTime: { type: 'string' },
                      wakeTime: { type: 'string' },
                      struggleDuration: { type: 'string' },
                      hoursOfSleep: { type: 'number' },
                      date: { type: 'string', format: 'date' }
                    }
                  }
                }
              }
            },
            example: {
              message: 'Sleep history fetched successfully',
              entries: [
                {
                  _id: '64a7f1d2abc1234567890abc',
                  sleepTime: '23:00',
                  wakeTime: '07:00',
                  struggleDuration: '20 minutes',
                  hoursOfSleep: 8,
                  date: '2025-07-09'
                },
                {
                  _id: '64a7f1d2abc1234567890abd',
                  sleepTime: '22:30',
                  wakeTime: '06:30',
                  struggleDuration: '10 minutes',
                  hoursOfSleep: 8,
                  date: '2025-07-08'
                }
              ]
            }
          }
        }
      },
      401: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            example: { message: 'Unauthorized access' }
          }
        }
      },
      404: {
        description: 'No sleep history found',
        content: {
          'application/json': {
            example: { message: 'No sleep history found' }
          }
        }
      }
    }
  }
}
};
