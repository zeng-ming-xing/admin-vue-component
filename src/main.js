import { createApp } from 'vue'
import App from './App.vue'
import  { useRouter }  from './router'
import { useStore } from './store'
import { useElement } from './components/element'


const app = createApp(App)
useElement(app)
useRouter(app)
useStore(app)
app.mount('#app')

