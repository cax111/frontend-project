<template>
  <div>
  </div>
</template>
<script>
export default {
  mounted(){
    this.$store.dispatch('logoutAuth')
    .then(response => {
      window.location.href = "/login"
      return response
    })
    .catch(error => {
      return error
    })
  }
}
</script>
