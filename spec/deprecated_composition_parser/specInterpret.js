describe("Symbol().interpret(code, value)", function() {
  it("calls this.parse with {value: code}, calls the result with value and " + 
  "returns the result", function() {
    var symbol = Symbol();
    var instruction = jasmine.createSpy("instruction").and
    .returnValue("result");
    spyOn(symbol, "parse").and
    .returnValue(instruction);
    
    var result = symbol.interpret("", "value");
    expect(symbol.parse).toHaveBeenCalledWith({value: ""});
    expect(instruction).toHaveBeenCalledWith("value");
    expect(result).toEqual("result");
  });
  
  it("is reachable from all sub-classes", function() {
    expect(Terminal().interpret).toBeDefined();
    expect(NonTerminalAlternative().interpret).toBeDefined();
    expect(NonTerminalComposition().interpret).toBeDefined();
  });
  
  it("returns Symbol.PARSE_ERROR if parse returns null", function() {
    var symbol = Symbol();
    spyOn(symbol, "parse").and
    .returnValue(null);
    
    expect(symbol.interpret("code")).toEqual(Symbol.PARSE_ERROR);
  });
  
  it("returns Symbol.PARSE_ERROR if code is non-empty after parse without " + 
  "calling instruction", function() {
    var symbol = Symbol();
    var instruction;
    symbol.parse = function(unparsedCodePointer) {
      unparsedCodePointer.value = "ode";
      instruction = jasmine.createSpy("symbol.parse result");
      return instruction;
    };
    
    expect(symbol.interpret("code")).toEqual(Symbol.PARSE_ERROR);
    expect(instruction).not.toHaveBeenCalled();
  });
  
});
