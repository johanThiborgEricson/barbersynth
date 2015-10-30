describe("Symbol().interpret(code)", function() {
  it("calls this.makeInstruction with {value: code}, calls the result and " + 
  "returns the result", function() {
    var symbol = Symbol();
    var instruction = jasmine.createSpy("instruction").and
    .returnValue("result");
    spyOn(symbol, "makeInstruction").and
    .returnValue(instruction);
    expect(symbol.interpret("")).toEqual("result");
    expect(symbol.makeInstruction).toHaveBeenCalledWith({value: ""});
    expect(instruction).toHaveBeenCalled();
  });
  
  it("is reachable from all sub-classes", function() {
    expect(Terminal().interpret).toBeDefined();
    expect(NonTerminalAlternative().interpret).toBeDefined();
    expect(NonTerminalSequence().interpret).toBeDefined();
  });
  
  it("returns Symbol.PARSE_ERROR if makeInstruction returns null", function() {
    var symbol = Symbol();
    spyOn(symbol, "makeInstruction").and
    .returnValue(null);
    
    expect(symbol.interpret("code")).toEqual(Symbol.PARSE_ERROR);
  });
  
  it("returns Symbol.PARSE_ERROR if code is non-empty after parse without " + 
  "calling instruction", function() {
    var symbol = Symbol();
    var instruction;
    symbol.makeInstruction = function(unparsedCodePointer) {
      unparsedCodePointer.value = "ode";
      instruction = jasmine.createSpy("symbol.makeInstruction result");
      return instruction;
    };
    
    expect(symbol.interpret("code")).toEqual(Symbol.PARSE_ERROR);
    expect(instruction).not.toHaveBeenCalled();
  });
  
});
