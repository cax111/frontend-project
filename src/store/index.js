import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

axios.defaults.baseURL = 'https://k2.asiatech.dev/v1';
axios.defaults.headers = {
  'Authorization': window.localStorage.getItem('access_token')
};
export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null, //get token,
    idUser : localStorage.getItem('getIdUser') || null,
    role : localStorage.getItem('role') || null,
    last_login : localStorage.getItem('last_login') || null,
  },
  mutations: {
      retrieveToken(state, token){
        state.token = token
      },
      retrieveDataUser(state,dataUser){
        state.dataUser = dataUser
      },
      retrieveRole(state,role){
        state.role = role
      },
      retrieveLastLogin(state,lastLogin){
        state.last_login = lastLogin
      },
      destroyToken(state){
        state.token = null
      },
      destroyDataUser(state){
        state.dataUser = null
      },
      destroyRole(state){
        state.role = null
      },
      destroyLastLogin(state){
        state.last_login = null
      },
  },
  actions: {
    //login function
    loginAuth(context, credentials){
      return new Promise((resolve, reject) => {
        axios.post('/login',{
          email: credentials.email,
          password: credentials.password,
        })
        .then(response => {
          const token    = response.data.token
          const dataUser   = response.data.id
          //====================================================== get last_login ==========================================================
          if(token === response.data.token){
            axios.defaults.headers = {
              'Authorization': token
            }
            axios.get('/users/'+dataUser)
            .then(response => {
                console.log(response.data)
                this.dataUser = response.data
                localStorage.setItem('role', response.data.role)
                context.commit('retrieveRole', response.data.role)

                localStorage.setItem('last_login', response.data.last_login)
                context.commit('retrieveLastLogin', response.data.last_login)

                localStorage.setItem('access_token', token)
                context.commit('retrieveToken', token)

                localStorage.setItem('getIdUser', dataUser)
                context.commit('retrieveDataUser', dataUser)

                window.location.href = "/"
            })
            .catch(error =>{
                console.log(error.response)
            })
          }
          //====================================================== end get last_login ==========================================================
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    logoutAuth(context){
            localStorage.removeItem('access_token')
            localStorage.removeItem('getIdUser')
            localStorage.removeItem('role')
            localStorage.removeItem('last_login')
            context.commit('destroyToken')
            context.commit('destroyDataUser')
            context.commit('destroyRole')
            context.commit('destroyLastLogin')
      }
  },
  modules: {}
});
