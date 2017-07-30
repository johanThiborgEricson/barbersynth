describe("(new LilyPondInterpreter()).AbsoluteNote", function() {
  
  var interpreter;
  var mf = InterpreterMethodFactory();
  var Note;
  
  // TODO: wait for legacy IE to start supporting arrow functions...
  var justReturn = function(value){
    return function() {
      return value;
    };
  };
  
  beforeEach(function() {
    Note = jasmine.createSpy("Note").and.returnValue({note: "object"});
    interpreter = new LilyPondInterpreter(Note);

    interpreter.absoluteNatural = mf
    .terminalEmptyString(justReturn("absolute natural"));
    interpreter.accidentals = mf.terminalEmptyString(justReturn("accidentals"));
    interpreter.octavation = mf.terminalEmptyString(justReturn("octavation"));
    
    interpreter.noteLength = mf
    .terminalEmptyString(justReturn("note length"));
  });
  
  it("calls toneHelper with absoluteNatural, accidentals and octavation", 
  function() {
    spyOn(interpreter, "toneHelper");
    interpreter.absoluteNote("");
    expect(interpreter.toneHelper)
    .toHaveBeenCalledWith("absolute natural", "accidentals", "octavation");
  });
  
  it("calls Note with the result of tone helper and noteLength as arguments " +
  "and returns the result", function() {
    spyOn(interpreter, "toneHelper").and.returnValue("tone helper");
    interpreter.noteLength = mf.terminalEmptyString(justReturn("note length"));
    expect(interpreter.absoluteNote("")).toEqual({note: "object"});
    expect(Note).toHaveBeenCalledWith("tone helper", "note length");
  });
  
});
