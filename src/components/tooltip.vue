<template>
  <div v-pre>
    <slot></slot>
  </div>
</template>


<script>
  import EventBus from './../bus'
  import eventsBinder from '../util/eventsBinder'
  import Vue from 'vue'

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

      //vm.mapaTemplate = Vue.compile(vm.$el.outerHTML)

      //console.log(vm.mapaTemplate)

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
      vm.mapaTemplate.cleanup()
    },
    methods: {
      add(mapa, mapaVm) {
        let vm = this
        let data = vm.$el 
        
        //let c = Vue.component('mc-tooltip', {functional: true, render: vm.mapaTemplate.render, props: { hello: 'world'}})
        
        //console.log('vue', c)
        /*a = vm.mapaTemplate.render(function(createElement, context) {
          console.log(createElement, context)
        }).bind(mapaVm)
        */

        vm.mapa.setContent(vm.content || vm.$el)
        mapa.bindTooltip(vm.mapa)
      }
    }
  }
  
</script>
