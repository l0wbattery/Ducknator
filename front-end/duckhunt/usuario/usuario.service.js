angular.module('app').factory('usuarioService',function($http){
    
        let urlBase = 'http://localhost:57730/api/usuario';
    
        function adicionarUsuario(usuario){
            return $http.post(urlBase+'/cadastro',usuario);
        }
        function listarUsuarioLogado() {
            return  $http.get(urlBase+'/usuariologado');
        }
    
        function buscarUsuarioPorId(id) {
            return  $http.get(urlBase+'/'+id);
        }
        function alterarUsuario(usuario){
            return $http.put(urlBase+'/'+usuario.id,usuario);
        }
        function removerUsuario(id){
            return $http.delete(urlBase+'/'+id);
        }
        return {
            listarUsuarioLogado: listarUsuarioLogado,
            adicionarUsuario:adicionarUsuario,
            buscarUsuarioPorId:buscarUsuarioPorId,
            alterarUsuario:alterarUsuario,
            removerUsuario:removerUsuario
        };
});