<template>
  <div class="mapa">
    <slot></slot>
  </div>
</template>

<script>
  import L from 'leaflet'
  import EventBus from './../bus'
  import eventsBinder from '../util/eventsBinder.js'

  const events = [
    'click',
    'dblclick',
    'mousedown',
    'mouseup',
    'mouseover',
    'mouseout',
    'mousemove',
    'contextmenu',
    'focus',
    'blur',
    'preclick',
    'load',
    'unload',
    'viewreset',
    'movestart',
    'move',
    'moveend',
    'dragstart',
    'drag',
    'dragend',
    'zoom',
    'zoomstart',
    'zoomend',
    'zoomanim',
    'zoomlevelschange',
    'resize',
    'autopanstart',
    'layeradd',
    'layerremove',
    'baselayerchange',
    'overlayadd',
    'overlayremove',
    'locationfound',
    'locationerror',
    'popupopen',
    'popupclose'
  ];

  const props = {
    center: {
      type: [Object, Array],
      custom: true,
      default: undefined,
    },
    bounds: {
      custom: true,
      default: undefined,
    },
    maxBounds: {
      default: undefined,
    },
    zoom: {
      type: Number,
      default: undefined,
    },
    minZoom: {
      type: Number,
      default: undefined,
    },
    maxZoom: {
      type: Number,
      default: undefined,
    },
    paddingBottomRight: {
      custom: true,
      default: null,
    },
    paddingTopLeft: {
      custom: true,
      default: null
    },
    padding: {
      custom: true,
      default: null
    },
    worldCopyJump: {
      type: Boolean,
      default: false
    },
    crs: {
      custom: true,
      default: () => L.CRS.EPSG3857,
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

      Object.assign(options, {
        minZoom:       vm.minZoom,
        maxZoom:       vm.maxZoom,
        maxBounds:     vm.maxBounds,
        worldCopyJump: vm.worldCopyJump,
        crs:           vm.crs
      })

      if (vm.center != null) {
        options.center = vm.center
      }
    
      if (vm.zoom != null) {
        options.zoom = vm.zoom
      }
      
      vm.mapa = L.map(vm.$el, options)
      eventsBinder(vm, vm.mapa, events)
      EventBus.$emit('mounted', vm.mapa)
    },
  }
</script>

<style>
  .mapa {
    height: 100%;
    width: 100%;
  }
</style>
