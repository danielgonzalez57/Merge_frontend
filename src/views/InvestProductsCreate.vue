<script setup>
import Nav from '../components/Nav.vue';
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import Select2 from '../funciones/select2'
const valor = ref(false)

//SELECT CON DATA
const medicionget = ref()
const articuloget = ref()
const tipoartget = ref()
const tamanoget = ref()
const modeloget = ref()
const marcaget = ref()

// INPUT QUE SE MULTIPLICAN
const cant = ref()
const precio = ref()
const multiplicationResult = ref(0);

watch([cant, precio], () => {
      multiplicationResult.value = cant.value * precio.value;
    });

// INPUTS 
const id_medicion = ref('')
const id_art = ref('')
const id_tipo = ref('')
const id_tam_cap = ref('')
const id_modelo = ref('')
const id_marca = ref('')
const descrip = ref('')
const cod_sim_daka = ref('')
const sub_total = ref(multiplicationResult)
const user_crea = ref(localStorage.usuario)


const data = ref({

    id_medicion: "",
    id_art: "",
    id_tipo: "",
    id_tam_cap: "",
    id_modelo: "",
    id_marca: "",
    descrip: "",
    cant: "",
    precio: "",
    sub_total: 10, 
    user_crea: localStorage.usuario, 

    user_mod: localStorage.usuario 

});

// DATA
async function getMediciones(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/medicionAll`);

        medicionget.value =  response.data

    } catch(error){
        console.log(error)
    }
}
async function getArticulo(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/articuloAll`);

        articuloget.value =  response.data
  
    } catch(error){
        console.log(error)
    }
}
async function getTipoArt(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/tipoArticuloAll`);

        tipoartget.value =  response.data
 

    } catch(error){
        console.log(error)
    }
}
async function getTamano(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/tamCapAll`);

        tamanoget.value =  response.data
        //console.log(tamanoget.value)
     

    } catch(error){
        console.log(error)
    }
}
async function getModelo(){ 
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/modeloAll`);

        modeloget.value =  response.data
        //console.log(modeloget.value)

    } catch(error){
        console.log(error)
    }
}
async function getMarca(){ 
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/marcasAll`);

        marcaget.value =  response.data
        //console.log(modeloget.value)

    } catch(error){
        console.log(error)
    }
}


// CREAR INVESTIGACION PROD
async function crearInvestPro(dataJson){
   
    // Usando promesas
    axios.post('http://149.50.131.95:3001/api/v1/invesProductCreated', dataJson)
        .then(response => {
            let rtaFromMysqlDb = Object.keys(response.data)
            let error = rtaFromMysqlDb.includes("errors");
            if(error){
                // EL DATO HA FALLADO AL CREARSE
                alert(response.data.errors[0].message);

            }else {
                // REGISTRO CREADO EXITOSAMENTE
                alert("investigacion registrado con exito.!");
                window.location.reload();
            }

        })
        .catch(error => {
            // Hacer algo con el error
            alert('Error no controlado.')
        });
}

// STYLE DE SELECT 2
Select2()

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

const arrayTipoArticulo = ref([])
$(document).ready(function() {
    $('#id_tipo').on('change', function() {
        var valorSeleccionado = $(this).val()
        arraytamano.value =  tamanoget.value.filter(data => data.id_tipo == valorSeleccionado)
        id_tipo.value = valorSeleccionado
      });

});

const arraytamano = ref([])
$(document).ready(function() {
    $('#id_tam_cap').on('change', function() {
        var valorSeleccionado = $(this).val()
        arraymodelo.value =  modeloget.value.filter(data => data.id_tam_cap == valorSeleccionado)
        id_tam_cap.value = valorSeleccionado
      });

});

const arraymodelo = ref([])

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

await getMediciones();
await getArticulo();
await getTipoArt();
await getTamano();
await getModelo();
await getMarca();

});

function crearDataInvest(){

    const dataJson = {
        id_medicion:id_medicion.value, 
        id_art:id_art.value,
        id_tipo:id_tipo.value,
        id_tam_cap:id_tam_cap.value ,
        id_modelo:id_modelo.value ,
        id_marca:id_marca.value ,
        descrip:descrip.value,
        cant:cant.value ,
        precio:precio.value ,
        sub_total:sub_total.value ,
        cod_sim_daka:cod_sim_daka.value ,
        user_crea:user_crea.value
    }
    // FUNCTION PARA CREAR
    crearInvestPro(dataJson)

}

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
                    <span class="text">Investición de producto</span>
                </div>
            </div>
            <div class="activity">
                <section class="container_form1">
                    <div class="container_form">
                        <FormKit type="form" #default="{ value }" @submit="crearDataInvest" :value="data"
                            submit-label="Registrar" method="post" action="/">

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
                                <select required class="js-example-basic-single"
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
                                <select required class="js-example-basic-single"
                                    id="id_tipo"
                                    v-model="id_tipo"
                                    name="id_tipo"
                                    style="width: 40%; "
                                >
                                <option value="">Seleccione un Tipo</option>
                                    <option v-for="obj in arrayTipoArticulo" :key="obj.id" :value="obj.id">{{ obj.nombre }}</option>
                                    </select>
                            </div>


                            <!--NUEVO SELECT TAMANO-->
                        <label class="label_filter" for="">Tamaño capacidad</label>
                        <div class="filtrador">
                            <select required class="js-example-basic-single"
                                id="id_tam_cap"
                                v-model="id_tam_cap"
                                name="id_tam_cap"
                                style="width: 40%; "
                            >
                                <option value="">Seleccione un tamaño</option>
                                <option v-for="obj in arraytamano" :key="obj.id" :value="obj.id">{{ obj.nombre }}</option>
                            </select>
                        </div>


                            <!--NUEVO SELECT MODELO-->
                            <label class="label_filter" for="">Modelo</label>
                            <div class="filtrador">
                                <select required class="js-example-basic-single"
                                    id="id_modelo"
                                    v-model="id_modelo"
                                    name="id_modelo"
                                    style="width: 40%; "
                                >
                                    <option value="">Seleccione un modelo</option>
                                    <option v-for="obj in arraymodelo" :key="obj.id" :value="obj.id">{{ obj.nombre }}</option>
                                </select>
                            </div>

                            <label class="label_filter" for="">Marca</label>
                            <div class="filtrador">
                                <select required class="js-example-basic-single"
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
                                prefix-icon="textarea" placeholder="Descripción" maxlength="99" minlength="10"
                                validation="required" :validation-messages="{
                                    required: 'Escriba una descripción',
                                }" help="" />

                            <FormKit v-model="cant" type="number" label="Cantidad" value="cant" prefix-icon="number"
                                placeholder="Cantidad" validation="required" :validation-messages="{
                                    required: 'Ingrese la cantidad',
                                }" help="" />

                            <FormKit v-model="precio" type="number" step="0.01" label="Precio" value="precio"
                                prefix-icon="number" placeholder="Precio" validation="required" :validation-messages="{
                                    required: 'Ingre el precio',
                                }" help="" />

                            <FormKit v-model="sub_total" type="number" step="0.01 " label="SubTotal" value="sub_total"
                                prefix-icon="number" :value="multiplicationResult"  placeholder="SubTotal" validation="required" disabled
                                :validation-messages="{
                                    required: '',
                                }" help="" />

                            <FormKit v-model="user_crea" type="text" label="Usuario de creación" value="user_crea"
                                prefix-icon="" placeholder="" validation="required" disabled
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

