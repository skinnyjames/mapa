<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import L from 'leaflet'
import EventBus from './../bus'
import 'leaflet.markercluster'
import Vue from 'vue'

export default {
  props: [
    'bare'
    'markers',
    'options',
  ],
  mounted () {
    let vm = this
    this.mapa = L.markerClusterGroup(this.options)

    EventBus.$on('mounted', function(mapa) {
      if (vm.$parent._isMounted) { 
        if (mapa._leaflet_id  == vm.$parent.mapa._leaflet_id) {
          vm.add(vm.markers)
          vm.mapa.addTo(vm.$parent.mapa)
          EventBus.$emit('mounted', vm.mapa)
        }
      }
    })
  },
  beforeDestroy () {
    this.remove()
  },
  updated() {
    let vm = this
    //vm.add()
  },
  methods: {
    remove () {
      let vm = this
      let parent = vm.$parent.mapa

      vm.mapa.clearLayers()
      parent.removeLayer(vm.mapa)
    },
    add (markers) {
      let vm = this

      vm.mapa.clearLayers() 

      let bounds = vm.$parent.mapa.getBounds()
      vm.mapa.addLayers(markers)

      // Popups or tooltips
      /*for (let m = markers.length; m--;) {
        vm.$children[0].add(markers[m], {hello: "world" + m})    
      } */

    },
  }
}
</script>
