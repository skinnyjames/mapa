# mapa

### a clone of [Vue2Leaflet](https://github.com/KoRiGaN/Vue2Leaflet), but a little different

This library is heavily inspired by the great work of KoRiGaN, but changes mounting functionality and supports programmatic 
manipulation of the map object (mapa) via use of the `bare` property
This privleges plugin developers and library users that need good performance without the costly overhead of rendering DOM elements
This library is not quite ready for production, but feel free to clone and test it out 

## usage

### markup

``` 
<v-map ref="map" :zoom=10 :center="initialLocation" :options="{center: initialLocation, zoom: 10}">
  <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
  <v-markercluster ref="cluster" v-if="clusterOn" :bare="true" :options="{chunkedLoading: true, maxClusterRadius: 200}"></v-markercluster>
</v-map>

```
### javascript 

```
import Mapa from 'mapa'

// random coordinates example
import randomCoordinates from 'random-coordinates'

Vue.component('v-map', Mapa.Map);
Vue.component('v-tilelayer', Mapa.Tile);
Vue.component('v-marker', Mapa.MarkerCluster);

new Vue({
  el: '#app',
  data() {
    let locations = []
    for (let i = 100000; i--;) {
      let [lat,lng] = randomCoordinates().split(',')
      let marker = window.L.marker([lat, lng])
      marker.bindTooltip("Hello " + i)
      locations.push(marker)
    }
    return {
      locations: locations
    }
  }
  mounted() {
    vm.$refs.cluster.add(vm.$refs.map.mapa)
    vm.$refs.cluster.update(vm.locations)
  },
})

```





