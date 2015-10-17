function Barbersynth() {
  return {
    scheduleToneChange(simultaneousTones) {
      var tones = simultaneousTones.tones;
      var duration = simultaneousTones.duration;
      var baseToneAndPartials = this.computeBaseToneAndPartials(tones);
      var partials = baseToneAndPartials.partials;
      this.normalizePartials(partials);
      this.computeStartTime(duration);
    },
    
  };
  
}
