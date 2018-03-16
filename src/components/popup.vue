<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  import EventBus from './../bus'
  import eventsBinder from '../util/eventsBinder'

  const events = [
    'add',
    'remove',
    'popupopen',
    'popupclose',
    'tooltipopen',
    'tooltipclose'
  ]

  const props = {
    content: {
      default: '',
    },
    latLng: {
      type: [Object, Array]
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  }

  export default {
    props: props,
    mounted() {
      let vm = this
      vm.mapa = L.popup(vm.options)
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
    beforeDestroy() {
      let vm = this
      if (vm.$parent.getPopup && vm.$parent.getPopup()) {
        vm.$parent.unbindPopup()
      }
    },
    methods: {
      add(mapa) {
        let vm = this
        vm.mapa.setContent(this.content || this.$el)
        vm.$parent.mapa.bindPopup(vm.mapa)
      } 
    }
  }

</script>

