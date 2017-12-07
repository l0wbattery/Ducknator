angular.module('app').controller('LocalListarController',function($scope,localService,$routeParams,toastr, autenticado){
    function listarLocal(){
        let promise = localService.listarLocal();
        promise.then((response) => {
            $scope.locais = response.data;
        })
    }
    listarLocal();

    $scope.removerLocalPorId = function(id){
        let promise = localService.removerLocal(id);
        promise.then((response) => {listarLocal();
            exibirToastrSucess();
        },
        function(response){
            toastr.error(response.data.Message, 'Formulário inválido');
        }); 
    }

    ////toastr

    function exibirToastrSucess(){
        toastr.success('Ação realizada com sucesso', 'Local');
    }
    function exibirToastrErro(){
        toastr.error('Revise os campos e tente novamente', 'Formulário inválido');
    }
});