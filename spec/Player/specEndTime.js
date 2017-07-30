describe("(new Player()).endTime(time)", function() {
  it("calls stop(time) on each oscillator in this.oscillators", function() {
    var audioCtx = new AudioContext();
    var player = new Player(audioCtx);
    var f = function() {
      var oscillator = audioCtx.createOscillator();
      spyOn(oscillator, "stop");
      return oscillator;
    };
    player.oscillators = [f(), f(), f(), f()];
    
    player.endTime("end time");
    
    player.oscillators.map(function(oscillator) {
      expect(oscillator.stop).toHaveBeenCalledWith("end time");
    });
    
    audioCtx.close();
  });
});