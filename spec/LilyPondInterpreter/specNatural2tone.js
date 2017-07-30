describe("(new LilyPondInterpreter()).natural2tone", function() {
  
  var interpreter = new LilyPondInterpreter();
  
  it("when called with numbers 0 to 6, returns the tone numbers for the " + 
  "seven tones of the A minor scale above concert pitch A", function() {
    var naturals = [0, 1, 2, 3, 4, 5, 6];
    var expecteds = [0, 2, 3, 5, 7, 8, 10];
    var actualls = naturals.map(function(natural) {
      return interpreter.natural2tone(natural);
    });
    
    expect(actualls).toEqual(expecteds);
  });
  
  it("when called with a number > 6, returns tones from a higher octave", 
  function() {
    expect(interpreter.natural2tone(8)).toBe(14);
  });
  
  it("when called with a number < 0, returns tones from a lower octave", 
  function() {
    expect(interpreter.natural2tone(-1)).toBe(-2);
  });
  
});
