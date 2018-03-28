import EChartsFactory from './EChartsFactory'
import Http from './Http'
import Uuid from './Uuid'

export default angular
  .module('KPIApp.services', [
    EChartsFactory,
    Http,
    Uuid
  ])
  .name
