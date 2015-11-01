describe("octavation", function() {
  it("when called with , decreases natural by 7 and tone by 12", function() {
    var interpreter = LilyPondInterpreter();
    interpreter.natural = 3;
    interpreter.tone = 5;
    interpreter.octavation(",");
    expect(interpreter.natural).toBe(-4);
    expect(interpreter.tone).toBe(-7);
  });
  
  it("when called with ,, decreases natural by 14 and tone by 24", function() {
    var interpreter = LilyPondInterpreter();
    interpreter.natural = 7;
    interpreter.tone = 12;
    interpreter.octavation(",,");
    expect(interpreter.natural).toBe(-7);
    expect(interpreter.tone).toBe(-12);
  });
  
  it("when called with ' increases natural by 14 and tone by 24", function() {
    var interpreter = LilyPondInterpreter();
    interpreter.natural = -4;
    interpreter.tone = -7;
    interpreter.octavation("'");
    expect(interpreter.natural).toBe(3);
    expect(interpreter.tone).toBe(5);
  });
  
  it("when called with '' increases natural by 14 and tone by 24", function() {
    var interpreter = LilyPondInterpreter();
    interpreter.natural = -7;
    interpreter.tone = -12;
    interpreter.octavation("''");
    expect(interpreter.natural).toBe(7);
    expect(interpreter.tone).toBe(12);
  });
  
  it("does nothing, successfully, when called with an empty string", 
  function() {
    var interpreter = LilyPondInterpreter();
    interpreter.natural = 0;
    interpreter.tone = 0;
    interpreter.octavation("");
    expect(interpreter.natural).toBe(0);
    expect(interpreter.tone).toBe(0);
  });
  
});
