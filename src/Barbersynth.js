function Barbersynth(voices) {
  var that = Object.create(Barbersynth.prototype);
  
  that.scheduleChordChanges = function() {
    var nextStartTime = that.advanceStartTime();
    that.computeBaseToneAndPartials();
    voices.map(function(voice){
      voice.scheduleToneChange(nextStartTime);
    });
    
  };
  
  that.advanceStartTime = function() {
    
  };
  
  that.computeBaseToneAndPartials = function() {
    
  };
  
  return that;
}
