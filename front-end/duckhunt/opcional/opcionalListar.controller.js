angular.module('app').controller('OpcionalListarController',function($scope,opcionalService,$routeParams,toastr, authService, autenticado){
    function listarOpcionais(){
        let promise = opcionalService.listarOpcional();
        promise.then((response) => {
            $scope.opcionais = response.data;
        })
    }
    listarOpcionais();

    $scope.removerOpcionalPorId = function(id){
        let promise = opcionalService.removerOpcional(id);
        promise.then((response) => {listarOpcionais();
            exibirToastrSucess();
        },
        function(response){
            toastr.error(response.data.Message, 'Formulário inválido');
        });
    }

    ////toastr

    function exibirToastrSucess(){
        toastr.success('Ação realizada com sucesso', 'Opcional');
    }
    function exibirToastrErro(){
        toastr.error('Revise os campos e tente novamente', 'Formulário inválido');
    }
});