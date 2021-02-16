import Vue from 'vue'
import App from './App.vue'

import { Form, Input, FormModel, Icon, Button } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.use(Form)
Vue.use(Input)
Vue.config.productionTip = false
Vue.use(FormModel);
Vue.use(Icon);
Vue.use(Button);

new Vue({
  render: (h) => h(App)
}).$mount('#app')
