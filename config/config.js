/**
 * Created by Donny on 17/3/15.
 */
var _ = require('lodash')
var defaults = require('./env/default')
var configs = require('./env/' + (process.env.NODE_ENV || 'development'))

module.exports = _.merge({}, defaults, configs)
