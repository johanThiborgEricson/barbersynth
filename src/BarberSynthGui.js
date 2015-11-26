function BarberSynthGui() {
  var that = Object.create(BarberSynthGui.prototype);
  
  return that;
}

BarberSynthGui.prototype.methodStorage = {};

BarberSynthGui.prototype
.createBarberSynthElement = function(songs) {
  var that = document.createElement("DIV");
  
  return that;
};

BarberSynthGui.prototype.methodStorage
.handleSongSelection = function() {
  var lilyPondsForm = this._lilyPondsForm;
  while(lilyPondsForm.firstChild) {
    lilyPondsForm.removeChild(lilyPondsForm.firstChild);
  }
  
  this._lilyPondFields.map(function(lilyPondField) {
    lilyPondsForm.appendChild(lilyPondField);
  });
  
};

BarberSynthGui.prototype
.createSongSelectorElement = function(lilyPonds, lilyPondsForm) {
  var that = document.createElement("INPUT");
  
  that._lilyPondsForm = lilyPondsForm;
  that.onclick = this.methodStorage.handleSongSelection;
  that._lilyPondFields = lilyPonds.map(function(lilyPond) {
    var lilyPondField = document.createElement("INPUT");
    lilyPondField.value = lilyPond;
    return lilyPondField;
  });
  
  return that;
};
