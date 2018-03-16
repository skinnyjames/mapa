<template>
  <div style="width:100%;height:100%;">
    <button @click="changeNumber">Change</button>
    <v-map :zoom=10 :center="initialLocation" :options="{center: initialLocation, zoom: 10}">
      <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
      <v-canvas  v-if="!clusterOn" ref="canvas">
        <v-marker v-for="(marker, index) in locations" :key="index" :options="{icon: getIcon()}" :lat-lng="marker.latlng"></v-marker>
      </v-canvas>
      <v-markercluster v-if="clusterOn">
        <v-marker v-for="(marker, index) in locations" :key="index" :icon="icon" :options="{icon: icon}" :lat-lng="marker.latlng">
          <v-popup>
            Hello {{index}}
          </v-popup>
        </v-marker>
      </v-markercluster>
    </v-map>
  </div>
</template>

<script>
  import Mapa from '../src/mapa'
  import randomCoordinates from 'random-coordinates' 
  import iconUrl from 'leaflet/dist/images/marker-icon.png'
  import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

  export default {
    components: {
      'v-map': Mapa.Map,
      'v-tilelayer': Mapa.Tile,
      'v-marker': Mapa.Marker,
      'v-canvas': Mapa.Canvas,
      'v-markercluster': Mapa.MarkerCluster,
      'v-popup': Mapa.Popup
    },
    mounted() {
      let vm = this
      console.log('mounted')
      //let canvas = vm.$refs.canvas
      //canvas
    },
    methods: {
      changeNumber() {
        let vm = this
        let canvas = vm.$refs.canvas
        vm.locations = []
        let num = Math.random() * 30000
        for (let i=0;i<num; i++) {
          let [lat,lng] = randomCoordinates().split(',')
          vm.locations.push({ latlng: window.L.latLng(lat, lng) })
        }
        console.log('added locations')
        //canvas.draw()
        
      },
      getIcon() {
        return L.divIcon({html: '<span style="width:10px;height:10px;background-color:#ff0324;"></span>'})
      }
    },
    data() {
      let locations = []
      let i = 5
      let icon = window.L.icon({iconUrl: iconUrl, shadowUrl: shadowUrl})
      while(--i) {
        let [lat,lng] = randomCoordinates().split(',')
        locations.push({ latlng: window.L.latLng(lat, lng) })
      }
    
      return { 
        icon: icon,
        clusterOn: true,
        locations: locations,
        initialLocation: window.L.latLng(-34.9205, -57.953646)
      }
    },
  }
  
</script>

<style module>
  @import "leaflet.markercluster/dist/MarkerCluster.css";
  @import "leaflet.markercluster/dist/MarkerCluster.Default.css";
  html, body {
    height: 100%
  }
</style>
