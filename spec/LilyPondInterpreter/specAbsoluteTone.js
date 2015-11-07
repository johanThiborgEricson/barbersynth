describe("AbsoluteTone", function() {
  
  var interpreter;
  var mf = Interpreter.MethodFactory();

  // TODO: wait for legacy IE to start supporting arrow functions...
  var justReturn = function(value){
    return function() {
      return value;
    };
  };
  
  var returnsZero = mf.terminalEmptyString(function() {
    return 0;
  });
  
  beforeEach(function() {
    interpreter = LilyPondInterpreter();
    interpreter.absoluteNatural = mf.terminalEmptyString(function() {});
    interpreter.natural2tone = function() {
      return 0;
    };
    
    interpreter.accidentals = returnsZero;
    interpreter.octavation = returnsZero;
  });
  
  it("calls natural2tone with the result of absoluteNatural", function() {
    spyOn(interpreter, "natural2tone");
    interpreter.absoluteNatural = mf
    .terminalEmptyString(justReturn("absolute natural"));
    interpreter.absoluteTone("");
    expect(interpreter.natural2tone).toHaveBeenCalledWith("absolute natural");
  });
  
  it("calls the Tone-constructor with the result of natural2tone, if " +
  "accidentals and octavation returnes zero", function() {
    interpreter.natural2tone = justReturn(-12);
    expect(interpreter.absoluteTone("")).toBe(-12);
  });
  
  it("adds accidentals to tone", function() {
    interpreter.accidentals = mf.terminalEmptyString(justReturn(1));
    expect(interpreter.absoluteTone("")).toBe(1);
  });
  
  it("adds 12 times octavation to tone", function() {
    interpreter.octavation = mf.terminalEmptyString(justReturn(1)); 
    expect(interpreter.absoluteTone("")).toBe(12);
  });
  
  it("adds 7 times octavation to absoluteNatural and stores it in lastNatural", 
  function() {
    interpreter.absoluteNatural = mf.terminalEmptyString(justReturn(-1));
    interpreter.octavation = mf.terminalEmptyString(justReturn(1)); 
    interpreter.absoluteTone("");
    expect(interpreter.lastNatural).toBe(6);
  });
  
});
