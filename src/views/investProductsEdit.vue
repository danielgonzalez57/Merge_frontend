<script setup>
import Nav from '../components/Nav.vue';

import axios from 'axios';
import Swal from 'sweetalert2'

import { ref, onMounted, computed, watch  } from 'vue';
import Select2 from '../funciones/select2'

import {  useRoute, useRouter } from 'vue-router'
const usuario = localStorage.usuario;

const medicionget = ref()
const articuloget = ref()
const tipoartget = ref()
const tamanoget = ref()
const modeloget = ref()
const marcaget = ref()

const cant = ref()
const precio = ref()
const multiplicationResult = ref(0);




const route = useRoute()
const router = useRouter()
const valor = ref(false)
const investigacionProEdit = ref([]);


const id_medicion = ref('')
const id_art = ref('')
const id_tipo = ref('')
const id_tam_cap = ref('')
const id_modelo = ref('')
const id_marca = ref('')
const descrip = ref('')
const sub_total = ref(multiplicationResult)
const user_crea = ref(localStorage.usuario)
const user_mod = ref('')

// URL
const id = ref('')
id.value = route.params.key 
console.log(id.value)

watch([cant, precio], () => {
      multiplicationResult.value = cant.value * precio.value;
    });



const jsonInvesEdit = ref({
    id_medicion: "",
    id_art: "",
    id_tipo: "",
    id_tam_cap: "",
    id_modelo: "",
    id_marca: "",
    descrip: "",
    cant: "",
    precio: "",
    sub_total: 10, // CALCULAR VALOR
    cod_sim_daka: "",
    user_crea: localStorage.usuario, // AQUI VA EL LOCALSTORAGE.USER_CREA
    // FECHA DE CREACION ESTOS VALORES SE CREAN POR DEFECTO
    user_mod: localStorage.usuario // AQUI VA EL LOCALSTORAGE.USER_CREA
    // FECHA DE MODIFICACION ESTOS VALORES SE CREAN POR DEFECTO
});

async function getFilterInvestigacionPro(){
    
    try{
        const response = await axios.get(`http://localhost:3001/api/v1/investProducts/${id.value}`)
        investigacionProEdit.value =  response.data
    } catch(error){
        console.log(error)

    }
}

async function postInvestigacionProductpro(jsonInvesPro, id){
    
    try{
        const response = await axios.put(`http://localhost:3001/api/v1/investProductUpdate/${id.value}`, jsonInvesPro)
        
        if(response.data.status === 'ok'){

            Swal.fire({

                icon: 'question',
                title: 'Alerta!',
                text: '¿Deseas editar los datos?',
                background: '#3A3B3C',  
                color: '#fff',
                confirmButtonText: 'Editar',

            }).then((result) => {
                if (result.isConfirmed) {

                // REDIRECCIONA AL TABLE PRINCIPAL
                router.push('/investProducts');

                }
            })

            }
        

    } catch(error){
        console.log(error)

    }
}
// SELCCIONAR DATOS -------------------------------------------------------------------------- //
async function getMediciones(){
    try{
        const response = await axios.get(`http://localhost:3001/api/v1/medicionAll`);

        medicionget.value =  response.data
        //console.log(medicionget.value)

    } catch(error){
        console.log(error)
    }
}
async function getArticulo(){
    try{
        const response = await axios.get(`http://localhost:3001/api/v1/articuloAll`);

        articuloget.value =  response.data
  
    } catch(error){
        console.log(error)
    }
}
async function getTipoArt(){
    try{
        const response = await axios.get(`http://localhost:3001/api/v1/tipoArticuloAll`);

        tipoartget.value =  response.data
 

    } catch(error){
        console.log(error)
    }
}
async function getTamano(){
    try{
        const response = await axios.get(`http://localhost:3001/api/v1/tamCapAll`);

        tamanoget.value =  response.data
        //console.log(tamanoget.value)
     

    } catch(error){
        console.log(error)
    }
}
async function getModelo(){ 
    try{
        const response = await axios.get(`http://localhost:3001/api/v1/modeloAll`);

        modeloget.value =  response.data
        //console.log(modeloget.value)

    } catch(error){
        console.log(error)
    }
}
async function getMarca(){ 
    try{
        const response = await axios.get(`http://localhost:3001/api/v1/marcasAll`);

        marcaget.value =  response.data
        //console.log(modeloget.value)

    } catch(error){
        console.log(error)
    }
}
//metodo change de la lista articulos
$(document).ready(function() {
    $('#id_medicion').on('change', function() {
        var valorSeleccionado = $(this).val()
       id_medicion.value = valorSeleccionado

        
      });

});
$(document).ready(function() {
    $('#id_art').on('change', function() {
        var valorSeleccionado = $(this).val()
        arrayTipoArticulo.value =  tipoartget.value.filter(data => data.id_articulo == valorSeleccionado)
        id_art.value = valorSeleccionado
      });

});

