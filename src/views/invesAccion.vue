<script setup> 
// COMPONENTES
import Nav from '../components/Nav.vue'

// LIBRERIAS
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
 
DataTable.use(DataTablesCore);
 
// VARIABLES
const route = useRoute()
const router = useRouter()
const valor = ref(false);
const info = ref([]);

// URL
const id = ref('')
id.value = route.params.key 

// FUNCTION PARA LLENAR TABLE
async function getInvestigacion(){
    try{
        const response = await axios.get(`http://localhost:3001/api/v1/investigacionAll`);

        info.value =  response.data

    } catch(error){

        console.log(error)
    }
}

onMounted( async () => {

   await getInvestigacion();

});

const columns = ref([
    {data:null, render: function(data,type,row,meta){
        return `${meta.row+1}`}},
    {data:'id'},
    {data:'fecha'},
    {data:'id_tienda'},
    {data:'id', render: (data,type,row,meta) => `
    <i class="ri-edit-2-line edit-table" onclick="location.href='/invesAccion-edit/${data}';"></i>`},

    {data:'id', render: (data,type,row,meta,) => `
        <i class="ri-delete-bin-5-line delete-table" onclick="location.href='/invesAccion-delete/${data}';"></i>`},                
]);


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
                    <span class="text">Investigacion</span>

                </div>
            </div>
            
            <div class="activity">

                <div class="datatable-container">
                    <div class="header-tools">
                    <div class="tools">
                        <ul> 
                            <li>
                                <router-link to="/invesAccion-create">
                                    <button class="topi">
                                        Crear
                                    </button>
                                </router-link>
                            </li>
                            
                        </ul>
                    </div>

                   
                    </div>

                    <DataTable :data="info" :columns="columns" :options="{ language:{
                        search:'Buscar', zeroRecords: 'No Hay registros para mostrar',
                        info: 'Mostrando del _START_ a _END_ de _TOTAL_ registros',
                        infoFiltered: '(filtrado de un total de _MAX_ registros)',
                        paginate:{first:'Primero', previous: 'Anterior', next:'Siguiente', last:'Ultimo'},
                    }}">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Id Investigacion</th>
                                <th>Fecha de Investigacion</th>
                                <th>Tienda</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                    </DataTable>
                </div>

            </div>

        </div>
    </section>
</template>


