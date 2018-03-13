<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  import EventBus from './../bus'

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
      vm.mapa = L.marker(this.latLng, vm.options)

      EventBus.$on('mounted', function(mapa) {
        if (vm.$parent._isMounted) { 
          if (mapa._leaflet_id  == vm.$parent.mapa._leaflet_id) {
            vm.mapa.addTo(vm.$parent.mapa)
            EventBus.$emit('mounted', vm.mapa)
            EventBus.$off('mounted')
          }
        }
      })
    }
  }
</script>
