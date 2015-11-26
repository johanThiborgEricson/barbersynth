function BarberSynthGui() {
  var that = Object.create(BarberSynthGui.prototype);
  
  return that;
}

BarberSynthGui.prototype.methodStorage = {};

BarberSynthGui.prototype
.createMainElement = function(songs) {
  var elem = document.createElement("DIV");
  
  var lilyPondsForm = this.createLilyPondsForm();
  var songSelectionForm = this.createSongSelectionForm(songs, lilyPondsForm);
  elem.appendChild(songSelectionForm);
  elem.appendChild(lilyPondsForm);
  
  return elem;
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
.createSongSelectionElement = function(lilyPonds, lilyPondsForm) {
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

BarberSynthGui.prototype
.createSongSelectionForm = function() {
  var elem = document.createElement("FORM");
  
  return elem;
};

BarberSynthGui.prototype
.createLilyPondsForm = function() {
  var elem = document.createElement("FORM");
  
  return elem;
};
