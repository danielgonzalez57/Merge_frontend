<script setup>
import Nav from '../components/Nav.vue';
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import Select2 from '../funciones/select2'
const valor = ref(false)
import Swal from 'sweetalert2'
import router from '../router/index'

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

const busqueda = ref();
const busqueda2 = ref();
const busqueda3 = ref();
const busqueda4 = ref();
const busqueda5 = ref();



async function searchModel() {
    await axios.post('http://localhost:3001/api/v1/searchModelInvestProduct', {model: data.value.searchModelInput})
        .then(function (response) {

            if(response.data.length != 0){
                busqueda.value =  response.data[0].Articulo
                busqueda2.value =  response.data[0].TipoArt
                busqueda3.value =  response.data[0].TamañoCap
                busqueda4.value =  response.data[0].id_Modelo
                busqueda5.value =  response.data[0].Marca
            } else {
                Swal.fire({
                    title: "El modelo no existe!",
                    text: "Desea crea un nuevo modelo?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Crear"
                    }).then((result) => {
                    if (result.isConfirmed) {
                        // Swal.fire({
                        // title: "Modelo Creador!",
                        // text: ":).",
                        // icon: "success"
                        // });
                        router.push('/modeloClientes');
                    }
                });
            }
            

        })
        .catch(function (error) {
            console.log(error);
        });
}



