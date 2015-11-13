/// <reference path="../../typings/winston/winston.d.ts" />
import winston = require('winston');

var logger:winston.LoggerInstance  = new winston.Logger();

export default logger;