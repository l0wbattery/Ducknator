angular.module('app').factory('opcionalService',function($http){
    
        let urlBase = 'http://localhost:57730/api/opcional';
    
        function adicionarOpcional(opcional){
            return $http.post(urlBase,opcional);
        }
        function listarOpcional() {
            return  $http.get(urlBase);
        }
    
        function buscarPorId(id) {
            return  $http.get(urlBase+'/'+id);
        }
        function alterarOpcional(opcional,id){
            return $http.put(urlBase+'/'+id,opcional);
        }
        function removerOpcional(id){
            return $http.delete(urlBase+'/'+id);
        }
        return {
            listarOpcional: listarOpcional,
            adicionarOpcional:adicionarOpcional,
            buscarPorId:buscarPorId,
            alterarOpcional:alterarOpcional,
            removerOpcional:removerOpcional
        };
});