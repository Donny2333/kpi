/**
 * Created by Donny on 17/3/12.
 */
app.factory('socket', function ($timeout) {
    var service = {
        connect: connect,
        emit: emit,
        on: on,
        removeListener: removeListener,
        socket: null
    };

    connect();

    return service;

    // Connect to Socket.io server
    function connect() {
        service.socket = io();
    }

    // Wrap the Socket.io 'emit' method
    function emit(eventName, data) {
        if (service.socket) {
            service.socket.emit(eventName, data);
        }
    }

    // Wrap the Socket.io 'on' method
    function on(eventName, callback) {
        if (service.socket) {
            service.socket.on(eventName, function (data) {
                $timeout(function () {
                    callback(data);
                });
            });
        }
    }

    // Wrap the Socket.io 'removeListener' method
    function removeListener(eventName) {
        if (service.socket) {
            service.socket.removeListener(eventName);
        }
    }
});
