describe("(new LilyPondInterpreter()).RelativeNote", function() {
  
  var interpreter;
  var mf = new InterpreterMethodFactory();
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

    interpreter.relativeNatural = mf.empty(justReturn("relative natural"));
    interpreter.accidentals = mf.empty(justReturn("accidentals"));
    interpreter.octavation = mf.empty(justReturn("octavation"));
    
    interpreter.noteLength = mf.empty(justReturn("note length"));
  });
  
  it("calls toneHelper with relativeNatural, accidentals and octavation", 
  function() {
    spyOn(interpreter, "toneHelper");
    interpreter.relativeNote("");
    expect(interpreter.toneHelper)
    .toHaveBeenCalledWith("relative natural", "accidentals", "octavation");
  });
  
  it("calls Note with the result of tone helper and noteLength as arguments " +
  "and returns the result", function() {
    spyOn(interpreter, "toneHelper").and.returnValue("tone helper");
    interpreter.noteLength = mf.empty(justReturn("note length"));
    expect(interpreter.relativeNote("")).toEqual({note: "object"});
    expect(Note).toHaveBeenCalledWith("tone helper", "note length");
  });
  
});
