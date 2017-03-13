/**
 * Created by Donny on 17/3/12.
 */
var app = angular.module('chatApp', []);

app.controller('AppController', function (socket, $scope) {
    var vm = $scope.vm = {
        text: 'Maybe next time~',
        messages: [{
            username: 'Tom',
            content: 'Hello?'
        }, {
            username: 'Tom',
            content: 'Where do we plan to have lunch this weekend?'
        }, {
            username: 'Mike',
            content: 'I guess...maybe I cannot go with u because of the hard work.'
        }, {
            username: 'Mike',
            content: 'Sry...'
        }]
    };

    $scope.send = function () {
        var data = {
            username: 'Tom',
            content: vm.text
        };
        socket.emit('chatMessage', data);

        vm.text = '';
    };

    socket.on('chatMessage', function (data) {
        vm.messages.push(data);
    });

});