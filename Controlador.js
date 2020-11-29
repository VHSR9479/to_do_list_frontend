angular.module('myapp',[])

//Servicio Para el consumo de Api
.service('apiServicio',function($http){
    // this.url="http://127.0.0.1:8000/api/";
     this.url="https://todolistapppais2.000webhostapp.com/pais_toDoList/public/api/";
    $http.defaults.headers.common['X-Requested-With']; 
  
  // Metodos para el consumo de Api de Actividades
    this.getAllActividad=function(usuario){   
      var retorno = $http(
          {
           method:'GET',
           url:this.url+'actividad/getActividad/'+usuario,           
           headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
            
          }
        )
      return retorno;
    }
      // Metodos para el Eliminar  Actividad
      this.deleteActividad=function(id){   
        var retorno = $http(
            {
             method:'DELETE',
             url:this.url+'actividad/deleteActividad/'+id,
             headers: {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'
            },
              
            }
          )
        return retorno;
      }
            // Metodos para el Enviar api de Actividad
            this.setActividad=function(actividad){   
              var retorno = $http(
                  {
                   method:'POST',
                   url:this.url+'actividad/setActividad',
                   data:actividad,
                   headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                  },
                    
                  }
                )
              return retorno;
            }

            // Metodos para el Finalizar  Actividad
            this.finalizarActividad=function(actividad){   
              var retorno = $http(
                  {
                   method:'PUT',
                   url:this.url+'actividad/updateActividad',
                   data:actividad,
                   headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                  },
                    
                  }
                )
              return retorno;
            }
  // Metodos para el consumo de Api de Estados
    this.getAllEstado=function(){   
      
      var retorno = $http(
          {
           method:'GET',
           url:this.url+'estado/getEstado',
           headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
            
          }
        )
      return retorno;
    }

      // Metodos para el consumo de Api de Horarios
      this.getAllHorario=function(){ 
        var retorno = $http(
            {
             method:'GET',
             url:this.url+'horario/getHorario',
             headers: {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'
            },
              
            }
          )
        return retorno;
      }

        // Metodos para el consumo de Api de Usuario
        this.getAllUsuario=function(){ 
          var retorno = $http(
              {
               method:'GET',
               url:this.url+'usuario/getUsuario',
               headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
              },
                
              }
            )
          return retorno;
        }    

        // Metodos para el consumo de Api de Comentarios
        this.getAllComentarios=function(idUser){ 
          var retorno = $http(
              {
               method:'GET',
               url:this.url+'comentario/getComentario/'+idUser,
               headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
              },
                
              }
            )
          return retorno;
        }    

                // Metodos para el consumo de Api de Comentarios
        this.getAllComentarios=function(idUser){ 
          var retorno = $http(
              {
               method:'GET',
               url:this.url+'comentario/getComentario/'+idUser,
               headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
              },
                
              }
            )
          return retorno;
        }    
              // Metodos para el Eliminar  Comentario
      this.deleteComentarios=function(id){   
        var retorno = $http(
            {
             method:'DELETE',
             url:this.url+'comentario/deleteComentario/'+id,
             headers: {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'
            },
              
            }
          )
        return retorno;
      }

             // Metodos para el Enviar api de Actividad
             this.setComentario=function(comentario){   
              var retorno = $http(
                  {
                   method:'POST',
                   url:this.url+'comentario/setComentario',
                   data:comentario,
                   headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                  },
                    
                  }
                )
              return retorno;
            }     

  })
