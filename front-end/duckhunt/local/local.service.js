angular.module('app').factory('localService',function($http){
    
        let urlBase = 'http://localhost:57730/api/local';
    
        function adicionarLocal(local){
            return $http.post(urlBase,local);
        }
        function listarLocal() {
            return  $http.get(urlBase);
        }
    
        function buscarPorId(id) {
            return  $http.get(urlBase+'/'+id);
        }
        function alterarLocal(local,id){
            return $http.put(urlBase+'/'+id,local);
        }
        function removerLocal(id){
            return $http.delete(urlBase+'/'+id);
        }
        return {
            listarLocal: listarLocal,
            adicionarLocal:adicionarLocal,
            buscarPorId:buscarPorId,
            alterarLocal:alterarLocal,
            removerLocal:removerLocal
        };
});