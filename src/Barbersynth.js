function Barbersynth(voices) {
  var that = Object.create(Barbersynth.prototype);
  
  that.scheduleChordChanges = function() {
    var nextStartTime;
    var scheduleToneChange = function(voice){
       voice.scheduleToneChange(nextStartTime);
    };
    
    while(!(nextStartTime = that.advanceStartTime()).done) {
      nextStartTime = nextStartTime.value;
      that.computeBaseToneAndPartials();
      voices.map(scheduleToneChange);
    }
    
  };
  
  that.advanceStartTime = function() {
    
  };
  
  that.computeBaseToneAndPartials = function() {
    
  };
  
  return that;
}
