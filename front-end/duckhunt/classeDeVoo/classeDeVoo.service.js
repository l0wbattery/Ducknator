angular.module('app').factory('classeDeVooService',function($http){
    
        let urlBase = 'http://localhost:57730/api/classedevoo';
    
        function adicionarClasseDeVoo(classeDeVoo){
            return $http.post(urlBase,classeDeVoo);
        }
        function listarClasseDeVoo() {
            return  $http.get(urlBase);
        }
    
        function buscarPorId(id) {
            return  $http.get(urlBase+'/'+id);
        }
        function alterarClasseDeVoo(classeDeVoo,id){
            return $http.put(urlBase+'/'+id,classeDeVoo);
        }
        function removerClasseDeVoo(id){
            return $http.delete(urlBase+'/'+id);
        }
        return {
            listarClasseDeVoo: listarClasseDeVoo,
            adicionarClasseDeVoo:adicionarClasseDeVoo,
            buscarPorId:buscarPorId,
            alterarClasseDeVoo:alterarClasseDeVoo,
            removerClasseDeVoo:removerClasseDeVoo
        };
});