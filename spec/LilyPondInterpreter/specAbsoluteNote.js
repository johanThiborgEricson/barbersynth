describe("AbsoluteNote", function() {
  
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
    interpreter.absoluteTone = mf
    .terminalEmptyString(justReturn("absolute tone"));
    interpreter.noteLength = mf
    .terminalEmptyString(justReturn("note length"));
  });
  
  it("calls Note with absoluteTone and noteLength as arguments and returns " +
  "the result", function() {
    interpreter.noteLength = mf.terminalEmptyString(justReturn("note length"));
    expect(interpreter.absoluteNote("")).toEqual("note object");
    expect(Note).toHaveBeenCalledWith("absolute tone", "note length");
  });
  
});
