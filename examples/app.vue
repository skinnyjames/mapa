<template>
  <div style="width:100%;height:100%;">
    <button @click="changeNumber">Change</button>
    <v-map :zoom=10 :center="initialLocation" :options="{center: initialLocation, zoom: 10}">
      <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
      <v-geojson :geojson="geojson"></v-geojson>
      <v-canvas  v-if="!clusterOn" ref="canvas" :drawing="onDraw" :locations="locations"></v-canvas>
      <v-markercluster v-if="clusterOn" ref="cluster" :locations="locations" :bare="true" :options="{chunkedLoading: true, maxClusterRadius: 200}">
        <v-tooltip :bare="true">Hello</v-tooltip>
      </v-markercluster>
    </v-map>
  </div>
</template>

<script>
  import Mapa from '../src/mapa'
  import randomCoordinates from 'random-coordinates' 
  import iconUrl from 'leaflet/dist/images/marker-icon.png'
  import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
  import _ from 'underscore'

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
      console.log('mounted')
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
        let num = 100000
        for (let i=0;i<num; i++) {
          let [lat,lng] = randomCoordinates().split(',')
          vm.locations.push(window.L.marker([lat, lng], {icon: vm.icon}))
        }
        console.log('added locations')
        cluster.add(vm.locations)
        //canvas.draw()
        
      },
      getIcon() {
        return L.divIcon({html: '<span style="width:10px;height:10px;background-color:#ff0324;"></span>'})
      },
      onDraw(info, map, ctx, markers) {
        ctx.clearRect(0,0, info.canvas.width, info.canvas.height)
        ctx.fillStyle = "rgba(0, 0, 0, 1)"
        
        let bounds = map.getBounds()
        
        markers = _.filter(markers, function(marker) {
          return bounds.contains(marker._latlng)
        })
        console.log('filtered locations')

        for (let i=0; i<markers.length; i++) {
          let dot = map.latLngToContainerPoint(markers[i]._latlng)
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, 5, 0, Math.PI * 2)
          ctx.fill()
          ctx.closePath()
        }
      },
    },
    data() {
      let locations = []
      let i = 5
      let icon = window.L.icon({iconUrl: iconUrl, shadowUrl: shadowUrl})
      while(--i) {
        let [lat,lng] = randomCoordinates().split(',')
        locations.push(window.L.marker([lat, lng], {icon: icon}))
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
