angular.module('app').controller('UsuarioController',function($scope,usuarioService,$routeParams,toastr,$location){
    if($routeParams.idUsuario === undefined){
        $scope.salvar = function(usuario) {
            if ($scope.formUsuario.$invalid || !validaCpf(usuario.Cpf)) {
                exibirToastrErro();
                return;
            }
            usuarioService.adicionarUsuario(usuario).then(function (response) {
                exibirToastrSucess();
                pathLogin();
            },function(response){
                toastr.error(response.data.Message, 'Formulário inválido');
            }); 
        }
    }else{
        usuarioService.buscarPorId($routeParams.idUsuario).then(function(response) {
            $scope.usuario = response.data;
        });
        $scope.salvar = function(usuario) {
            if ($scope.formUsuario.$invalid || !validaCpf(usuario.Cpf)) {
                exibirToastrErro();
                return;
            }
            usuarioService.alterarUsuario(usuario).then(function (response) {
                exibirToastrSucess();
                pathLogin();
            },function(response){
                toastr.error(response.data.Message, 'Formulário inválido');
            }); 
        }
    }
    function validaCpf(cpf){
        for(let i = 0; i < cpf.length;i++){
            if(!!parseInt(cpf.charAt(i)) == false)
                return false;
        }
        return true;
    }

    $scope.isNotValid = function(campo){
        if($scope.formUsuario[campo].$invalid && $scope.formUsuario[campo].$touched)
            return true;
        return false;
    }
    function exibirToastrSucess(){
        toastr.success('Ação realizada com sucesso', 'Cadastro');
    }
    function exibirToastrErro(){
        toastr.error('Revise os campos e tente novamente', 'Formulário inválido');
    }

    function pathLogin() {
        $location.path('/login');
    }
});