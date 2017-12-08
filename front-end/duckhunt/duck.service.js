angular.module('duckHunt').factory('duckService', ['$', '$rootScope',
function ($, $rootScope) {
    var proxy;
    var connection;
    return {
        connect: function () {
            connection = $.hubConnection('http://192.168.0.102:3000/signalr');
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