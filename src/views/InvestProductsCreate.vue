<script setup>
import Nav from '../components/Nav.vue';
import axios from 'axios';
import { ref, onMounted, watch, computed } from 'vue';
const valor = ref(false)

//SELECT CON DATA
const medicionget = ref()
const articuloget = ref()
const tipoartget = ref()


// INPUTS 
const id_medicion = ref([])
const id_art = ref([])
const id_tipo = ref([])
const id_tam_cap = ref('')
const id_modelo = ref('')
const id_marca = ref('')
const descrip = ref('')
const user_crea = ref(localStorage.usuario)


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
        tipoartget.value = response.data.map(tipoArt => ({
            title: tipoArt.nombre,
            value: tipoArt.id,
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


// $(document).ready(function() {
//     $('#id_art').on('change', function() {
//         var valorSeleccionado = $(this).val()
//         arrayTipoArticulo.value =  tipoartget.value.filter(data => data.id_articulo == valorSeleccionado)
//         id_art.value = valorSeleccionado
//       });

// });

// const filteredSubItems = computed(() => {
//   return tipoartget.value.filter(data => data.id_articulo == id_art.value);
// });

// const onChange = () => {
//     id_tipo.value = '';
// };


onMounted( async () => {

await getMediciones();
await getArticulo();
await getTipoArt();


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

                        <label class="label_filter" for="">Buscador de articulo por modelo</label>
                        <div class="input-container">
                            <input required="" placeholder="Coloca el modelo" type="text" >
                            <button class="invite-btn" type="button">
                                Buscar
                            </button>
                        </div>
                        <br>
                        <FormKit 
                            type="form"  
                            @submit="crearDataInvest" :value="data"
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
                                :return-object="false"
                            ></v-combobox>

                            <!--NUEVO SELECT  ARTICULO-->
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

                            <!--NUEVO SELECT  TIPO ART-->
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

                            <FormKit 
                                v-model="descrip" 
                                type="text" 
                                label="Descripción" 
                                value="descrip" 
                                placeholder="Descripción" 
                                maxlength="99" 
                                minlength="10"
                                validation="required" 
                                :validation-messages="{
                                    required: 'Escriba una descripción',
                                }" help="" />

                            <FormKit 
                                v-model="user_crea" 
                                type="text" 
                                label="Usuario de creación" 
                                value="user_crea"
                                placeholder="" validation="required" disabled 
                                :validation-messages="{
                                    required: '',
                                }" help="" />
                            
                        </FormKit>
                    
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



