describe("(new Player(audioCtx)).setReferenceTime()", function(){
  it("sets referenceTime to audioCtx.currentTime", function(done) {
    var audioCtx = new AudioContext();
    audioCtx.suspend().then(function() {
      var player = new Player(audioCtx);
      
      player.setReferenceTime();
      
      expect(player.referenceTime).toBe(audioCtx.currentTime);
      audioCtx.close();
      done();
    });
    
  });
});