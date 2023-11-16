import axios from 'axios'
import { defineStore } from 'pinia'
import router from '../router/index'
import Swal from 'sweetalert2'

export const MedicionCrud = defineStore('m', {

  state: () => ({ 

    respuesta:null,
    productosAll:null,
    medicionEdit:null

  }),
  actions:{
      // CREAR USUARIO
      async medicionCreate(jsonM){
          await axios.post(`http://localhost:3001/api/v1/medicionDiaria`, jsonM).then( 
            (res) => {
                
              if(res.data.status === 'ok'){

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
                      
                      router.push('/mediciones');

                    }
                  })

              }

          }).catch(

            (errors)=>{
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error!',
                background: '#3A3B3C',
                color: '#fff'
              })
            }
          )
     },

      // EDITAR
      async medicionEditar(id, jsonE){

          await axios.put(`http://localhost:3001/api/v1/medicionUpdate/${id.value}`, jsonE).then( 
          (res) => {
  
            if(res.data.status === 'ok'){

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
                    router.push('/mediciones');

                  }
                })

            }

        }).catch(

          (errors)=>{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error!',
              background: '#3A3B3C',
              color: '#fff'
            })
          }
        )
    }
  },

  // AYUDA A QUE LA SESSION NO SE PIERDA CUANDO SE REFRESQUE LA PAGINA 
  persist:true

})
