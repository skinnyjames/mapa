<template>
  <div class="mapa">
    <slot></slot>
  </div>
</template>

<script>
  import L from 'leaflet'
  import EventBus from './../bus'

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
      vm.mapa = L.map(vm.$el, this.options)
      EventBus.$emit('mounted', vm.mapa)
    }
  }
</script>

<style>
  .mapa {
    height: 100%;
    width: 100%;
  }
</style>
