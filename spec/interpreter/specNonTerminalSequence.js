describe("NonTerminalSequence([symbol1, ... , symbolN])" + 
".parse(lexeme1 + ... + lexemeN + code).call(thisBinding)", function() {
  var actuallSymbol1;
  var actuallSymbol2;
  var actuallSymbol3;

  var expectedSymbol1;
  var expectedSymbol2;
  var expectedSymbol3;

  var actuallThisBinding;
  var expectedThisBinding;
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
    var stub = StubLexeme_dConcatenator(thisBinding);
    var code = StubCodePointer("lexeme 1" + "code");
    thisBinding.method = stub.parse(code);
    expect(code.getUnparsed()).toEqual("code");
    thisBinding.method();
    expect(thisBinding.con).toEqual("value 0" + "lexeme 1");
  });
  
  it("with n = 1, returns the same thing as symbol1.parse(code)", function() {
    var composition = NonTerminalSequence([actuallSymbol1]);
    var actuallCodePointer = StubCodePointer("lexeme 1" + "code");
    actuallThisBinding.method = composition.parse(actuallCodePointer);
    var expectedCodePointer = StubCodePointer("lexeme 1" + "code");
    expectedThisBinding.method = expectedSymbol1.parse(expectedCodePointer);
    expect(actuallCodePointer.getUnparsed())
    .toEqual(expectedCodePointer.getUnparsed());
    actuallThisBinding.method();
    expectedThisBinding.method();
    expect(actuallThisBinding.con).toEqual(expectedThisBinding.con);
  });
  
  it("with n = 2, returns the same thing as calling parse on symbol1 and 2 " + 
  "with apropriate code and composing the results", function() {
    var composition = NonTerminalSequence([actuallSymbol1, actuallSymbol2]);
    var expectedCodePointer = StubCodePointer("lexeme 1" + "lexeme 2" + "code");
    expectedThisBinding.method1 = expectedSymbol1.parse(expectedCodePointer);
    expectedThisBinding.method2 = expectedSymbol2.parse(expectedCodePointer);
    expectedThisBinding.method1();
    expectedThisBinding.method2();
    var actuallCodePointer = StubCodePointer("lexeme 1" + "lexeme 2" + "code");
    actuallThisBinding.method = composition.parse(actuallCodePointer);
    expect(actuallCodePointer.getUnparsed())
    .toEqual(expectedCodePointer.getUnparsed());
    actuallThisBinding.method();
    expect(actuallThisBinding.con).toEqual(expectedThisBinding.con);
  });
  
  it("with n = 0, parses nothing", function() {
    var composition = NonTerminalSequence([]);
    var unparsedCodePointer = StubCodePointer("code");
    composition.parse(unparsedCodePointer);
    expect(unparsedCodePointer.getUnparsed()).toEqual("code");
  });
  
  it("returns null if any symbol.parse(code) in symbols returns null. " + 
  "Subsequent symbol.parse should not be called", function() {
    spyOn(actuallSymbol1, "parse").and.returnValue(function() {});
    spyOn(actuallSymbol2, "parse").and.returnValue(null);
    spyOn(actuallSymbol3, "parse").and.returnValue(function() {});
    var composition = NonTerminalSequence(
      [actuallSymbol1, actuallSymbol2, actuallSymbol3]
    );
    
    expect(composition.parse(CodePointer(""))).toBe(null);
    expect(actuallSymbol3.parse).not.toHaveBeenCalled();
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
    
    spyOn(actuallSymbol1, "parse").and.returnValue(thisThief);
    var composition = NonTerminalSequence([actuallSymbol1]);
    var instruction = composition.parse(CodePointer(""));
    instruction.call(thisBinding);
    expect(stolenThis).toBe(thisBinding);
  });
});
