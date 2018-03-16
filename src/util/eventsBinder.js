export default (vueElement, leaflet, events) => {

  for (var i = events.length; i--;) {
    bindEvent(events[i])    
  }

  function bindEvent(eventName) {
    let exposed = 'l-' + eventName
    leaflet.on(eventName, (ev) => {
      vueElement.$emit(exposed, ev)
    })
  }
}
