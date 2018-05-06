'use strict'

const schema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        value: {
          type: 'integer',
          maximum: 5,
          minimum: 2
        },
        student_id: {
          type: 'integer'
        }
      },
      required: ['value', 'student_id']
    },
    params: {
      $ref: 'emptyObject'
    },
    query: {
      $ref: 'emptyObject'
    }
  },
  required: ['body']
}

module.exports = schema
