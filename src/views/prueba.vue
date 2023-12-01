<script setup> 
// COMPONENTES
import Navv from '../components/Nav.vue'

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
const loadingInfo = ref(false);


const headers = [
  {title: 'Id', align: 'start', sortable: false, key: 'id',},
  {title: 'Id investigacion', align: 'start', sortable: false, key: 'id_invest',},
  { title: 'Hora', key: 'hora' },
  { title: 'Numero visitantes', key: 'nro_visitantes' },
  { title: 'Numero facturas', key: 'nro_facturas' },
  { title: 'Editar', key: 'editar', sortable: false },
  { title: 'Eliminar', key: 'eliminar', sortable: false },
]

// URL
const id = ref('')
id.value = route.params.key 

const usuario = ref('')
usuario.value = localStorage.usuario;

// FUNCTION PARA LLENAR TABLE
async function getTipoArticulo(){
  loadingInfo.value = true
    try{
      const response = await axios.get(`http://localhost:3001/api/v1/medicionAll`);
      info.value = response.data.map(invest => ({
            id: invest.id,
            id_invest: invest.id_invest,
            hora: invest.hora,
            nro_visitantes: invest.nro_visitantes,
            nro_facturas: invest.nro_facturas,
        }));

        
    } catch(error){

        console.log(error)
    }
    loadingInfo.value = false
}

    const search = ref('')

   

  function editItem(item) {
  const editedIndex = item.id
  // editedItem.value = { ...item }
  // dialog.value = true

  alert(editedIndex)
}
    function deleteItem (item) {
  const editedIndex = info.value.indexOf(item)
  // editedItem.value = { ...item }
  // dialog.value = true

  alert(editedIndex)
}
    
onMounted( async () => {

await getTipoArticulo();
});

</script>

<template>
    <Navv :class="{ close: valor }" />
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
                    <span class="text">Medicion</span>

                </div>
            </div>
            <div class="activity">

                <div class="datatable-container">
                    </div>
                    <!-- DATATABLE -->

                    <div class="datatable-container">
                    <div class="header-tools">
                    <div class="tools">
                        <ul> 
                            <li>
                                <router-link to="/tamCapCreated">
                                    <button class="topi">
                                        Crear
                                    </button>
                                </router-link>
                            </li>
                        </ul>
                    </div>

                   
                    </div>
                    <!-- TABLA -->
                    <v-data-table 
                      v-model:search="search"
                      :loading="loadingInfo"
                      :headers="headers"
                      :items="info"
                      :sort-by="[{ key: 'id_invest', order: 'desc' }]"
                    >
                      <template v-slot:top >
                        
                        <v-card-title class="d-flex align-center pe-2">
                            <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
                            

                            <v-spacer></v-spacer>

                            <v-text-field
                              v-model="search"
                              prepend-inner-icon="mdi-magnify"
                              density="compact"
                              label="Search"
                              single-line
                              flat
                              hide-details
                              variant="solo-filled"
                            ></v-text-field>
                          </v-card-title>
                        
                      </template>
                        <!-- BOTONES ELIMINAR Y EDITAR -->
                        <template v-slot:item.editar="{ item }">
                          <router-link :to="{path:'medicionesEdit/'+item.id}"> 
                            <v-icon size="x-large" class="me-4" color="amber">
                            mdi-pencil
                          </v-icon>
                          </router-link>
                        </template>

                        <template v-slot:item.eliminar="{ item }">
                          <router-link :to="{path:'medicionesDelete/'+item.id}"> 
                            <v-icon size="x-large"  color="red-darken-3">
                              mdi-delete
                            </v-icon>
                          </router-link>
                        </template>
                        

                        <!-- <template v-slot:no-data>
                          <v-btn
                            color="primary"
                            @click="initialize"
                          >
                            Reset
                          </v-btn>
                        </template> -->
                    </v-data-table>
                    </div>
                    <br>
                  
                </div>
            </div>
        
    </section>
</template>
<style>

nav.v-pagination{
    display: none;
    
}
</style>