//metodo change de la lista tipos
$(document).ready(function() {
    $('#id_tipo').on('change', function() {
        var valorSeleccionado = $(this).val()
        arraytamano.value =  tamanoget.value.filter(data => data.id_tipo == valorSeleccionado)
        id_tipo.value = valorSeleccionado
      });

});


//metodo change de la lista tamanos
$(document).ready(function() {
    $('#id_tam_cap').on('change', function() {
        var valorSeleccionado = $(this).val()
        arraymodelo.value =  modeloget.value.filter(data => data.id_tam_cap == valorSeleccionado)
        id_tam_cap.value = valorSeleccionado
      });

});

$(document).ready(function() {
    $('#id_modelo').on('change', function() {
        var valorSeleccionado = $(this).val()
        // arraymodelo.value =  modelo.value.filter(data => data.idtamano == valorSeleccionado)
        id_modelo.value = valorSeleccionado
      });

});
$(document).ready(function() {
    $('#id_marca').on('change', function() {
        var valorSeleccionado = $(this).val()
        // arraymodelo.value =  modelo.value.filter(data => data.idtamano == valorSeleccionado)
        id_marca.value = valorSeleccionado
      });

});

onMounted( async () => {
    
    await getFilterInvestigacionPro();
    await getMediciones();
    await getArticulo();
    await getTipoArt();
    await getTamano();
    await getModelo();
    await getMarca();
    
    id_medicion.value = investigacionProEdit.value.id_medicion
    id_art.value = investigacionProEdit.value.id_art
    id_tipo.value = investigacionProEdit.value.id_tipo
    id_tam_cap.value = investigacionProEdit.value.id_tam_cap
    id_modelo.value = investigacionProEdit.value.id_modelo
    id_marca.value = investigacionProEdit.value.id_marca
    descrip.value = investigacionProEdit.value.descrip
    cant.value = investigacionProEdit.value.cant
    precio.value = investigacionProEdit.value.precio
    sub_total.value = investigacionProEdit.value.sub_total
    user_crea.value = investigacionProEdit.value.user_crea
    user_mod.value = usuario

});

function UpdateData(){

    const jsonInvesPro = {
        id_medicion:id_medicion.value, 
        id_art:id_art.value,
        id_tipo:id_tipo.value,
        id_tam_cap:id_tam_cap.value ,
        id_modelo:id_modelo.value ,
        id_marca:id_marca.value ,
        descrip:descrip.value ,
        cant:cant.value ,
        precio:precio.value ,
        sub_total:sub_total.value ,
        user_crea:user_crea.value ,
        user_mod:user_mod.value, 

    }
    postInvestigacionProductpro(jsonInvesPro, id)

}

Select2()

