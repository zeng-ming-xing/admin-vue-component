import { createStore } from 'vuex'

const store = createStore({
  state(){
    return {
      count:2
    }
  },
  getters:{
    countAdd:(state)=>{
       return state.count
    }
  },
  mutations:{
    changeCount(state,num){
      if(num) {
        state.count+=num}
      else{state.count++}
      
    }
  },
  actions:{
    asyncCount({dispatch,commit}){
       commit('changeCount')
       return new Promise((resolve)=>{
        setTimeout(()=>{
          dispatch('asyncFunction')
          resolve()
         },1000)
       }).then(()=>{
         return 111
       })
    },
    asyncFunction({commit}){
      commit('changeCount')
    }
  }
})
export function useStore (app) {
  app.use(store)
}
export default store