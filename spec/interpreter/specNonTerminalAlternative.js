describe("Interpreter()" + 
".nonTerminalAlternative([symbol1, ... , symbolN, ... symbolM])" + 
".parse(lexemeK + code)", function() {
  
  var interpreter = Interpreter();
  
  it("if k = m = 1, calls symbol1 with codePointer and " +
  "Interpreter.JUST_MAKE_INSTRUCTION", 
  function() {
    var actuallThisBinding = {con: "value 0"};
    var symbol1 = jasmine.createSpy("symbol 1").and
    .returnValue(function() {});
    var alternative = interpreter.nonTerminalAlternative([symbol1]);
    var codePointer = StubCodePointer("lexeme 1" + "code");
    actuallThisBinding.method = alternative(codePointer, true);
    actuallThisBinding.method();
    expect(symbol1)
    .toHaveBeenCalledWith(codePointer, Interpreter.JUST_MAKE_INSTRUCTION);
  });
  
  it("if k = m = 1, returns the reslut of calling symbol1 and updates codePointer", function() {
    var actuallThisBinding = {con: "value 0"};
    var symbol1 = StubLexeme_dConcatenator();
    var alternative = interpreter.nonTerminalAlternative([symbol1]);
    var codePointer = StubCodePointer("lexeme 1" + "code");
    actuallThisBinding.method = alternative(codePointer, true);
    expect(codePointer.getUnparsed()).toEqual("code");
    actuallThisBinding.method();
    expect(actuallThisBinding.con).toEqual("value 0" + "lexeme 1");
  });
  
  it("if k = m = 1, calls symbol1 with codePointer and " +
  "Interpreter.JUST_MAKE_INSTRUCTION", function() {
    var symbol1 = jasmine.createSpy("symbol 1");
    var alternative = interpreter.nonTerminalAlternative([symbol1]);
    var codePointer = StubCodePointer("lexeme 1" + "code");
    alternative(codePointer, true);
    expect(symbol1).toHaveBeenCalledWith(codePointer, 
    Interpreter.JUST_MAKE_INSTRUCTION);
  });
  
  it("if k = m = 2, returns result of calling symbol2", function() {
    var actuallThisBinding = {con: "value 0"};
    var symbol1 = jasmine.createSpy("symbol1").and.returnValue(null);
    var symbol2 = StubLexeme_dConcatenator();
    var alternative = interpreter.nonTerminalAlternative([symbol1, symbol2]);
    var codePointer = StubCodePointer("lexeme 2" + "code");
    actuallThisBinding.method = alternative(codePointer, true);
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
  "symbol1 has moved the unparsedCodePointer before it failed", 
  function() {
    var symbol1 = UnsuccessfulEaterOfChars();
    var actuallThisBinding = {con: "value 0"};
    var symbol2 = StubLexeme_dConcatenator();
    var alternative = interpreter.nonTerminalAlternative([symbol1, symbol2]);
    var codePointer = StubCodePointer("lexeme 2" + "code");
    actuallThisBinding.method = alternative(codePointer, true);
    actuallThisBinding.method();
    expect(actuallThisBinding.con).toEqual("value 0" + "lexeme 2");
  });
  
  it("if k = 1 and m = 2, moves unparsedCodePointer past lexeme1", 
  function() {
    var symbol1 = StubLexeme_dConcatenator();
    var actuallThisBinding = {con: "value 0"};
    var symbol2 = UnsuccessfulEaterOfChars();
    var alternative = interpreter.nonTerminalAlternative([symbol1, symbol2]);
    var codePointer = StubCodePointer("lexeme 1" + "code");
    alternative(codePointer, true)();
    expect(codePointer.getUnparsed()).toEqual("code");
  });
  
});