</script>
<template>
    <Nav :class="{ close: valor }" />
    <section class="dashboard">

        <div class="top">
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
                    <span class="text">Editar Investigacion de productos</span>
                </div>
            </div>
            <div class="activity">
                <section class="container_form1">
                    <div class="container_form">
                        <FormKit type="form"  
                            @submit="UpdateData" 
                            submit-label="Registrar" 
                            method="post" action="/">

                           <!--NUEVO SELECT  MEDICION-->
                           <label class="label_filter" for="">Id medicion</label>
                            <div class="filtrador">
                                <select required class="js-example-basic-single filter-medicion"
                                    id="id_medicion"
                                    v-model="id_medicion"
                                    name="id_medicion"
                                    style="width: 40%; "
                                >
                                    <option value="">Seleccione Medicion</option>
                                    <option v-for="obj in medicionget" :key="obj.id" :value="obj.id">{{ obj.id }}</option>
                                </select>

                            </div>

                           <!--NUEVO SELECT ARTICULO-->
                           <label class="label_filter" for="">Articulo</label>
                           <div class="filtrador">
                                <select required class="js-example-basic-single filter-medicion"
                                    id="id_art"
                                    v-model="id_art"
                                    name="id_art"
                                    style="width: 40%; "
                                >
                                <option value="">Seleccione un Articulo</option>
                                    <option v-for="obj in articuloget" :key="obj.id" :value="obj.id">{{ obj.nombre }}</option>
                                    </select>
                            </div>

                            <!--NUEVO SELECT TIPO-->
                            <label class="label_filter" for="">Tipo articulo</label>
                            <div class="filtrador">
                                <select required class="js-example-basic-single filter-medicion"
                                    id="id_tipo"
                                    v-model="id_tipo"
                                    name="id_tipo"
                                    style="width: 40%; "
                                >
                                <option value="">Seleccione un Tipo</option>
                                    <option v-for="obj in tipoartget" :key="obj.id" :value="obj.id">{{ obj.nombre }}</option>
                                    </select>
                            </div>


                            <!--NUEVO SELECT TAMANO-->
                        <label class="label_filter" for="">Tamaño capacidad</label>
                        <div class="filtrador">
                            <select required class="js-example-basic-single filter-medicion"
                                id="id_tam_cap"
                                v-model="id_tam_cap"
                                name="id_tam_cap"
                                style="width: 40%; "
                            >
                                <option value="">Seleccione un tamaño</option>
                                <option v-for="obj in tamanoget" :key="obj.id" :value="obj.id">{{ obj.nombre }}</option>
                            </select>
                        </div>


                            <!--NUEVO SELECT MODELO-->
                            <label class="label_filter" for="">Modelo</label>
                            <div class="filtrador">
                                <select required class="js-example-basic-single filter-medicion"
                                    id="id_modelo"
                                    v-model="id_modelo"
                                    name="id_modelo"
                                    style="width: 40%; "
                                >
                                    <option value="">Seleccione un modelo</option>
                                    <option v-for="obj in modeloget" :key="obj.id" :value="obj.id">{{ obj.nombre }}</option>
                                </select>
                            </div>

                            <label class="label_filter" for="">Marca</label>
                            <div class="filtrador">
                                <select required class="js-example-basic-single filter-medicion"
                                    id="id_marca"
                                    v-model="id_marca"
                                    name="id_marca"
                                    style="width: 40%; "
                                >
                                    <option value="">Seleccione una marca</option>
                                    <option v-for="obj in marcaget" :key="obj.id" :value="obj.id">{{ obj.nombre }}</option>
                                </select>
                            </div>

                            <FormKit v-model="descrip" type="text" label="Descripción" value="descrip"
                                 placeholder="Descripción" maxlength="99" minlength="10"
                                validation="required" :validation-messages="{
                                    required: 'Escriba una descripción',
                                }" help="" />

                            <FormKit v-model="cant" type="number" label="Cantidad" value="cant" prefix-icon="number"
                                 validation="required" :validation-messages="{
                                    required: 'Ingrese la cantidad',
                                }" help="" />

                            <FormKit v-model="precio" type="number" step="0.01" label="Precio" value="precio"
                                 placeholder="Precio" validation="required" :validation-messages="{
                                    required: 'Ingre el precio',
                                }" help="" />

                            <FormKit v-model="sub_total" type="number" step="0.01 " label="SubTotal" value="sub_total"
                                 placeholder="SubTotal" validation="required" disabled
                                :validation-messages="{
                                    required: '',
                                }" help="" />

                            <FormKit v-model="user_crea" type="text" label="Usuario de creación" value="user_crea"
                                 placeholder="" validation="required" disabled
                                :validation-messages="{
                                    required: '',
                                }" help="" />
                            <!-- <pre wrap>{{ value }}</pre> -->
                        </FormKit>
                    </div>
                </section>
            </div>
        </div>
        <br>
        <br>
    </section>
</template>

<style>
[data-invalid] .formkit-inner {
    border-color: red;
    box-shadow: 0 0 0 1px red;
}
.filtrador{
    margin-bottom: 1rem;
}

.filtrador .filter-medicion{
    padding: 1rem;
}

.label_filter{
    font-weight: 600;
    font-size: 14px;
}
</style> 

