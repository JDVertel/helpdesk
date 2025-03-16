<template>
  <div>
    <h1>PQRS</h1>
    <hr />
    <div class="container  contenedor-cards">

      <div class="col-6 col-md 3">
        <div class="card cardpqrs peticiones" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          <div class="row">
            <div class="col-12 col-md-6">
              <h1>45</h1>
            </div>
            <div class="col-12 col-md-6">
              <h6>Peticiones</h6>
            </div>
          </div>

          <div class="card-body">
        <small>
            Solicitudes específicas realizadas para obtener información o la ejecución
            de una acción puntual.
        </small>
             
          
          </div>
        </div>
      </div>
      <div class="col-6 col-md 3">
        <div class="card cardpqrs quejas" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          <div class="row">
            <div class="col-12 col-md-6">
              <h1>31</h1>
            </div>
            <div class="col-12 col-md-6">
              <h6>Quejas</h6>
            </div>
          </div>
          <div class="card-body">
           <small>     Descripcion de insatisfacción relacionadas con el SGDEA, el servicio
            recibido o el trato percibido.</small>
         
          </div>
        </div>
      </div>
      <div class="col-6 col-md 3 ">
        <div class="card cardpqrs reclamos" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          <div class="row">
            <div class="col-12 col-md-6">
              <h1>45</h1>
            </div>
            <div class="col-12 col-md-6">
              <h6>Reclamo</h6>
            </div>
          </div>
          <div class="card-body">
           
            <small>
                Solicitudes formales por incumplimientos en derechos o expectativas por fallas
                en el SGDEA o servicio de soporte.
            </small>
                
         
          </div>
    
        </div>
      </div>
      <div class="col-6 col-md 3 ">
        <div class="card cardpqrs sugerencias" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          <div class="row">
            <div class="col-12 col-md-6">
              <h1>45</h1>
            </div>
            <div class="col-12 col-md-6">
              <h6>Sugerencia</h6>
            </div>
          </div>
          <div class="card-body">
        
            <small>    Recomendaciones constructivas que buscan mejorar el SGDEA y la prestacion del
                servicio.</small>
         
          </div>
      
        </div>
      </div>
    </div>

   
    
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div>
            <h1 class="modal-title fs-5" id="staticBackdropLabel">TIPO</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Understood</button>
          </div>
        </div>
      </div>
    </div>





  </div>
</template>

<script></script>

<style></style>
