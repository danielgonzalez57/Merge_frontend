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
async function getLinea(){
    try{
        const response = await axios.get(`http://localhost:3001/api/v1/lineasAll`);

        info.value =  response.data

        console.log(info.value)

    } catch(error){

        console.log(error)

    }
}

onMounted( async () => {

   await getLinea();

});

const columns = ref([
    {data:null, render: function(data,type,row,meta){
        return `${meta.row+1}`}},
    {data:'id'},
    {data:'nombre'},
    {data:'cod_sap'},
    {data:'user_crea'},
    {data:'fec_crea'},
    {data:'id', render: (data,type,row,meta) => `
    <i class="ri-edit-2-line edit-table" onclick="location.href='/lineaEdit/${data}';"></i>`},

    {data:'id', render: (data,type,row,meta,) => `
        <i class="ri-delete-bin-5-line delete-table" onclick="location.href='/lineaDelete/${data}';"></i>`},
                                
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
                    <span class="text">Maestro de Lineas</span>

                </div>
            </div>
            
            <div class="activity">

                <div class="datatable-container">
                    <div class="header-tools">
                    <div class="tools">
                        <ul> 
                            <li>
                                <router-link to="/lineaCreate">
                                    <button class="topi">
                                        Crear
                                    </button>
                                </router-link>
                            </li>
                        </ul>
                    </div>

                   
                    </div>

                    <DataTable :data="info" :columns="columns">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Id Marca</th>
                                <th>Nombre</th>
                                <th>Codigo SAP</th>
                                <th>Creado por</th>
                                <th>Fecha Creación</th>
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

<style scoped>
    .delete{
        color: #000;
        font-size: 21px;
        background-color: #d00000;
        padding: 7px 8px;
        border-radius: 3px;
        transition: 0.3s all ease;
        border: none;
    }
    .edit{
        color: #000;
        font-size: 21px;
        background-color: #faa307;
        padding: 4px 8px;
        border-radius: 3px;
        transition: 0.3s all ease;
    }
    .delete:hover{
        background-color: #a70000;
        cursor: pointer;
    }
    .edit:hover{
        background-color: #e99700;
    }
</style>


