describe("(new Player()).panic()", function() {
  it("stops the first oscillator", function() {
    var audioCtx = new AudioContext();
    var player = new Player(audioCtx, 440);
    
    player.setFrequencies(0, [1], 0);
    expect(function() {
      player.panic();
    }).not.toThrow();
    
    audioCtx.close();
    
    // expect(player.oscillators[0]); 
    // Can't find a way to determine if the oscillator is stoped
  });
});