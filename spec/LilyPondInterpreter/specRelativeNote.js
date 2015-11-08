describe("RelativeNote", function() {
  
  var interpreter;
  var mf = Interpreter.MethodFactory();
  var Note;
  
  // TODO: wait for legacy IE to start supporting arrow functions...
  var justReturn = function(value){
    return function() {
      return value;
    };
  };
  
  beforeEach(function() {
    Note = jasmine.createSpy("Note").and.returnValue("note object");
    interpreter = LilyPondInterpreter(Note);
    interpreter.relativeTone = mf
    .terminalEmptyString(justReturn("relative tone"));
    interpreter.noteLength = mf
    .terminalEmptyString(justReturn("note length"));
  });
  
  it("calls Note with relativeTone and noteLength as arguments and returns " +
  "the result", function() {
    interpreter.noteLength = mf.terminalEmptyString(justReturn("note length"));
    expect(interpreter.relativeNote("")).toEqual("note object");
    expect(Note).toHaveBeenCalledWith("relative tone", "note length");
  });
  
});
