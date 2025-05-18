import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import '@fortawesome/fontawesome-svg-core/styles.css'
import '@fortawesome/fontawesome-free/css/all.css' 


import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'

config.autoAddCss = false
library.add(fas, far, fab)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

ModuleRegistry.registerModules([AllCommunityModule])

app.use(router)

app.mount('#app')
