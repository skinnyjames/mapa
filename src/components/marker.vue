<template>
  <div style="display: none;">
    <slot></slot>
  </div>
</template>

<script>
  import EventBus from './../bus'
  import eventsBinder from '../util/eventsBinder'

  const events = [
    'click',
    'dblclick',
    'mousedown',
    'mouseover',
    'mouseout',
    'contextmenu',
    'dragstart',
    'drag',
    'dragend',
    'move',
    'add',
    'remove',
    'popupopen',
    'popupclose',
    'tooltipopen',
    'tooltipclose'
  ]

  const props = {
    draggable: {
      type: Boolean,
      custom: true,
      default: false,
    },
    visible: {
      type: Boolean,
      custom: true,
      default: true,
    },
    latLng: {
      type: [Object, Array]
    },
    icon: {
      custom: false,
      default: () => new L.Icon.Default(),
    },
    zIndexOffset: {
      type: Number,
      custom: false,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  };
  
  export default {
    props: props,
    mounted() {
      let vm = this

      const options = vm.options
      if (vm.icon) {
        options.icon = vm.icon
      }
      
      if (vm.draggable) {
        options.draggable = vm.draggable  
      }
      
      vm.mapa = L.marker(this.latLng, vm.options)
      eventsBinder(vm, vm.mapa, events)
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
    add(mapa) {
      let vm = this
      vm.mapa.addTo(mapa)
    },
    beforeDestroy() {
      let vm = this
      vm.$parent.mapa.removeLayer(vm.mapa)
    }
  }
</script>
