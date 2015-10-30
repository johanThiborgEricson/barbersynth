describe("Interpreter().interpret(startSymbol, code)", function() {

  xit("calls this.makeInstruction with CodePointer(code), calls the result " + 
  "and returns the result", function() {
    var RealCodePointer = CodePointer;
    CodePointer = jasmine.createSpy("CodePointer").and
    .returnValue("code pointer");
    
    var startSymbol = Symbol();
    var instruction = jasmine.createSpy("instruction").and
    .returnValue("result");
    spyOn(startSymbol, "makeInstruction").and
    .returnValue(instruction);
    var interpreter = Interpreter();
    expect(interpreter.interpret("")).toEqual("result");
    expect(startSymbol.makeInstruction).toHaveBeenCalledWith("code pointer");
    expect(instruction).toHaveBeenCalled();
    
    CodePointer = RealCodePointer;
  });
  
  it("throws Symbol.PARSE_ERROR if makeInstruction returns null", function() {
    var startSymbol = Symbol();
    spyOn(startSymbol, "makeInstruction").and
    .returnValue(null);
    var interpreter = Interpreter();
    expect(function() {interpreter.interpret(startSymbol, "code");})
    .toThrowError("Interpreter.PARSE_ERROR");
  });
  
  it("returns Symbol.PARSE_ERROR if codePointer.getUnparsed() is non-empty " + 
  "after parse without calling instruction", function() {
    var startSymbol = Symbol();
    var instruction;
    startSymbol.makeInstruction = function(codePointer) {
      codePointer.parse(/./);
      instruction = jasmine.createSpy("symbol.makeInstruction result");
      return instruction;
    };
    
    expect(function() {Interpreter().interpret(startSymbol, "code");})
    .toThrowError("Interpreter.PARSE_ERROR");
    expect(instruction).not.toHaveBeenCalled();
  });
  
});
