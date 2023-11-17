<script setup> 
import Nav from '../components/Nav.vue'

import { ref, onMounted, computed} from 'vue';
import {  useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const valor = ref(false)
const usuario = localStorage.usuario;
const tamCap = ref([])

// URL
const id = ref('')
id.value = route.params.key 


const jsonMod = ref({

id_tam_cap:'',
nombre:'', 
user_crea: `${usuario}`,

});

async function modeloCreated(){
    
    try{
        const response = await axios.post(`http://149.50.131.95:3001/api/v1/modeloCreated`, jsonMod.value)
        
        if(response.data.status === 'ok'){

            Swal.fire({
                icon: 'question',
                title: 'Alerta!',
                text: '¿Deseas guardar los datos?',
                background: '#3A3B3C',  
                color: '#fff',
                confirmButtonText: 'Guardar',
            }).then((result) => {
                if (result.isConfirmed) {

                // REDIRECCIONA AL TABLE PRINCIPAL
                router.push('/modelo');

                }
            })

            }
    } catch(error){
        console.log(error)

    }
}

// FUNCTION PARA LLENAR SELECT
async function getTamCap(){
    try{
        const response = await axios.get(`http://localhost:3001/api/v1/tamCapAll`);
        tamCap.value = response.data.map(linea => ({
            label: linea.nombre,
            value: linea.id
        }));

    } catch(error){

        console.log(error)
    }
}


onMounted( async () => {

await getTamCap();

});



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
                    <span class="text">Modelo</span>
                </div>

            </div>

            <div class="activity">
                <section class="container_form1">

                    <div class="container">
                        <FormKit
                            type="form"
                            @submit="modeloCreated"
                            submit-label="Registrar Maestro"
                        >

                            <FormKit
                                type="text"
                                label="Modelo"
                                placeholder="Modelo"
                                validation="required"
                                v-model="jsonMod.nombre"
                                :validation-messages="{  
                                    required: 'Debe colocar el modelo.'
                                }"
                            />

                            <FormKit
                                type="select"
                                label="Tamaño Capacidad"
                                name="id_tam_cap"
                                class="formKitt"
                                v-model="jsonMod.id_tam_cap"
                                placeholder="Escoge un articulo"
                                :options="tamCap"
                                validation="required"
                                :validation-messages="{
                                    required: 'Debes Escoger un tamaño.',
                                }"
                            />

                            <FormKit
                                type="text"
                                label="Creado por"
                                name="user_crea"
                                v-model="jsonMod.user_crea"
                                validation="required"
                                disabled
                                :validation-messages="{
                                    required: 'Debes colocar la latitud.'
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

<style scoped>
    .container-combobox{
        width: 40%;
        min-width: 100%;
    }
    .comboInput{
        padding: 14px;
        border-radius: 5px;
        color: #999;
    }
</style>


