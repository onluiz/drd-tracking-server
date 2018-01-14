const expressConfig = require('./configs/express')
  mongoConfig = require('./configs/mongo'),
  
/**
 * Prepares express
 */
expressConfig()

/**
 * Prepares mongoose
 */
mongoConfig()