const mongooseConfig = require('./configs/mongoose'),
  expressConfig = require('./configs/express')


/** Prepares mongoose */
mongooseConfig() 

/** Prepares express */
expressConfig()

