angular.module('app').factory('trechoService',function($http){
    
        let urlBase = 'http://localhost:57730/api/trecho';
    
        function adicionarTrecho(trecho){
            return $http.post(urlBase,trecho);
        }
        function listarTrecho() {
            return  $http.get(urlBase);
        }
    
        function buscarPorId(id) {
            return  $http.get(urlBase+'/'+id);
        }
        function alterarTrecho(trecho,id){
            return $http.put(urlBase+'/'+id,trecho);
        }
        function removerTrecho(id){
            return $http.delete(urlBase+'/'+id);
        }
        return {
            listarTrecho: listarTrecho,
            adicionarTrecho:adicionarTrecho,
            buscarPorId:buscarPorId,
            alterarTrecho:alterarTrecho,
            removerTrecho:removerTrecho
        };
});