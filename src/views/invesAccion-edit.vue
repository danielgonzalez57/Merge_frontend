<script setup>
import Nav from '../components/Nav.vue'
import Swal from 'sweetalert2'

import { ref, onMounted} from 'vue';
import {  useRoute, useRouter } from 'vue-router'
const usuario = localStorage.usuario;
import Select2 from '../funciones/select2'

const route = useRoute()
const router = useRouter()
const valor = ref(false)
const investigacionEdit = ref([]);
const info = ref([]);


const fecha = ref('')
const id_tienda = ref('')
const motivo = ref('')
const investigador = ref('')
const user_crea = ref('')
const user_mod = ref('')

// URL
const id = ref('')
id.value = route.params.key 
console.log(id.value)


const jsonInvesEdit = ref({

fecha:'', 
id_tienda:'',
motivo:'',
investigador:'',
user_crea:'',
user_mod:''

});

async function getTienda(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/maestroTiendaAll`);
        info.value =  response.data
        console.log(info.value)
    } catch(error){
        console.log(error)
    }
}

async function getFilterInvestigacion(){
    
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/InvestigacionFilter/${id.value}`)
        console.log(response.data)
        investigacionEdit.value =  response.data
    } catch(error){
        console.log(error)

    }
}

async function postInvestigacion(jsonInves, id){
    
    try{
        const response = await axios.put(`http://149.50.131.95:3001/api/v1/investigacionUpdate/${id.value}`, jsonInves)
        
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
                router.push('/invesAccion');

                }
            })

            }
        

    } catch(error){
        console.log(error)

    }
}

onMounted( async () => {
    
    await getFilterInvestigacion();
    await getTienda();
    
    // fecha.value = investigacionEdit.value.fecha
    id_tienda.value = investigacionEdit.value.id_tienda
    motivo.value = investigacionEdit.value.motivo
    investigador.value = investigacionEdit.value.investigador
    user_crea.value = investigacionEdit.value.user_crea
    user_mod.value = usuario
});

$(document).ready(function() {
    $('#id_tienda').on('change', function() {
        var valorSeleccionado = $(this).val()
        id_tienda.value = valorSeleccionado
      });
});
Select2()

function UpdateData(){

const jsonInves = {

    id_tienda:id_tienda.value, 
    motivo:motivo.value,
    investigador:investigador.value,
    user_crea:user_crea.value ,
    user_mod:user_mod.value

}
   postInvestigacion(jsonInves, id)

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
                    <span class="text">Investigacion</span>
                </div>
            </div>

            <div class="activity">
            <section class="container_form1">

                <div class="container">
                        <FormKit
                            type="form"
                            @submit="UpdateData"
                            submit-label="Actualizar"
                        >

                            <FormKit
                                type="date"
                                label="Fecha de creacion"
                                validation="required"
                                :validation-messages="{  
                                    required: 'debe colocar una fecha.'
                                    }"
                            />
                            <label class="label_filter" for="">Tienda</label>
                            <div class="filtrador">
                                <select disabled required class="js-example-basic-single filter-medicion"
                                    id="id_tienda"
                                    v-model="id_tienda"
                                    name="id_tienda"
                                    style="width: 40%;"
                                > 
                                    <option  value="">Seleccione la tienda</option>
                                    <option v-for="obj in info" :key="obj.id" :value="obj.id">{{ obj.nombre }}</option>
                                </select>

                            </div>
                            
                            <FormKit
                                type="select"
                                label="Motivo"
                                name="motivo"
                                class="formKitt"
                                v-model="motivo"
                                placeholder="Escoge un motivo"
                                :options="['RUTINA', 'INAUGURACION', 'RRSS']"
                                validation="required"
                                :validation-messages="{
                                    required: 'Debes colocar el motivo de la investigacion.',
                                }"
                            />

                            <FormKit
                                type="text"
                                label="Investigador"
                                name="investigador"
                                placeholder="Nombre del investigador"
                                validation="required"
                                v-model="investigador"
                                :validation-messages="{
                                    required: 'Debes colocar el nombre del investigador.'
                                }"
                            />
                            <FormKit
                                type="text"
                                label="Creado por"
                                name="investigador"
                                placeholder="Nombre "
                                validation="required"
                                disabled
                                v-model="user_crea"
                                :validation-messages="{
                                    required: 'Debes colocar el nombre del user.'
                                }"
                            />
                            <FormKit
                                type="text"
                                label="Modificado por"
                                name="user_mod"
                                placeholder="Nombre del investigador"
                                validation="required"
                                v-model="user_mod"
                                disabled
                                :validation-messages="{
                                    required: 'Debes colocar el nombre del user.'
                                }"
                            />

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


