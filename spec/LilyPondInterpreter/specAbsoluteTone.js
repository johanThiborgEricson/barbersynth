describe("AbsoluteTone", function() {
  
  var interpreter;
  var mf = Interpreter.MethodFactory();

  // TODO: wait for legacy IE to start supporting arrow functions...
  var justReturn = function(value){
    return function() {
      return value;
    };
  };
  
  beforeEach(function() {
    interpreter = LilyPondInterpreter();
  });
  
  it("calls toneHelper with absoluteNatural, accidentals and octavation and " +
  "returns the result", function() {
    interpreter.absoluteNatural = mf
    .terminalEmptyString(justReturn("absolute natural"));
    interpreter.accidentals = mf.terminalEmptyString(justReturn("accidentals"));
    interpreter.octavation = mf.terminalEmptyString(justReturn("octavation"));
    
    spyOn(interpreter, "toneHelper").and.returnValue("tone helper");
    expect(interpreter.absoluteTone("")).toEqual("tone helper");
    expect(interpreter.toneHelper)
    .toHaveBeenCalledWith("absolute natural", "accidentals", "octavation");
  });
  
});
