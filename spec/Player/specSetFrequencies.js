describe("(new Player()).setFrequencies(frequencies, time)", function() {
  it("plays tones", function(done) {
    var audioCtx = new OfflineAudioContext(1, 100, 44100);
    var concertPitch = 441;
    var player = new Player(audioCtx, concertPitch);
    
    var baseTone = 0;
    var partials = [1];
    player.setFrequencies(baseTone, partials, 0);
    player.audioCtx.startRendering().then(function(buffer) {
      var pcm = buffer.getChannelData(0);
      expect(pcm[25]).not.toBe(0);
      done();
    });
  });
  
  it("sets the frequency of the first oscillator", function(done){
    var audioCtx = new AudioContext();
    var player = new Player(audioCtx, 440);
    
    var baseTone = 12;
    var partials = [1];
    var time = 0;
    player.setFrequencies(baseTone, partials, time);
    
    setTimeout(function() {
      expect(player.oscillators[0].frequency.value).toBe(880);
      player.panic();
      done();
    }, 100);
    audioCtx.close();
  });
});