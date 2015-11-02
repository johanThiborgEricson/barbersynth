describe("Interpreter()" + 
".nonTerminalAlternative([symbol1, ... , symbolN, ... symbolM])" + 
".parse(lexemeK + code)", function() {
  
  var interpreter = Interpreter();
  
  it("if k = m = 1, calls symbol1.makeInstruction with codePointer and returns " + 
  "the reslut and updates codePointer", function() {
    var actuallThisBinding = {con: "value 0"};
    var symbol1 = StubLexeme_dConcatenator();
    spyOn(symbol1, "makeInstruction").and.callThrough();
    var alternative = interpreter.nonTerminalAlternative([symbol1]);
    var codePointer = StubCodePointer("lexeme 1" + "code");
    actuallThisBinding.method = alternative.makeInstruction(codePointer);
    expect(codePointer.getUnparsed()).toEqual("code");
    actuallThisBinding.method();
    expect(actuallThisBinding.con).toEqual("value 0" + "lexeme 1");
  });
  
  it("if k = m = 1, calls symbol1.parse with codePointer", function() {
    var symbol1 = StubLexeme_dConcatenator();
    spyOn(symbol1, "makeInstruction");
    var alternative = interpreter.nonTerminalAlternative([symbol1]);
    var codePointer = StubCodePointer("lexeme 1" + "code");
    alternative.makeInstruction(codePointer);
    expect(symbol1.makeInstruction).toHaveBeenCalledWith(codePointer);
  });
  
  it("if k = m = 2, returns symbol2.makeInstruction", function() {
    var actuallThisBinding = {con: "value 0"};
    var symbol1 = StubLexeme_dConcatenator();
    spyOn(symbol1, "makeInstruction").and.returnValue(null);
    var symbol2 = StubLexeme_dConcatenator();
    var alternative = interpreter.nonTerminalAlternative([symbol1, symbol2]);
    var codePointer = StubCodePointer("lexeme 2" + "code");
    actuallThisBinding.method = alternative.makeInstruction(codePointer);
    actuallThisBinding.method();
    expect(actuallThisBinding.con).toEqual("value 0" + "lexeme 2");
  });
  
  function UnsuccessfulEaterOfChars() {
    function instructionMaker(codePointer) {
      codePointer.restore(codePointer.getUnparsed().slice(1));
      return null;
    }
    
    return Interpreter().symbol(instructionMaker);
  }
  
  it("if k = m = 2 calls symbol2.parse with lexeme2 + code, even if " + 
  "symbol1.makeInstruction has moved the unparsedCodePointer before it failed", 
  function() {
    var symbol1 = UnsuccessfulEaterOfChars();
    var actuallThisBinding = {con: "value 0"};
    var symbol2 = StubLexeme_dConcatenator(true);
    var alternative = interpreter.nonTerminalAlternative([symbol1, symbol2]);
    var codePointer = StubCodePointer("lexeme 2" + "code");
    actuallThisBinding.method = alternative.makeInstruction(codePointer);
    actuallThisBinding.method();
    expect(actuallThisBinding.con).toEqual("value 0" + "lexeme 2");
  });
  
  it("if k = 1 and m = 2, moves unparsedCodePointer past lexeme1", 
  function() {
    var symbol1 = StubLexeme_dConcatenator(true);
    var actuallThisBinding = {con: "value 0"};
    var symbol2 = UnsuccessfulEaterOfChars();
    var alternative = interpreter.nonTerminalAlternative([symbol1, symbol2]);
    var codePointer = StubCodePointer("lexeme 1" + "code");
    alternative.makeInstruction(codePointer)();
    expect(codePointer.getUnparsed()).toEqual("code");
  });
  
});
