<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  import L from 'leaflet'
  import 'leaflet-canvas-layer'
  import EventBus from './../bus.js'
  const props = ['markers', 'drawing', 'mounting', 'moving', 'unmounting']
  
  export default {
    props: props,
    mounted() {
      let vm = this
      this.mapa = this.drawObject()

      EventBus.$on('mounted', function(mapa) {
        if (vm.$parent._isMounted) { 
          if (mapa._leaflet_id  == vm.$parent.mapa._leaflet_id) {
            vm.mapa.addTo(vm.$parent.mapa)
            EventBus.$emit('mounted', vm.mapa)
            EventBus.$off('mounted')
          }
        }
      })
       
    },
    methods: {
      draw() {
        let vm = this
        vm.mapa.needRedraw()
      },
      addLayer() {
        
      },
      drawObject() {
        let vm = this
        let mapObject = null

      /*  if (vm.custom) {
          let customCanvas = function() {
            this.onLayerDidMount = function() {
              vm.$emit('mounted', this)
            }
            this.onLayerWillUnmount = function() {
              vm.$emit('unmount', this)
            }
            this.onClickLayer  = function(e) {
              vm.$emit('click', e)
            },    

            this.onLayerDidMouse = function(e) {
              vm.$emit('move', e)
            },
            this.setData = function(data) {
              vm.$emit('data', data, this)
            }
            this.onDrawLayer = function(viewInfo) {
              vm.$emit('draw', viewInfo, this)
            }
          } 
          customCanvas.prototype = new L.CanvasLayer()
          mapObject = new customCanvas()   
        } else {
          mapObject =  L.canvasLayer().delegate(vm)
        }*/

        mapObject =  L.canvasLayer().delegate(vm)
        return mapObject 

      },
      onDrawLayer(info) {
        let vm = this
        let map = vm.$parent.mapa
        let ctx = info.canvas.getContext('2d')
        let markers = vm.markers || vm.$children.map(marker => marker.mapa)

        ctx.clearRect(0,0, info.canvas.width, info.canvas.height)
        ctx.fillStyle = "rgba(255, 116, 0, 1)"

        for (let i=0; i<markers.length; i++) {
          let dot = map.latLngToContainerPoint(markers[i]._latlng)           
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, 5, 0, Math.PI * 2)
          ctx.fill()
          ctx.closePath()
        }
        info.layer.fire('zoom')        
        vm.$emit('draw', info)
      },
    }, 
  }
</script>
