<template>
  <div>
    <button @click="changeRouter">
          点我
    </button>
  </div>
</template>

<script>
import  router  from '@/router'

export default {
  name:'Demo1',
  setup(){
    const changeRouter = ()=>{
       router.push({name:'Demo2'})
    }
    return {
      changeRouter
    }
  }
}
</script>

<style>

</style>