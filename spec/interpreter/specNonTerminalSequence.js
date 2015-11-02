describe("Interpreter().nonTerminalSequence([symbol1, ... , symbolN])" + 
".getInstruction(lexeme1 + ... + lexemeN + code).call(thisBinding)", function() {
  var actuallSymbol1;
  var actuallSymbol2;
  var actuallSymbol3;

  var expectedSymbol1;
  var expectedSymbol2;
  var expectedSymbol3;

  var actuallThisBinding;
  var expectedThisBinding;
  
  var interpreter = Interpreter();
  
  beforeEach(function() {
    actuallThisBinding = {con: "value 0"};
    actuallSymbol1 = StubLexeme_dConcatenator();
    actuallSymbol2 = StubLexeme_dConcatenator();
    actuallSymbol3 = StubLexeme_dConcatenator();
    
    expectedThisBinding = {con: "value 0"};
    expectedSymbol1 = StubLexeme_dConcatenator();
    expectedSymbol2 = StubLexeme_dConcatenator();
    expectedSymbol3 = StubLexeme_dConcatenator();
  });
  
  it("(StubLexeme_dConcatenator spike)", function() {
    var thisBinding = {con: "value 0"};
    var stub = StubLexeme_dConcatenator();
    var code = StubCodePointer("lexeme 1" + "code");
    thisBinding.method = stub.makeInstruction(code);
    expect(code.getUnparsed()).toEqual("code");
    thisBinding.method();
    expect(thisBinding.con).toEqual("value 0" + "lexeme 1");
  });
  
  it("with n = 1, returns the same thing as symbol1.getInstruction(code)", function() {
    var sequence = interpreter.nonTerminalSequence([actuallSymbol1]);
    var actuallCodePointer = StubCodePointer("lexeme 1" + "code");
    actuallThisBinding.method = sequence.makeInstruction(actuallCodePointer);
    var expectedCodePointer = StubCodePointer("lexeme 1" + "code");
    expectedThisBinding.method = 
    expectedSymbol1.makeInstruction(expectedCodePointer);
    expect(actuallCodePointer.getUnparsed())
    .toEqual(expectedCodePointer.getUnparsed());
    expect(actuallThisBinding.method())
    .toEqual(expectedThisBinding.method());
    expect(actuallThisBinding.con).toEqual(expectedThisBinding.con);
  });
  
  it("with n = 2, returns the same thing as calling makeInstruction on symbol1 and 2 " + 
  "with apropriate code and composing the results", function() {
    var sequence = interpreter.nonTerminalSequence([actuallSymbol1, actuallSymbol2]);
    var expectedCodePointer = StubCodePointer("lexeme 1" + "lexeme 2" + "code");
    expectedThisBinding.method1 = expectedSymbol1.makeInstruction(expectedCodePointer);
    expectedThisBinding.method2 = expectedSymbol2.makeInstruction(expectedCodePointer);
    expectedThisBinding.method1();
    var expectedResult = expectedThisBinding.method2();
    var actuallCodePointer = StubCodePointer("lexeme 1" + "lexeme 2" + "code");
    actuallThisBinding.method = sequence.makeInstruction(actuallCodePointer);
    expect(actuallCodePointer.getUnparsed())
    .toEqual(expectedCodePointer.getUnparsed());
    expect(actuallThisBinding.method()).toEqual(expectedResult);
    expect(actuallThisBinding.con).toEqual(expectedThisBinding.con);
  });
  
  it("with n = 0, parses nothing", function() {
    var sequence = interpreter.nonTerminalSequence([]);
    var unparsedCodePointer = StubCodePointer("code");
    expect(sequence.makeInstruction(unparsedCodePointer)()).toBe(undefined);
    expect(unparsedCodePointer.getUnparsed()).toEqual("code");
  });
  
  it("returns null if any symbol.makeInstruction(code) in symbols returns null. " + 
  "Subsequent symbol.makeInstruction should not be called", function() {
    spyOn(actuallSymbol1, "makeInstruction").and.returnValue(function() {});
    spyOn(actuallSymbol2, "makeInstruction").and.returnValue(null);
    spyOn(actuallSymbol3, "makeInstruction").and.returnValue(function() {});
    var sequence = interpreter.nonTerminalSequence(
      [actuallSymbol1, actuallSymbol2, actuallSymbol3]
    );
    
    expect(sequence.makeInstruction(CodePointer(""))).toBe(null);
    expect(actuallSymbol3.makeInstruction).not.toHaveBeenCalled();
  });
  
  it("calls the instructions from the symbols with thisBinding as this-binding", 
  function() {
    var stolenThis;
    var thisThief = function() {
      stolenThis = this;
    };
    
    var thisBinding = {
      property: "property",
    };
    
    spyOn(actuallSymbol1, "makeInstruction").and.returnValue(thisThief);
    var sequence = interpreter.nonTerminalSequence([actuallSymbol1]);
    var instruction = sequence.makeInstruction(CodePointer(""));
    instruction.call(thisBinding);
    expect(stolenThis).toBe(thisBinding);
  });
});
