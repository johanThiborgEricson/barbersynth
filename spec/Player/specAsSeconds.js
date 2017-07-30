describe("(new Player()).asSeconds(fraction)", function() {
  it("returns fraction times 60/bpm plus referenceTime plus 0.25",
  function() {
    var player = new Player();
    player.bpm = 70;
    player.referenceTime = 0.1234;
    var fraction = new Fraction(5, 11);
    
    var expected = (5/11)*(60/70)+0.1234+0.25;
    var actuall = player.asSeconds(fraction);
    
    expect(actuall).toBe(expected);
  });
});