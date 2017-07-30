describe("new Player(audioCtx)", function() {
  it("defaults bpm to 60 and concertPitch to 440 Hz", function() {
    var player = new Player();
    
    expect(player.bpm).toBe(60);
    expect(player.concertPitch).toBe(440);
  });
});