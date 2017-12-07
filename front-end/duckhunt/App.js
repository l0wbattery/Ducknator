(function () {
    var app = angular.module('messageBox', []);
    app.value('$', $);

    app.factory('noteService', ['$', '$rootScope',
        function ($, $rootScope) {
            var proxy;
            var connection;
            return {
                connect: function () {
                    connection = $.hubConnection('http://10.99.150.49:3000/signalr');
                    proxy = connection.createHubProxy('HubMessage');
                    //proxy = connection.createHubProxy('HubMotion');
                    connection.start();
                    proxy.on('messageAdded', function (remetente, destinatario) {
                        $rootScope.$broadcast('messageAdded', remetente, destinatario);
                    });
                },
                isConnecting: function () {
                    return connection.state === 0;
                },
                isConnected: function () {
                    return connection.state === 1;
                },
                connectionState: function () {
                    return connection.state;
                },
                sendMessage: function (remetente, destinatario) {
                    proxy.invoke('SendMessage', remetente, destinatario);
                },
            }
        }]);

    // app.controller('motionController', function ($scope, noteService) {
    //     noteService.connect();
    //     $scope.messages = [];

    //     $scope.$on('sensorChange', function (event) {
    //         var mensagem = { x: event.alpha, y: event.gama };
    //         $scope.messages.push(messages);
    //         $scope.$apply();
    //     })
    // })

    // $scope.sendMessage = function () {
    //     noteService.sendMessage($scope.messages.x, $scope.messages.y);
    // };

    // app.controller('messageController', function ($scope, noteService) {

    //     noteService.connect();
    //     $scope.messages = [];

    //     $scope.$on('messageAdded', function (event, remetente, destinatario) {
    //         //var mensagem = { de: remetente, para: destinatario, mensagem: message };
    //         var mensagem = { de: remetente, para: destinatario };

    //         $scope.messages.push(mensagem);
    //         $scope.$apply();
    //     });

    //     $scope.sendMessage = function () {
    //         noteService.sendMessage($scope.remetente, $scope.destinatario);
    //     };



        function handleMotionEvent(event) {
            
                var x = event.rotationRate.gamma;
                var y = event.rotationRate.alpha;
            
                // Do something awesome.

                //Okay :3

                console.log(x*100);
                console.log(":3 Oii")
                console.log(y)
                noteService.sendMessage(x, y);
            }
            
            window.addEventListener("devicemotion", handleMotionEvent, true);

    });
})()
