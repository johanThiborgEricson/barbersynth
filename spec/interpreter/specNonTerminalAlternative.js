describe("NonTerminalAlternative([symbol1, ... , symbolN, ... symbolM])" + 
".parse(lexemeK + code)", function() {
  it("if k = m = 1, calls symbol1.parse with codePointer and returns " + 
  "the reslut and updates codePointer", function() {
    var actuallThisBinding = {con: "value 0"};
    var symbol1 = StubLexeme_dConcatenator(actuallThisBinding);
    spyOn(symbol1, "parse").and.callThrough();
    var alternative = NonTerminalAlternative([symbol1]);
    var codePointer = CodePointer("lexeme 1" + "code");
    actuallThisBinding.method = alternative.parse(codePointer);
    expect(codePointer.getUnparsed()).toEqual("code");
    actuallThisBinding.method();
    expect(actuallThisBinding.con).toEqual("value 0" + "lexeme 1");
  });
  
  // FIXME: is this test still relevant?
  it("if k = m = 1, calls symbol1.parse with codePointer", function() {
    var symbol1 = StubLexeme_dConcatenator();
    spyOn(symbol1, "parse");
    var alternative = NonTerminalAlternative([symbol1]);
    var codePointer = CodePointer("lexeme 1" + "code");
    alternative.parse(codePointer);
    expect(symbol1.parse).toHaveBeenCalledWith(codePointer);
  });
  
  it("if k = m = 2, returns symbol2.parse", function() {
    var actuallThisBinding = {con: "value 0"};
    var symbol1 = StubLexeme_dConcatenator(actuallThisBinding);
    spyOn(symbol1, "parse").and.returnValue(null);
    var symbol2 = StubLexeme_dConcatenator(actuallThisBinding);
    var alternative = NonTerminalAlternative([symbol1, symbol2]);
    var codePointer = CodePointer("lexeme 2" + "code");
    actuallThisBinding.method = alternative.parse(codePointer);
    actuallThisBinding.method();
    expect(actuallThisBinding.con).toEqual("value 0" + "lexeme 2");
  });
  
  function UnsuccessfulEaterOfChars() {
    return {
      parse(codePointer) {
        codePointer.value = codePointer.getUnparsed().slice(1);
        return null;
      }, 
    };
  }
  
  it("if k = m = 2 calls symbol2.parse with lexeme2 + code, even if " + 
  "symbol1.parse has moved the unparsedCodePointer before it failed", function() {
    var symbol1 = UnsuccessfulEaterOfChars();
    var actuallThisBinding = {con: "value 0"};
    var symbol2 = StubLexeme_dConcatenator(actuallThisBinding);
    var alternative = NonTerminalAlternative([symbol1, symbol2]);
    var codePointer = CodePointer("lexeme 2" + "code");
    actuallThisBinding.method = alternative.parse(codePointer);
    actuallThisBinding.method();
    expect(actuallThisBinding.con).toEqual("value 0" + "lexeme 2");
  });
  
});
