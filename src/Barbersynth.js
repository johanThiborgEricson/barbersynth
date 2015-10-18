function Barbersynth() {
  return {
    scheduleToneChange(simultaneousTones) {
      var tones = simultaneousTones.tones;
      var noteTime = simultaneousTones.noteTime;
      var baseToneAndPartials = this.computeBaseToneAndPartials(tones);
      var partials = baseToneAndPartials.partials;
      this.computeA440Frequencies(partials);
      this.computeStartTime(noteTime);
    },
    
  };
  
}
