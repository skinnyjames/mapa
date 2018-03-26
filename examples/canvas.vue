<template>
  <div style="width:100%;height:100%;">
    <div class="loading" v-show="isFetching">
      <h2>Loading...</h2>
    </div>
    <button v-on:click="changeNumber()">Change</button>
    <v-map ref="map" :zoom=10 :center="initialLocation" :options="{center: initialLocation, zoom: 10}">
      <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
      <v-canvas ref="canvas"  :markers="locations"></v-canvas>
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
    },
    mounted() {
      let vm = this
      vm.isFetching = true
      vm.$refs.canvas.draw()
      vm.isFetching = false
    },
    methods: {
      changeNumber() {
        let vm = this
        vm.isFetching = true
        vm.locations = []

        setTimeout(function(){ 
          let num = 50000
          for (let i=0;i<num; i++) {
            let [lat,lng] = randomCoordinates().split(',')
            let marker = window.L.marker([lat, lng])
            vm.locations.push(marker)
          }
          vm.$refs.canvas.draw()
          vm.isFetching = false
        }, 100)
      },
    },
    data() {
      let locations = []
      let i = 5
      let icon = window.L.icon({iconUrl: iconUrl, shadowUrl: shadowUrl})
      while(--i) {
        let [lat,lng] = randomCoordinates().split(',')
        let marker = window.L.marker([lat, lng], {icon: icon})
        locations.push(marker)
      }
    
      return { 
        geojson: null,
        icon: icon,
        isFetching: true,
        locations: locations,
        initialLocation: window.L.latLng(-34.9205, -57.953646)
      }
    },
  }
  
</script>

<style>
  html, body {
    height: 100%
  }
  div.loading {
    z-index:999999999999999;
    width:100vw;
    height:100vh;
    top:30px;
    left:0;
    right:0;
    bottom:0;
    position:absolute;
    background-color:rgba(0,0,0,.9);
    color:white;
    display:flex;align-items:center;
    justify-content:center;
  }
</style>
