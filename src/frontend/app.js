import angular from 'angular'
import dndLists from './vendor/dndLists'
import directives from './directives'
import service from './service'
import controller from './controller'

import './common/style/index.css'

angular.module('KPIApp', [
  dndLists,
  directives,
  service,
  controller
])
