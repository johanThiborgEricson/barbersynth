function Barbersynth(voices) {
  var that = Object.create(Barbersynth.prototype);
  
  that.scheduleChordChanges = function() {
    var nextStartTime;
    
    // This is really ugly, but my IDE doesn't like functions beeing created 
    // in loops...
    var scheduleToneChange = function(voice){
       voice.scheduleToneChange(nextStartTime);
    };
    
    // This is just a for...of loop, but IE doesn't seem to support that just
    // yet, so I leave it like this for now.
    while(!(nextStartTime = that.advanceTone()).done) {
      nextStartTime = nextStartTime.value;
      that.computeBaseToneAndPartials();
      voices.map(scheduleToneChange);
    }
    
  };
  
  that.advanceTone = function() {
    
  };
  
  that.computeBaseToneAndPartials = function() {
    
  };
  
  return that;
}
