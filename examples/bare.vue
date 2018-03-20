<template>
  <div style="width:100%;height:100%;">
    <button @click="changeNumber">Change</button>
    <v-map ref="map" :zoom=10 :center="initialLocation" :options="{center: initialLocation, zoom: 10}">
      <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
      <v-geojson :geojson="geojson"></v-geojson>
      <v-canvas  v-if="!clusterOn" ref="canvas"></v-canvas>
      <v-markercluster ref="cluster" v-if="clusterOn" :bare="true" :options="{chunkedLoading: true, maxClusterRadius: 200}"></v-markercluster>
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
      'v-popup': Mapa.Popup,
      'v-tooltip': Mapa.Tooltip,
      'v-geojson': Mapa.GeoJSON
    },
    mounted() {
      let vm = this
      vm.$refs.cluster.add(vm.$refs.map.mapa)
      vm.$refs.cluster.update(vm.locations)

      window.fetch('https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson')
      .then((response) => { return response.json() })
      .then((json) => { vm.geojson = json })
    },
    methods: {
      changeNumber() {
        let vm = this
        let canvas = vm.$refs.canvas
        let cluster = vm.$refs.cluster

        vm.locations = []
        //let num = Math.random() * 10000
        let num = 50000
        for (let i=0;i<num; i++) {
          let [lat,lng] = randomCoordinates().split(',')
          let marker = window.L.marker([lat, lng], {icon: vm.icon})
          marker.bindTooltip("Hello " + i)  
          vm.locations.push(marker)
        }
        cluster.update(vm.locations)
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
        let marker = window.L.marker([lat, lng], {icon: icon})
        marker.bindTooltip("Hello " + i)  
        locations.push(marker)
      }
    
      return { 
        geojson: null,
        icon: icon,
        clusterOn: true,
        locations: locations,
        initialLocation: window.L.latLng(-34.9205, -57.953646)
      }
    },
  }
  
</script>

<style module>
  html, body {
    height: 100%
  }
</style>
