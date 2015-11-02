describe("Interpreter().nonTerminalSequence([symbol1, ... , symbolN])" + 
"(lexeme1 + ... + lexemeN + code, Interpreter.JUST_MAKE_INSTRUCTION)" +
".call(thisBinding)", function() {
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
    thisBinding.method = stub(code);
    expect(code.getUnparsed()).toEqual("code");
    thisBinding.method();
    expect(thisBinding.con).toEqual("value 0" + "lexeme 1");
  });
  
  it("with n = 1, returns the same thing as " +
  "symbol1(code, Interpreter.JUST_MAKE_INSTRUCTION)", function() {
    var sequence = interpreter.nonTerminalSequence([actuallSymbol1]);
    var actuallCodePointer = StubCodePointer("lexeme 1" + "code");
    actuallThisBinding.method = sequence(actuallCodePointer);
    var expectedCodePointer = StubCodePointer("lexeme 1" + "code");
    expectedThisBinding.method = 
    expectedSymbol1(expectedCodePointer);
    expect(actuallCodePointer.getUnparsed())
    .toEqual(expectedCodePointer.getUnparsed());
    expect(actuallThisBinding.method())
    .toEqual(expectedThisBinding.method());
    expect(actuallThisBinding.con).toEqual(expectedThisBinding.con);
  });
  
  it("with n = 2, returns the same thing as calling symbol1 and 2 " + 
  "with apropriate code and composing the results", function() {
    var sequence = interpreter.nonTerminalSequence([actuallSymbol1, actuallSymbol2]);
    var expectedCodePointer = StubCodePointer("lexeme 1" + "lexeme 2" + "code");
    expectedThisBinding.method1 = expectedSymbol1(expectedCodePointer);
    expectedThisBinding.method2 = expectedSymbol2(expectedCodePointer);
    expectedThisBinding.method1();
    var expectedResult = expectedThisBinding.method2();
    var actuallCodePointer = StubCodePointer("lexeme 1" + "lexeme 2" + "code");
    actuallThisBinding.method = sequence(actuallCodePointer);
    expect(actuallCodePointer.getUnparsed())
    .toEqual(expectedCodePointer.getUnparsed());
    expect(actuallThisBinding.method()).toEqual(expectedResult);
    expect(actuallThisBinding.con).toEqual(expectedThisBinding.con);
  });
  
  it("with n = 0, parses nothing", function() {
    var sequence = interpreter.nonTerminalSequence([]);
    var unparsedCodePointer = StubCodePointer("code");
    expect(sequence(unparsedCodePointer)()).toBe(undefined);
    expect(unparsedCodePointer.getUnparsed()).toEqual("code");
  });
  
  it("returns null if any symbol(code) in symbols returns null. " + 
  "Subsequent symbols should not be called", function() {
    var actuallSymbol1 = jasmine.createSpy("actuallSymbol1").and
    .returnValue(function() {});
    var actuallSymbol2 = jasmine.createSpy("actuallSymbol1").and
    .returnValue(null);
    var actuallSymbol3 = jasmine.createSpy("actuallSymbol1").and
    .returnValue(function() {});
    var sequence = interpreter.nonTerminalSequence(
      [actuallSymbol1, actuallSymbol2, actuallSymbol3]
    );
    
    expect(sequence(CodePointer(""))).toBe(null);
    expect(actuallSymbol3).not.toHaveBeenCalled();
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
    
    var symbol = jasmine.createSpy("symbol").and.returnValue(thisThief);
    var sequence = interpreter.nonTerminalSequence([symbol]);
    var instruction = sequence(CodePointer(""));
    instruction.call(thisBinding);
    expect(stolenThis).toBe(thisBinding);
  });
});
