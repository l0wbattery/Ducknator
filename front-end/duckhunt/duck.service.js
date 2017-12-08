angular.module('duckHunt').factory('duckService', ['$', '$rootScope',
function ($, $rootScope) {
    var proxy;
    var connection;
    return {
        connect: function () {
<<<<<<< HEAD
            connection = $.hubConnection('http://192.168.0.13:3000/signalr');
=======
            connection = $.hubConnection('http://192.168.0.15:3000/signalr');
>>>>>>> e4523a0952b04f02abc09d98304817dac105f577
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