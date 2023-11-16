<script > 
import Nav from '../components/Nav.vue'

export default {
        components: {
            Nav,
            // Top
        },
        data(){
            return{ 
                products:null,
                pagina: 1, 
                valor: false}
      },
      mounted(){
        this.getProducts();
      }, 
      methods:{
        getProducts(){
          axios.get('http://localhost:3000/')
          .then(response => (
            this.products = response.data)
          );
        }
      }
    } 


</script>

<template>
    <Nav :class="{ close: valor }"/>
    
    <section class="dashboard">
        <div class="top"  >
        <button id="sidebarToggle" class="boton_burguer" @click="valor = !valor"> 
            <i class="ri-menu-line sidebar-toggle"></i> 
        </button> 

        <div class="search-box">
            <i class="ri-search-2-line"></i>
            <input type="text" id="searchField" placeholder="Buscar (Ctrl + k)">
        </div>

        <img src="../assets/profile3.png" alt="imagen de perfil">
    </div>
        <div class="dash-content">

            <div class="overview"> 
                <!-- NAVBAR -->
                <div class="title">
                    <i class="ri-pie-chart-box-line icono-dash"></i>
                    <span class="text">Investigacion de tienda</span>
                </div>
            </div>

            <div class="activity">
            <section class="container_form1">
                <FormKit
                    type="form"
                    #default="{ value }"
                    @submit="handleSubmit"
                    :value="data"
                    submit-label="Registrar"
                >
                    <FormKit
                        type="select"
                        label="Marca"
                        name="id_marca"
                        placeholder="Marca"
                        :options="['Samsung', 'Lg', 'Xiaomi', 'Condesa']"
                        validation="required"
                        :validation-messages="{
                            required: 'Debes escoger una marca.',
                        }"
                    />

                    <FormKit
                        type="textarea"
                        name="descripcion_articulo"
                        label="Descripcion del articulo"
                        value="Galaxy A22 Violet 128GB...."
                        :help="`${value.instructions ? value.instructions.length : 0} / 120`"
                        validation="length:0,120"
                        validation-visibility="live"
                        :validation-messages="{
                        length: 'Debe contener menos de 120 caracteres.',
                        }"
                    />
                    
                    <FormKit
                        type="number"
                        label="cantidad"
                        name="cantidad"
                        placeholder="cantidad del articulo"
                        validation="required"
                        :validation-messages="{
                            required: 'Debes colocar la cantidad del producto.'
                        }"
                    />
                    <FormKit
                        type="number"
                        label="Precio"
                        name="precio"
                        placeholder="Precio del producto"
                        validation="required"
                        :validation-messages="{
                            required: 'Debes colocar el precio del producto.'
                        }"
                    />
                    <FormKit
                        type="number"
                        label="Sub total"
                        name="PrecioSubTotal"
                        placeholder="Sub total del producto"
                        validation="required"
                        :validation-messages="{
                            required: 'Debes colocar el sub-total del producto.'
                        }"
                    />
                    <FormKit
                        type="text"
                        label="Codigo dk"
                        name="codigo dk"
                        placeholder="LD-00002148"
                        validation="required"
                        :validation-messages="{
                            required: 'Debes colocar el codigo del producto.'
                        }"
                    />
                    <!-- </div> -->
                    
                    <FormKit
                        type="date"
                        label="Fecha de nacimiento"
                        validation="required"
                        :validation-messages="{  
                            required: 'debe colocar una fecha.'
                            }"
                    />

                    <FormKit
                        type="select"
                        label="Modelo"
                        name="id_modelo"
                        placeholder="Modelo del articulo"
                        :options="['Xl', 'Lg', 'lite', 'Ultra']"
                        validation="required"
                        :validation-messages="{
                            required: 'Debes escoger una modelo.',
                        }"
                    />

                   
                    

                    <!-- <pre wrap>{{ value }}</pre> -->
                </FormKit>
                </section>
            </div>
        </div>
        <br>
        <br>
    </section>
</template>


