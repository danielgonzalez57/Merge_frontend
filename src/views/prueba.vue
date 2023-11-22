<script setup> 
// COMPONENTES
import Nav from '../components/Nav.vue'

const valor = ref(false);
// LIBRERIAS
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { VueGoodTable } from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'

const components = {
  VueGoodTable
};


// Datos de las filas
const rows = [
  { nombre: 'Juan', edad: 30, ciudad: 'Caracas' },
  { nombre: 'Ana', edad: 25, ciudad: 'Maracaibo' },
  // Agrega más filas según sea necesario
];

// Datos de las columnas
const columns = [
  { field: 'nombre', label: 'Nombre' },
  { field: 'edad', label: 'Edad' },
  { field: 'ciudad', label: 'Ciudad' },
  // Agrega más columnas según sea necesario
];



 
// // VARIABLES
// const route = useRoute()
// const router = useRouter()
// const info = ref([]);

// // URL
// const id = ref('')
// id.value = route.params.key 
// async function getmodelo(){
//     try{
//         const response = await axios.get(`http://localhost:3001/api/v1/modeloAll`);

//         info.value =  response.data

//     } catch(error){

//         console.log(error)
//     }
// }



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

                    <i class="ri-dashboard-2-line"></i>
                    <span class="text">PRUEBA</span>

                </div>
            </div>
            
            <div class="activity">
                <div class="datatable-container">
                    <vue-good-table
                    :columns="columns"
                    :rows="rows"
                    :search-options="{
                        enabled: true
                    }">
                    </vue-good-table>

    

        
                </div>

            </div>
        </div>

               
    </section>
</template>


