function SongSelectorElement() {
  var that = document.createElement("INPUT");
  
  that.eventListener = SongSelectorElement.EventListener.apply(null, arguments);
  that.addEventListener("click", that.eventListener);
  
  return that;
}

SongSelectorElement.EventListener = function() {
  var that = Object.create(SongSelectorElement.EventListener.prototype);
  
  return that;
};

SongSelectorElement.EventListener.prototype
.handleEvent = function() {
  
};