// INPUTS 
const id_medicion = ref()
const id_art = ref(busqueda)
const id_tipo = ref(busqueda2)
const id_tam_cap = ref(busqueda3)
const id_modelo = ref(busqueda4)
const id_marca = ref(busqueda5)
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
        const response = await axios.get(`http://localhost:3001/api/v1/medicionAll`);
        medicionget.value = response.data.map(medi => ({
            title: medi.id,
            value: medi.id,
        }));

    } catch(error){
        console.log(error)
    }
}
async function getArticulo(){
    try{
        const response = await axios.get(`http://localhost:3001/api/v1/articuloAll`);

        articuloget.value = response.data.map(art => ({
            title: art.nombre,
            value: art.id,
        }));
  
    } catch(error){
        console.log(error)
    }
}
async function getTipoArt(){
    try{
        const response = await axios.get(`http://localhost:3001/api/v1/tipoArticuloAll`);

        tipoartget.value =  response.data.map(tipoArt => ({
            title: tipoArt.nombre,
            value: tipoArt.id,
        }));
 

    } catch(error){
        console.log(error)
    }
}
async function getTamano(){
    try{
        const response = await axios.get(`http://localhost:3001/api/v1/tamCapAll`);

        tamanoget.value =  response.data.map(tamCap => ({
            title: tamCap.nombre,
            value: tamCap.id,
        }));
     

    } catch(error){
        console.log(error)
    }
}
async function getModelo(){ 
    try{
        const response = await axios.get(`http://localhost:3001/api/v1/modeloAll`);
        modeloget.value =  response.data.map(modelo => ({
            title: modelo.nombre,
            value: modelo.id,
        }));
    } catch(error){
        console.log(error)
    }
}
async function getMarca(){ 
    try{
        const response = await axios.get(`http://localhost:3001/api/v1/marcasAll`);
        marcaget.value =  response.data.map(marca => ({
            title: marca.nombre,
            value: marca.id,
        }));
    } catch(error){
        console.log(error)
    }
}
// CREAR INVESTIGACION PROD
async function crearInvestPro(dataJson){
   
    // Usando promesas
    axios.post('http://localhost:3001/api/v1/invesProductCreated', dataJson)
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

// // STYLE DE SELECT 2
// Select2()

// //metodo change de la lista articulos
// $(document).ready(function() {
//     $('#id_medicion').on('change', function() {
//         var valorSeleccionado = $(this).val()
//        id_medicion.value = valorSeleccionado
//       });

// });



// const arrayTipoArticulo = ref([])

// $(document).ready(function() {
//     $('#id_tipo').on('change', function() {
//         var valorSeleccionado = $(this).val()
//         arraytamano.value =  tamanoget.value.filter(data => data.id_tipo == valorSeleccionado)
//         id_tipo.value = valorSeleccionado
//       });

// });

// const arraytamano = ref([])

// $(document).ready(function() {
//     $('#id_tam_cap').on('change', function() {
//         var valorSeleccionado = $(this).val()
//         arraymodelo.value =  modeloget.value.filter(data => data.id_tam_cap == valorSeleccionado)
//         id_tam_cap.value = valorSeleccionado
//       });

// });

// const arraymodelo = ref([])

// $(document).ready(function() {
//     $('#id_modelo').on('change', function() {
//         var valorSeleccionado = $(this).val()
//         var keySeleccionado = $(this).find(':selected').data('key');
//         arraymarca.value =  marcaget.value.filter(data => data.id_marca == keySeleccionado)
//         id_modelo.value = valorSeleccionado
//       });
// });

// const arraymarca = ref([])

// $(document).ready(function() {
//     $('#id_marca').on('change', function() {
//         var valorSeleccionado = $(this).val()
//         id_marca.value = valorSeleccionado
//       });

// });


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
<template >

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

                <router-link to="/investProducts">
                    <v-btn prepend-icon="mdi-arrow-left" color="green-lighten-1">
                        Volver
                    </v-btn>
                </router-link>
                
            </div>
            <br>
            <div class="activity">
                <section class="container_form1">

                        <label for="">Buscador de articulo por modelo</label>
                        <div class="input-container">
                            <input required="" placeholder="Coloca el modelo" type="text" v-model="data.searchModelInput">
                            <button class="invite-btn" type="button" @click="searchModel">
                                Buscar
                            </button>
                        </div>
                        <br>

                        
                            
                            <FormKit 
                                type="form" 
                                :return-object="false"
                                @submit="crearDataInvest" 
                                :value="data"
                                submit-label="Registrar" method="post" action="/">

                                <!--NUEVO SELECT  MEDICION-->
                            <label class="label_filter" for="">Id medicion</label>
                            <v-combobox
                                clearable
                                required
                                chips
                                v-model="id_medicion"
                                name="id_medicion"
                                placeholder="Selecciona el id medicion"
                                :items="medicionget"
                                variant="outlined"
                                style="width: 50%;"
                            ></v-combobox>
                                
                                <label class="label_filter" for="">Articulo</label>
                                <v-combobox
                                    clearable
                                    required
                                    chips
                                    v-model="id_art"
                                    name="id_art"
                                    placeholder="Selecciona el articulo"
                                    :items="articuloget"
                                    variant="outlined"
                                    style="width: 50%;"
                                    :return-object="false"
                                ></v-combobox>

                                <label class="label_filter" for="">Tipo articulo</label>
                                <v-combobox
                                    clearable
                                    required
                                    chips
                                    v-model="id_tipo"
                                    name="id_tipo"
                                    placeholder="Selecciona el tipo articulo"
                                    :items="tipoartget"
                                    variant="outlined"
                                    style="width: 50%;"
                                    :return-object="false"
                                ></v-combobox>

                                <label class="label_filter" for="">Tamaño Capacidad</label>
                                <v-combobox
                                    clearable
                                    required
                                    chips
                                    v-model="id_tam_cap"
                                    name="id_tam_cap"
                                    placeholder="Selecciona el tamaño capacidad"
                                    :items="tamanoget"
                                    variant="outlined"
                                    style="width: 50%;"
                                    :return-object="false"
                                ></v-combobox>

                                <label class="label_filter" for="">Modelo</label>
                                <v-combobox
                                    clearable
                                    required
                                    chips
                                    v-model="id_modelo"
                                    name="id_modelo"
                                    placeholder="Selecciona el modelo"
                                    :items="modeloget"
                                    variant="outlined"
                                    style="width: 50%;"
                                    :return-object="false"
                                ></v-combobox>

                                <label class="label_filter" for="">Marca</label>
                                <v-combobox
                                    clearable
                                    required
                                    chips
                                    v-model="id_marca"
                                    name="id_marca"
                                    placeholder="Selecciona una marca"
                                    :items="marcaget"
                                    variant="outlined"
                                    style="width: 50%;"
                                    :return-object="false"
                                ></v-combobox>
                    
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
                                        required: 'Ingrese el precio',
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
                        

                       
                    
                </section>
            </div>
        </div>
        <br>
        <br>
    </section>
</template>

<style >
[data-invalid] .formkit-inner {
    border-color: red;
    box-shadow: 0 0 0 lid  red;
}



.input-modelo{
    padding: 7px;
    border-radius: 3px;
    border: 1px solid  ;
}

.formkit-inner {
   width: 100%;
}
.formkit-form{
    
    width: 80%;
    
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

.input-container {
  position: relative;
  display: flex;
  height: 2.8rem;
  width: 100%;
  min-width: 200px;
  max-width: 400px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 20px 20px 30px rgba(0, 0, 0, .05);
}

.input-container input {
  height: 100%;
  width: 100%;
  border-radius: 8px;
  border: 1px solid  rgb(176 190 197);
  background-color: transparent;
  padding: 0.625rem 70px 0.625rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
  color: rgb(69 90 100);
  outline: none;
  transition: all .15s cubic-bezier(0.4, 0, 0.2, 1);
}

.input-container input:focus {
  border: 1px solid #00aa3c;
}

.invite-btn {
  position: absolute;
  width: 65px;
  right: 4px;
  top: 4px;
  bottom: 4px;
  z-index: 10;
  border-radius: 4px;
  background-color: #00aa3c;
  color: #fff;
  padding-top: .25rem;
  padding-bottom: .25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  text-align: center;
  vertical-align: middle;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  border: none;
  transition: .6s ease;
}

.invite-btn:hover {
  right: 2px;
  top: 2px;
  bottom: 2px;
  border-radius: 8px;
  cursor: pointer;
}

.input-container input:placeholder-shown ~ .invite-btn {
  pointer-events: none;
  background-color: gray;
  opacity: 0.5;
}



</style> 



