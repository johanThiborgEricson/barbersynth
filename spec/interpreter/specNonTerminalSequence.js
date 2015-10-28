describe("NonTerminalSequence([symbol1, ... , symbolN])" + 
".parse(lexeme1 + ... + lexemeN + code).perform(value0)", function() {
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
    actuallSymbol1 = StubLexeme_dConcatenator(actuallThisBinding);
    actuallSymbol2 = StubLexeme_dConcatenator(actuallThisBinding);
    actuallSymbol3 = StubLexeme_dConcatenator(actuallThisBinding);
    
    expectedThisBinding = {con: "value 0"};
    expectedSymbol1 = StubLexeme_dConcatenator(expectedThisBinding);
    expectedSymbol2 = StubLexeme_dConcatenator(expectedThisBinding);
    expectedSymbol3 = StubLexeme_dConcatenator(expectedThisBinding);
  });
  
  it("(StubLexeme_dConcatenator spike)", function() {
    var thisBinding = {con: "value 0"};
    var stub = StubLexeme_dConcatenator(thisBinding);
    var code = {value: "lexeme 1" + "code"};
    var instruction = stub.parse(code);
    expect(code.value).toEqual("code");
    instruction();
    expect(thisBinding.con).toEqual("value 0" + "lexeme 1");
  });
  
  it("with n = 1, returns the same thing as symbol1.parse(code)", function() {
    var composition = NonTerminalSequence([actuallSymbol1]);
    var actuallUnparsedCodePointer = {value: "lexeme 1" + "code"};
    var actuall = composition.parse(actuallUnparsedCodePointer);
    var expectedUnparsedCodePointer = {value: "lexeme 1" + "code"};
    var expected = expectedSymbol1.parse(expectedUnparsedCodePointer);
    expect(actuallUnparsedCodePointer.value)
    .toEqual(expectedUnparsedCodePointer.value);
    actuall();
    expected();
    expect(actuallThisBinding.con).toEqual(expectedThisBinding.con);
  });
  
  it("with n = 2, returns the same thing as calling parse on symbol1 and 2 with apropriate code and composing the results", function() {
    var composition = NonTerminalSequence([actuallSymbol1, actuallSymbol2]);
    var expectedUnparsedCodePointer = {value: "lexeme 1" + "lexeme 2" + "code"};
    var instruction1 = expectedSymbol1.parse(expectedUnparsedCodePointer);
    var instruction2 = expectedSymbol2.parse(expectedUnparsedCodePointer);
    instruction1();
    instruction2();
    var actuallUnparsedCodePointer = {value: "lexeme 1" + "lexeme 2" + "code"};
    var actuall = composition.parse(actuallUnparsedCodePointer);
    expect(actuallUnparsedCodePointer.value)
    .toEqual(expectedUnparsedCodePointer.value);
    actuall();
    expect(actuallThisBinding.con).toEqual(expectedThisBinding.con);
  });
  
  it("with n = 0, parses nothing", function() {
    var composition = NonTerminalSequence([]);
    var unparsedCodePointer = {value: "code"};
    composition.parse(unparsedCodePointer);
    expect(unparsedCodePointer.value).toEqual("code");
  });
  
  it("returns null if any symbol.parse(code) in symbols returns null. " + 
  "Subsequent symbol.parse should not be called", function() {
    spyOn(actuallSymbol1, "parse").and.returnValue(function() {});
    spyOn(actuallSymbol2, "parse").and.returnValue(null);
    spyOn(actuallSymbol3, "parse").and.returnValue(function() {});
    var composition = NonTerminalSequence(
      [actuallSymbol1, actuallSymbol2, actuallSymbol3]
    );
    
    expect(composition.parse({value: ""})).toBe(null);
    expect(actuallSymbol3.parse).not.toHaveBeenCalled();
  });
  
});
