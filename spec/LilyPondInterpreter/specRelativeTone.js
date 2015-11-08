describe("RelativeTone(relativeNatural, accidentals, octavation)", function() {
  
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
  
  it("calls toneHelper with relativeNatural, accidentals and octavation and " +
  "returns the result", function() {
    interpreter.relativeNatural = mf
    .terminalEmptyString(justReturn("relative natural"));
    interpreter.accidentals = mf.terminalEmptyString(justReturn("accidentals"));
    interpreter.octavation = mf.terminalEmptyString(justReturn("octavation"));
    
    spyOn(interpreter, "toneHelper").and.returnValue("tone helper");
    expect(interpreter.relativeTone("")).toEqual("tone helper");
    expect(interpreter.toneHelper)
    .toHaveBeenCalledWith("relative natural", "accidentals", "octavation");
  });
  
});
