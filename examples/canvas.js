import Vue from 'vue/dist/vue.common.js'
import App from './canvas.vue'
import 'leaflet/dist/leaflet.css'
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

new Vue({
  el: '#app',
  components: { App },
  render: h => h(App)
})
