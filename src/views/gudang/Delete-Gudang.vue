<template>
  <div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  mounted(){
    axios.defaults.headers = {
      'Authorization': window.localStorage.getItem('access_token')
    }
    axios.delete('/gudang/'+this.$route.params.id)
    .then(response => {
        console.log(JSON.stringify(response.data))
        this.$router.back()
    })
    .catch(error =>{
        this.$router.back()
        console.log(error.response)
    })
  }
}
</script>
