<script setup> 
// COMPONENTES
import Nav from '../components/Nav.vue'

// LIBRERIAS
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import Swal from 'sweetalert2'
// VARIABLES
const route = useRoute()
const router = useRouter()
const valor = ref(false);
const info = ref([]);
const id = ref('')
id.value = route.params.key 
let usuarios = ref([])


onMounted( async () => {

await getMedicion();
tabla();

});

// FUNCTION PARA LLENAR TABLE
async function getMedicion(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/medicionAll`);

        usuarios.value =  response.data
    } catch(error){

        console.log(error)

    }
}

function tabla() {
    nextTick(() => {
    $('#sampleTable').DataTable()
  })
}

// FUNCTION PARA ELIMINAR DATA
async function eliminarMedicion(key){
          
    try{
        const response = await axios.delete(`http://149.50.131.95:3001/api/v1/mediciondelete/${key}`);
    } catch(error){
        console.log(error)
    }
}



function eliminarData(key){
    Swal.fire({

        icon: 'question',
        title: 'Alerta!',
        text: '¿Deseas eliminar estos datos?',
        background: '#3A3B3C',
        color: '#fff',
        confirmButtonText: 'Eliminar',

    }).then((result) => {
        if (result.isConfirmed) {

        // REDIRECCIONA AL TABLE PRINCIPAL  
        eliminarMedicion(key)
        router.push('/mediciones');
        window.location.reload();

        }
    })
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
                    <span class="text">Investigacion de Productos</span>

                </div>
            </div>
            
            <div class="activity">

                <div class="datatable-container" >
                    <table class="datatable" id="sampleTable">
                    <thead>
                        <tr >
                            <th>Id</th>
                            <th>Id Investigacion</th>
                            <th>Corte Horario</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr v-for="medicion, i in usuarios" :key="medicion.id">
                            
                            <td>{{ medicion.id }}</td>
                            <td>{{ medicion.id_invest }}</td>
                            <td>{{ medicion.hora}}</td>

                            <td>
                                <router-link :to="{path:'medicionesEdit/'+medicion.id}" class="edit"> 
                                        <i class="ri-edit-box-line"></i>
                                </router-link> 
                            </td>
                            <td>
                                <button class="delete" @click.prevent="eliminarData(medicion.id)">
                                    <i class="ri-delete-bin-7-line"></i>
                                </button> 
                            </td>
                        </tr>

                    </tbody>
                </table>
                </div>

            </div>

        </div>
    </section>
</template>







