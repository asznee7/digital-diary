'use strict'

const { raw } = require('config/raw')
const { format, transports } = require('winston')
const Sequelize = require('sequelize')

module.exports = {
  express: {
    port: 3100
  },
  api: {
    base: '/api',
    v1: '/v1'
  },
  database: {
    config: {
      name: undefined,
      username: undefined,
      password: undefined,
      options: {
        host: 'localhost',
        port: '5432',
        dialect: 'postgres',
        operatorsAliases: Sequelize.Op,
        timezone: '+03:00',
        isolationLevel: 'READ COMMITTED',
        define: {
          underscoredAll: true,
          underscored: true,
          createdAt: 'created_at',
          updatedAt: 'updated_at'
        }
      }
    },
    seed: {
      inits: {
        users: [
          {name: 'Allison Tyler', password: 'password1'},
          {name: 'Izabella Hartman', password: 'password2'},
          {name: 'Bianca Bates', password: 'password'},
          {name: 'Kelton Freeman', password: 'password'},
          {name: 'Lillianna Washington', password: 'password'},
          {name: 'Courtney Harrell', password: 'password'},
          {name: 'Gretchen Singh', password: 'password'},
          {name: 'Fiona Newman', password: 'password'},
          {name: 'Brayden Richards', password: 'password'},
          {name: 'Greta Norton', password: 'password'},
          {name: 'Rolando Figueroa', password: 'password'},
          {name: 'Gordon Escobar', password: 'password'},
          {name: 'Peyton Villanueva', password: 'password'},
          {name: 'Denzel Krause', password: 'password'},
          {name: 'Zaiden Pearson', password: 'password'},
          {name: 'Jose Richards', password: 'password'},
          {name: 'Hayden Walker', password: 'password'},
          {name: 'Lizeth Davila', password: 'password'},
          {name: 'Madalyn Vincent', password: 'password'},
          {name: 'Luca Whitney', password: 'password'}
        ],
        subjects: ['Mathematics', 'Reading', 'Art', 'Sports', 'Computer Science'],
        classes: ['Alpha', 'Bravo', 'Charlie']
      }
    }
  },
  loggers: raw({
    app: {
      level: 'debug',
      format: format.combine(
        format.splat(),
        format.simple(),
        format.timestamp(),
        format.colorize(),
        format.label({ label: 'app' }),
        format.printf(({ message, timestamp, label, level }) => `${timestamp} [${label}] ${level}: ${message}`)
      ),
      transports: [new transports.Console()]
    },
    database: {
      level: 'debug',
      format: format.combine(
        format.splat(),
        format.simple(),
        format.timestamp(),
        format.colorize(),
        format.label({ label: 'database' }),
        format.printf(({ message, timestamp, label, level }) => `${timestamp} [${label}] ${level}: ${message}`)
      ),
      transports: [new transports.Console()]
    }
  })
}
