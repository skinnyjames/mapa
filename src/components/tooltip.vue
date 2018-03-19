<template>
  <div>
    <slot name="tooltip"></slot>
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
    bare: {
      type: Boolean,
      custom: true,
      default: false,
    },
    content: {
      default: '',
    },
    options: {
      type: Object,
      default: () => ({}),
    }
  }

  export default {
    props: props,
    mounted() {
      let vm = this
      vm.mapa = L.tooltip(vm.options)
      eventsBinder(vm, vm.mapa, events)

      EventBus.$on('mounted', function(mapa) {
        if (vm.$parent._isMounted) { 
          if (mapa._leaflet_id  == vm.$parent.mapa._leaflet_id) {
            if(!vm.bare) {
              console.log('tooltip not bare')
              vm.add(vm.$parent.mapa)
            }
            EventBus.$emit('mounted', vm.mapa)
          }
        }
      })
    },
    beforeDestroy() {
      let vm = this
      if (vm.$parent.mapa.getTooltip()) {
        vm.$parent.mapa.unbindTooltip()
      }
    },
    methods: {
      add(mapa, mapaVm) {
        let vm = this
        vm.mapa.setContent(vm.content || vm.$el)
        mapa.bindTooltip(vm.mapa)
      }
    }
  }
  
</script>