.controller('ctrlmain',function($scope,apiServicio){
    $scope.actividades=[];
    $scope.usuarios=[];
    $scope.estados=[];
    $scope.comentarios=[];
    $scope.horarios=[];

    $scope.actividadComentario="";
    $scope.textoComentario="";

    $scope.idUsuario="";
    $scope.idHorario="";
    $scope.idEstado="";
    $scope.texto="";
    $scope.mensajeEst=false;
    $scope.mensaje="";

    getEstados();
    getHorarios();
    getUsuarios();

    function getEstados(){
      var respuesta=apiServicio.getAllEstado();
      respuesta.then(
          function successCallback(response) {    
            console.log(response.data);    
            $scope.estados =response.data;
          }, 
          function errorCallback(reason) {
            alert( "error");
          }
        );
    }



    function getHorarios(){
      var respuesta=apiServicio.getAllHorario();
      respuesta.then(
          function successCallback(response) {    
            console.log(response.data);    
            $scope.horarios = response.data;
          }, 
          function errorCallback(reason) {
            alert( "error");
          }
        );
    }

    function getUsuarios(){
      var respuesta=apiServicio.getAllUsuario(1);
      respuesta.then(
          function successCallback(response) {    
            console.log(response.data);    
            $scope.usuarios =response.data;
          }, 
          function errorCallback(reason) {
            alert( "error");
          }
        );
    }

    $scope.getActividades = function(){
        refreshActividades();
    }

    function refreshActividades(){
      var respuesta=apiServicio.getAllActividad($scope.idUsuario.id);
      respuesta.then(
          function successCallback(response) {    
            // console.log(response.data);    
            $scope.actividades =response.data;
            getcomentarios($scope.idUsuario.id);
            var datos  = "{";
            act=Object;
            contador = 0;
            response.data.forEach(element => {               
                datos  += '"comentario_'+element.id+'"'+':"",';
                //  da = "comentario_"+ element.id;
                //  element[ruta]="actividadComentario."+da;
                //  act[contador]=element;
                //  contador++;
            });
            datos  = datos.substring( 0, datos.length-1)+"}";
            $scope.actividadComentario = JSON.parse(datos);
            console.log(act);
            console.log("prueba")

          }, 
          function errorCallback(reason) {
            alert( "error");
          }
        );
    }

    $scope.finalizarActividad = function(actividad){ 
      if(confirm('Desea Finalizar la Actividad?')){
        console.log(actividad);
        var actividadJson ={
          "id":actividad.id,
          "id_horario": actividad.id_user,
          "id_user":actividad.id_estado,
          "descripcion":actividad.descripcion,
          "id_estado":actividad.id_estado
        };        
          var respuesta=apiServicio.finalizarActividad(actividadJson);
                respuesta.then(
                    function successCallback(response) {    
                      console.log(response.data);    
                        refreshActividades();
                    }, 
                    function errorCallback(reason) {
                      alert( "error");
                    }
                  );                  
      }
  }

    $scope.eliminarActividad = function(id){ 
        if(confirm('Desea eliminar la actividad?')){
            var respuesta=apiServicio.deleteActividad(id);
                  respuesta.then(
                      function successCallback(response) {    
                        console.log(response.data);    
                          refreshActividades();
                      }, 
                      function errorCallback(reason) {
                        alert( "error");
                      }
                    );                  
        }
    }

    $scope.addActividad = function(){
      console.log("#000");
      if($scope.idHorario.id != undefined){
        if($scope.idUsuario.id != undefined){
          if($scope.idEstado.id != undefined){
            if($scope.texto != ""){
              $scope.mensajeEst = false;
              var actividadJson ={
                "id_horario": $scope.idHorario.id,
                "id_user":$scope.idUsuario.id,
                "descripcion":$scope.texto,
                "id_estado":$scope.idEstado.id
              };
                var respuesta=apiServicio.setActividad(JSON.stringify(actividadJson));
                  respuesta.then(
                      function successCallback(response) {    
                        $scope.idHorario="";
                        $scope.idEstado="";
                        $scope.texto="";
                        refreshActividades();
                      }, 
                      function errorCallback(reason) {
                        console.log(reason);
                      }
                    );
              
            }else{
              $scope.mensaje="#004";
              $scope.mensajeEst = true
            }
          }else{
            $scope.mensaje="#003";
            $scope.mensajeEst = true
          }
        }else{
          $scope.mensaje="#002";
          $scope.mensajeEst = true
        }
      }else{
        $scope.mensaje="#001";
        $scope.mensajeEst = true
      }
    
     
    }
    function getcomentarios (idUser){
      var respuesta=apiServicio.getAllComentarios(idUser);
      respuesta.then(
          function successCallback(response) {    
            console.log(response.data);    
            $scope.comentarios =response.data;
          }, 
          function errorCallback(reason) {
            alert( "error");
          }
        );
    }

    $scope.eliminarComentario  = function(id){ 
      if(confirm('Desea eliminar la comentarios ?')){
          var respuesta=apiServicio.deleteComentarios (id);
                respuesta.then(
                    function successCallback(response) {    
                      console.log(response.data);    
                        refreshActividades();
                    }, 
                    function errorCallback(reason) {
                      console.log(reason);
                    }
                  );                  
      }
  }
  $scope.modalComentario = function(id){
    $scope.actividadComentario = id;

  }

 

  $scope.addComentario = function(){
    if(confirm('Desea Agregar la comentarios ?')){
      var comentario ={
        "id_actividad": $scope.actividadComentario,
        "descripcion":$scope.textoComentario,
      };
      var respuesta=apiServicio.setComentario(comentario);
            respuesta.then(
                function successCallback(response) {    
                  console.log(response.data);    
                    refreshActividades();
                }, 
                function errorCallback(reason) {
                  alert("error");
                }
              );                  
  }
  }
});