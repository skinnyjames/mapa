<template></template>

<script>
  import EventBus from './../bus'

  export default {
    props: ['geojson', 'options'],
    mounted() {
      let vm = this
      vm.mapa = L.geoJSON(vm.geojson, vm.options)

      EventBus.$on('mounted', add)

      function add(mapa) {
        if (vm.$parent._isMounted) { 
          if (mapa._leaflet_id  == vm.$parent.mapa._leaflet_id) {
            vm.add(vm.$parent.mapa)
            EventBus.$emit('mounted', vm.mapa)
          }
        }
      }
    },
    watch: {
      geojson: {
        handler(geojson) {
          let vm = this
          vm.mapa.clearLayers()
          vm.mapa.addData(geojson)
        },
        deep: true,
      }
    },
    methods: {
      add(mapa) {
        let vm = this
        vm.mapa.addTo(mapa)
      }
    }
  }
</script>
