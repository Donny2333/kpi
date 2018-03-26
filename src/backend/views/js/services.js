/**
 * Created by Donny on 17/3/12.
 */
(function () {
  'use strict'

  angular.module('KPIApp.services', [])
    .factory('kpiService', function ($q, $http) {
      return {
        get: function (url, id) {
          var deferred = $q.defer()

          if (id) {
            url += '/' + id
          }
          $http.get(url).then(function (response) {
            deferred.resolve(response)
          }, function (err) {
            deferred.reject(err)
          })

          return deferred.promise
        },

        post: function (url, data) {
          var deferred = $q.defer()

          $http.post(url, data).then(function (response) {
            deferred.resolve(response)
          }, function (err) {
            deferred.reject(err)
          })

          return deferred.promise
        }
      }
    })
    .factory('socket', function ($timeout) {
      var service = {
        connect: connect,
        emit: emit,
        on: on,
        removeListener: removeListener,
        socket: null
      }

      connect()

      return service

      // Connect to Socket.io server
      function connect() {
        service.socket = io()
      }

      // Wrap the Socket.io 'emit' method
      function emit(eventName, data) {
        if (service.socket) {
          service.socket.emit(eventName, data)
        }
      }

      // Wrap the Socket.io 'on' method
      function on(eventName, callback) {
        if (service.socket) {
          service.socket.on(eventName, function (data) {
            $timeout(function () {
              callback(data)
            })
          })
        }
      }

      // Wrap the Socket.io 'removeListener' method
      function removeListener(eventName) {
        if (service.socket) {
          service.socket.removeListener(eventName)
        }
      }
    })
    .factory('uuid', function () {
      var uuid = {}

      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1)
      }

      uuid.create = function () {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4()
      }

      return uuid
    })
    .factory('host', function () {
      var host = 'http://localhost:3010/'

      return host
    })

}())
