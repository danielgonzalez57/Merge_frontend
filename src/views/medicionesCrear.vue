<script setup>
import { MedicionCrud } from '../stores/mediciones.js';
import { ref, onMounted } from 'vue';
const usuario = localStorage.usuario;
import Select2 from '../funciones/select2'
const valor = ref();

const mediciones = MedicionCrud();
const info = ref();

const json = ref({
    id_invest:'', 
    hora:'',
    user_crea:`${usuario}`,
    user_mod:'',
    nro_visitantes:'',
    nro_facturas:'',
});

const id_invest = ref('')
const hora = ref('')
const user_crea = ref(usuario)
const user_mod = ref('')
const nro_visitantes = ref('')
const nro_facturas = ref('')

async function getInvestigacion(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/investigacionAll`);
        info.value =  response.data
        console.log(info.value)
    } catch(error){
        console.log(error)
    }
}

onMounted( async () => {
await getInvestigacion();
});

$(document).ready(function() {
    $('#id_invest').on('change', function() {
        var valorSeleccionado = $(this).val()
        id_invest.value = valorSeleccionado
      });
});

Select2()

function addDataC(){

const jsonE = {
    id_invest:id_invest.value, 
    hora:hora.value,
    user_crea:user_crea.value,
    user_mod:user_mod.value ,
    nro_visitantes:nro_visitantes.value,
    nro_facturas:nro_facturas.value
    }
    mediciones.medicionCreate(jsonE)

}

</script>

<template>
    <Nav :class="{ close: valor }"/>
    
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
                    <span class="text">Crear Mediciones</span>
                </div>
            </div>

            <div class="activity">
            <section class="container_form1">
                
                <!-- <form class="form" @:submit.prevent="$event => mediciones.medicionCreate(json)" > -->
                    <div class="container">
                        <FormKit
                            type="form"
                            @submit="addDataC"
                            submit-label="Registrar"
                        >

                        <label class="label_filter" for="">Id investigacion</label>
                            <div class="filtrador">
                                <select required class="js-example-basic-single filter-medicion"
                                    id="id_invest"
                                    v-model="id_invest"
                                    name="id_invest"
                                    style="width: 40%;"
                                > 
                                    <option  value="">Seleccione id investigacion</option>
                                    <option v-for="obj in info" :key="obj.id" :value="obj.id">{{ obj.id }}</option>
                                </select>

                            </div>

                            <FormKit
                                type="select"
                                label="Corte horario"
                                name="hora"
                                class="formKitt"
                                v-model="hora"
                                placeholder="Escoge un corte"
                                :options="[ 
                                    { label: 'CORTE 1', value: 1 },
                                    { label: 'CORTE 2', value: 2 },
                                    { label: 'CORTE 3', value: 3 }]"
                                validation="required"
                                :validation-messages="{
                                    required: 'Debes escoger el corte horario.',
                                }"
                            />

                            <FormKit
                                type="text"
                                label="Creado por"
                                name="user_crea"
                                placeholder="user_crea"
                                v-model="user_crea"
                                validation="required"
                                disabled
                                :validation-messages="{
                                    required: 'Debes colocar el user_crea'
                                }"
                            />

                            <FormKit
                                type="number"
                                label="Numero de visitantes"
                                name="nro_visitantes"
                                placeholder="Numero de visitantes"
                                validation="required"
                                v-model="nro_visitantes"
                                :validation-messages="{
                                    required: 'Debes colocar el numero de visitantes.'
                                }"
                            />
                            <FormKit
                                type="number"
                                label="Numero de facturas"
                                name="nro_facturas"
                                placeholder="Numero de facturas"
                                validation="required"
                                v-model="nro_facturas"
                                :validation-messages="{
                                    required: 'Debes colocar el numero de facturas.'
                                }"
                            />

                        </FormKit>
                    </div>
                </section>
            </div>
        </div>
        <br>
        <br>
    </section>
</template>

<script> 
import Nav from '../components/Nav.vue'

import router from '../router/index'
export default {
        components: {
            Nav,
            // Top
        }
    } 
</script>


