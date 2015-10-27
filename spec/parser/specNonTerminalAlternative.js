describe("NonTerminalAlternative([symbol1, ... , symbolN, ... symbolM])" + 
".parse(lexemeK + code)", function() {
  it("if k = m = 1, calls symbol1.parse with unparsedCodePointer and returns " + 
  "the reslut and updates unparsedCodePointer", function() {
    var symbol1 = StubConcatenationTerminal();
    spyOn(symbol1, "parse").and.callThrough();
    var alternative = NonTerminalAlternative([symbol1]);
    var unparsedCodePointer = {value: "lexeme 1" + "code"};
    var actuallInstruction = alternative.parse(unparsedCodePointer);
    expect(unparsedCodePointer.value).toEqual("code");
    expect(actuallInstruction("value 0")).toEqual("value 0" + "lexeme 1");
    
    // This fails, because jasmine makes shallow copies of the arguments
    // TODO: make jasmine bug report and dissapear for a while...
    // FIXME: will fixing this jasmine bug introduce problems with closures?
    // function arguments can be got afterwards...
    // expect(symbol1.parse).toHaveBeenCalledWith({value: "lexeme 1" + "code"});
  });

  it("if k = m = 1, calls symbol1.parse with unparsedCodePointer", function() {
    var symbol1 = StubConcatenationTerminal();
    spyOn(symbol1, "parse");
    var alternative = NonTerminalAlternative([symbol1]);
    var unparsedCodePointer = {value: "lexeme 1" + "code"};
    alternative.parse(unparsedCodePointer);
    expect(symbol1.parse).toHaveBeenCalledWith({value: "lexeme 1" + "code"});
  });
  
  it("if k = m = 2, returns symbol2.parse", function() {
    var symbol1 = StubConcatenationTerminal();
    spyOn(symbol1, "parse").and.returnValue(null);
    var symbol2 = StubConcatenationTerminal();
    var alternative = NonTerminalAlternative([symbol1, symbol2]);
    var unparsedCodePointer = {value: "lexeme 2" + "code"};
    var instruction = alternative.parse(unparsedCodePointer);
    expect(instruction("value 0")).toEqual("value 0" + "lexeme 2");
  });
  
  function UnsuccessfulEaterOfChars() {
    return {
      parse(unparsedCodePointer) {
        unparsedCodePointer.value = unparsedCodePointer.value.slice(1);
        return null;
      }, 
    };
  }
  
  it("if k = m = 2 calls symbol2.parse with lexeme2 + code, even if " + 
  "symbol1.parse has moved the unparsedCodePointer before it failed", function() {
    var symbol1 = UnsuccessfulEaterOfChars();
    var symbol2 = StubConcatenationTerminal();
    var alternative = NonTerminalAlternative([symbol1, symbol2]);
    var unparsedCodePointer = {value: "lexeme 2" + "code"};
    var instruction = alternative.parse(unparsedCodePointer);
    expect(instruction("value 0")).toEqual("value 0" + "lexeme 2");
  });
  
});
