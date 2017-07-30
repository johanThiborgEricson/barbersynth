function Gui() {
  this.player = new Player(new AudioContext());
  var that = this;
  this.element = document.createElement("form");
  this.addVoiceButton = {element: document.createElement("input")};
  this.addVoiceButton.element.type = "button";
  this.addVoiceButton.element.value = "Add voice";
  this.addVoiceButton.element.onclick = function() {
    that.addVoiceInput(that.VoiceInput());
  };
  
  this.playJust = document.createElement("input");
  this.playJust.type = "button";
  this.playJust.value = "Play just";
  this.playJust.onclick = function() {
    var lilyPondStrings = that.voiceInputs.map(function(voiceInput) {
      return voiceInput.element.value;
    });
    
    barbersynth(lilyPondStrings, that.player);
  };
  
  this.element.appendChild(this.playJust);
  this.element.appendChild(document.createElement("br"));
  
  this.element.appendChild(this.addVoiceButton.element);
  this.voiceInputs = [];
  this.addVoiceInput(this.VoiceInput());
}

Gui.prototype
.appendGui = function() {
  document.body.appendChild(this.element);
};

Gui.prototype
.addVoiceInput = function(voiceInput) {
  this.voiceInputs.push(voiceInput);
  this.element.insertBefore(voiceInput.element, this.addVoiceButton.element);
  this.element.insertBefore(document.createElement("br"), this.addVoiceButton.element);
};

Gui.prototype
.VoiceInput = function() {
  var that = Object.create(Gui.prototype.VoiceInput.prototype);
  that.element = document.createElement("input");
  that.element.type = "text";
  return that;
};