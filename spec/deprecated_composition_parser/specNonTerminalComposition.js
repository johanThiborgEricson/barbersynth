describe("NonTerminalComposition([symbol1, ... , symbolN])" + 
".parse(lexeme1 + ... + lexemeN + code).perform(value0)", function() {
  var symbol1;
  var symbol2;
  var symbol3;
  beforeEach(function() {
    symbol1 = StubConcatenationTerminal();
    symbol2 = StubConcatenationTerminal();
    symbol3 = StubConcatenationTerminal();
  });
  
  it("(StubConcatenationTerminal spike)", function() {
    var stub = StubConcatenationTerminal();
    var code = {value: "lexeme 1" + "code"};
    var instruction = stub.parse(code);
    expect(code.value).toEqual("code");
    expect(instruction("value 0")).toEqual("value 0" + "lexeme 1");
  });
  
  it("with n = 1, returns the same thing as symbol1.parse(code)", function() {
    var composition = NonTerminalComposition([symbol1]);
    var actuallUnparsedCodePointer = {value: "lexeme 1" + "code"};
    var actuall = composition.parse(actuallUnparsedCodePointer);
    var expectedUnparsedCodePointer = {value: "lexeme 1" + "code"};
    var expected = symbol1.parse(expectedUnparsedCodePointer);
    expect(actuallUnparsedCodePointer.value)
    .toEqual(expectedUnparsedCodePointer.value);
    expect(actuall("value 0")).toEqual(expected("value 0"));
  });
  
  it("with n = 2, returns the same thing as calling parse on symbol1 and 2 with apropriate code and composing the results", function() {
    var composition = NonTerminalComposition([symbol1, symbol2]);
    var expectedUnparsedCodePointer = {value: "lexeme 1" + "lexeme 2" + "code"};
    var instruction1 = symbol1.parse(expectedUnparsedCodePointer);
    var instruction2 = symbol2.parse(expectedUnparsedCodePointer);
    var value = "value 0";
    value = instruction1(value);
    value = instruction2(value);
    var actuallUnparsedCodePointer = {value: "lexeme 1" + "lexeme 2" + "code"};
    var actuall = composition.parse(actuallUnparsedCodePointer);
    expect(actuallUnparsedCodePointer.value)
    .toEqual(expectedUnparsedCodePointer.value);
    expect(actuall("value 0")).toEqual(value);
  });
  
  it("with n = 0, parses nothing and returns the identity function", function() {
    var composition = NonTerminalComposition([]);
    var unparsedCodePointer = {value: "code"};
    var identity = composition.parse(unparsedCodePointer);
    expect(unparsedCodePointer.value).toEqual("code");
    expect(identity("value")).toEqual("value");
  });
  
  it("returns null if any symbol.parse(code) in symbols returns null. " + 
  "Subsequent symbol.parse should not be called", function() {
    spyOn(symbol1, "parse").and.returnValue(function() {});
    spyOn(symbol2, "parse").and.returnValue(null);
    spyOn(symbol3, "parse").and.returnValue(function() {});
    var composition = NonTerminalComposition([symbol1, symbol2, symbol3]);
    expect(composition.parse({value: ""})).toBe(null);
    expect(symbol3.parse).not.toHaveBeenCalled();
  });
  
});
