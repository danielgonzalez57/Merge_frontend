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

// URL
const id = ref('')
id.value = route.params.key 

const usuario = ref('')
usuario.value = localStorage.usuario;

// FUNCTION PARA LLENAR TABLE
async function getTipoArticulo(){
    try{
      const response = await axios.get(`http://localhost:3001/api/v1/medicionAll`);
      info.value = response.data.map(invest => ({
            id_invest: invest.id_invest,
            hora: invest.hora,
        }));

        
    } catch(error){

        console.log(error)
    }
}



    const search = ref('')

    const items = ref([
    {
            name: 'Nebula GTX 3080',
            image: '1.png',
            price: 699.99,
            rating: 5,
            stock: true,
          },
          {
            name: 'Galaxy RTX 3080',
            image: '2.png',
            price: 799.99,
            rating: 4,
            stock: false,
          },
          {
            name: 'Orion RX 6800 XT',
            image: '3.png',
            price: 649.99,
            rating: 3,
            stock: true,
          },
          {
            name: 'Vortex RTX 3090',
            image: '4.png',
            price: 1499.99,
            rating: 4,
            stock: true,
          },
          {
            name: 'Cosmos GTX 1660 Super',
            image: '5.png',
            price: 299.99,
            rating: 4,
            stock: false,
          },
          {
            name: 'Vortex RTX 3090',
            image: '4.png',
            price: 1499.99,
            rating: 4,
            stock: true,
          },
          {
            name: 'Cosmos GTX 1660 Super',
            image: '5.png',
            price: 299.99,
            rating: 4,
            stock: false,
          },
          {
            name: 'Vortex RTX 3090',
            image: '4.png',
            price: 1499.99,
            rating: 4,
            stock: true,
          },
          {
            name: 'Cosmos GTX 1660 Super',
            image: '5.png',
            price: 299.99,
            rating: 4,
            stock: false,
          },
          {
            name: 'Vortex RTX 3090',
            image: '4.png',
            price: 1499.99,
            rating: 4,
            stock: true,
          },
          {
            name: 'Cosmos GTX 1660 Super',
            image: '5.png',
            price: 299.99,
            rating: 4,
            stock: false,
          },
          {
            name: 'Vortex RTX 3090',
            image: '4.png',
            price: 1499.99,
            rating: 4,
            stock: true,
          },
          {
            name: 'Cosmos GTX 1660 Super',
            image: '5.png',
            price: 299.99,
            rating: 4,
            stock: false,
          },
          {
            name: 'Vortex RTX 3090',
            image: '4.png',
            price: 1499.99,
            rating: 4,
            stock: true,
          },
          {
            name: 'Cosmos GTX 1660 Super',
            image: '5.png',
            price: 299.99,
            rating: 1,
            stock: false,
          },
      // ...resto de tus datos
    ])
    
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

                    <v-card flat>
                        <v-card-title class="d-flex align-center pe-2">
                        <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
                        Investigacion

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

                        <v-divider></v-divider>
                        
                        <v-data-table 
                          v-model:search="search" 
                          :items="items" 
                        
                        >
                        <template v-slot:header.stock>
                            <div class="text-end">Stock</div>
                        </template>

                        <template v-slot:item.image="{ item }">
                            <v-card class="my-2" elevation="2" rounded>
                            <v-img
                                :src="`https://cdn.vuetifyjs.com/docs/images/graphics/gpus/${item.image}`"
                                height="64"
                                cover
                            ></v-img>
                            </v-card>
                        </template>

                        <template v-slot:item.rating="{ item }">
                            <v-rating
                            :model-value="item.rating"
                            color="orange-darken-2"
                            density="compact"
                            size="small"
                            readonly
                            ></v-rating>
                        </template>

                        <template v-slot:item.stock="{ item }">
                            <div class="text-end">
                            <v-chip
                                :color="item.stock ? 'green' : 'red'"
                                :text="item.stock ? 'In stock' : 'Out of stock'"
                                class="text-uppercase"
                                label
                                size="small"
                            ></v-chip>
                            </div>
                        </template>
                        </v-data-table>
                    </v-card>
                </div>
                <br>
               
              <v-data-table :items="info"></v-data-table>

                    <v-combobox
                        label="Combobox"
                        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                        variant="outlined"
                    ></v-combobox>
                  
                </div>
            </div>
        
    </section>
</template>
<style>

nav.v-pagination{
    display: none;
    
}
</style>

