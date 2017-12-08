angular.module('duckHunt').factory('duckService', ['$', '$rootScope',
function ($, $rootScope) {
    var proxy;
    var connection;
    return {
        connect: function () {
<<<<<<< HEAD
            connection = $.hubConnection('http://192.168.0.102:3000/signalr');
=======
<<<<<<< HEAD
            connection = $.hubConnection('http://192.168.0.13:3000/signalr');
            //connection = $.hubConnection('http://192.168.0.15:3000/signalr');
=======
            connection = $.hubConnection('http://192.168.0.15:3000/signalr');
>>>>>>> ef0b40ec0b9de6ef2b4446cb65e198017c6b60b4
>>>>>>> 210df4cc192bd4b524eefa6f2dda91bdfeab426f
            proxy = connection.createHubProxy('HubMessage');
            connection.start();
            proxy.on('messageAdded', function (bolaGamma, bolaAlpha) {
                $rootScope.$broadcast('messageAdded', bolaGamma, bolaAlpha);
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
        sendMessage: function (bolaGamma, bolaAlpha) {
            proxy.invoke('SendMessage', bolaGamma, bolaAlpha);
        },
    }


}]);
