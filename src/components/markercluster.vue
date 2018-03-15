<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import L from 'leaflet'
import EventBus from './../bus'
import 'leaflet.markercluster'

export default {
  props: [
    'options',
    'bulk'
  ],
  mounted () {
    let vm = this
    this.mapa = L.markerClusterGroup(this.options)

    EventBus.$on('mounted', function(mapa) {
      if (vm.$parent._isMounted) { 
        if (mapa._leaflet_id  == vm.$parent.mapa._leaflet_id) {
          vm.add()
          vm.mapa.addTo(vm.$parent.mapa)
          EventBus.$emit('mounted', vm.mapa)
          EventBus.$off('mounted')
        }
      }
    })
  },
  beforeDestroy () {
    this.remove()
  },
  updated() {
    let vm = this
    vm.add()
  },
  methods: {
    remove () {
      let vm = this
      let parent = vm.$parent.mapa

      vm.mapa.clearLayers()
      parent.removeLayer(vm.mapa)
    },
    add () {
      this.mapa.clearLayers() 
      let markers = this.$children.map(marker => marker.mapa)
      this.mapa.addLayers(markers)
    },
  }
}
</script>
