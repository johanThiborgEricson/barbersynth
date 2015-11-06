describe("AbsoluteNote", function() {
  
  var interpreter;
  var mf = Interpreter.MethodFactory();
  
  beforeEach(function() {
    interpreter = LilyPondInterpreter();
  });
  
  it("calls natural2tone with the result of absoluteNatural and", function() {
    spyOn(interpreter, "natural2tone");
    interpreter.absoluteNatural = mf.terminalEmptyString(function() {
      return "absolute natural";
    });
    
    interpreter.absoluteNote("");
    expect(interpreter.natural2tone).toHaveBeenCalledWith("absolute natural");
  });
  
});
