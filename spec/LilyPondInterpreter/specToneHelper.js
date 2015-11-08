describe("ToneHelper(natural, accidentals, octavation)", function() {
  
  var interpreter;

  beforeEach(function() {
    interpreter = LilyPondInterpreter();
    interpreter.natural2tone = function() {
      return 0;
    };
    
  });
  
  it("calls natural2tone with natural", function() {
    spyOn(interpreter, "natural2tone");
    interpreter.toneHelper("natural");
    expect(interpreter.natural2tone).toHaveBeenCalledWith("natural");
  });
  
  it("returns the result of natural2tone, if accidentals and octavation " +
  "are zero", function() {
    interpreter.natural2tone = function() {
      return -12;
    };
    
    expect(interpreter.toneHelper("natural", 0, 0)).toBe(-12);
  });
  
  it("adds accidentals to the result", function() {
    expect(interpreter.toneHelper("natural", 1, 0)).toBe(1);
  });
  
  it("adds 12 times octavation to the result", function() {
    expect(interpreter.toneHelper("natural", 0, 1)).toBe(12);
  });
  
  it("adds 7 times octavation to natural and stores it in lastNatural", 
  function() {
    interpreter.toneHelper(-1, 0, 1);
    expect(interpreter.lastNatural).toBe(6);
  });
  
});
