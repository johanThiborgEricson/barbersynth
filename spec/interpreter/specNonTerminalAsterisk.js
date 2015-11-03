describe("NonTerminalAsterisk(symbol)" + 
"(CodePointer(lexeme1 + ... + lexemeN + code))", function() {
  var methodFactory = Interpreter.MethodFactory();
  
  it("with n = 1, does the same thing as symbol(CodePointer(lexeme1))", 
  function() {
    var actuallCodePointer = StubCodePointer("lexeme 1" + "code");
    var expectedCodePointer = StubCodePointer("lexeme 1" + "code");
    var actuallThisValue = {con: "value 0"};
    var expectedThisValue  = {con: "value 0"};
    var symbol = StubLexeme_dConcatenator();
    var asterisk = methodFactory.nonTerminalAsterisk(symbol);
    actuallThisValue.method = asterisk(actuallCodePointer);
    expectedThisValue.method = symbol(expectedCodePointer);
    expect(actuallThisValue.method())
    .toEqual(expectedThisValue.method());
    expect(actuallThisValue.con).toEqual(expectedThisValue.con);
    expect(actuallCodePointer.getUnparsed())
    .toEqual(expectedCodePointer.getUnparsed());
  });
  
  it("with n = 2, does the same thing as calling " + 
  "symbol(codePointer) twice and calling the result as " + 
  "methods of the thisBinding", function() {
    var actuallCodePointer = StubCodePointer("lexeme 1" + "lexeme 2" + "code");
    var expectedCodePointer = StubCodePointer("lexeme 1" + "lexeme 2" + "code");
    var actuallThisValue = {con: "value 0"};
    var expectedThisValue  = {con: "value 0"};
    var symbol = StubLexeme_dConcatenator();
    var asterisk = methodFactory.nonTerminalAsterisk(symbol);
    actuallThisValue.method = asterisk(actuallCodePointer);
    expectedThisValue.method1 = symbol(expectedCodePointer);
    expectedThisValue.method2 = symbol(expectedCodePointer);
    expectedThisValue.method1();
    expect(actuallThisValue.method())
    .toEqual(expectedThisValue.method2());
    expect(actuallThisValue.con).toEqual(expectedThisValue.con);
    expect(actuallCodePointer.getUnparsed())
    .toEqual(expectedCodePointer.getUnparsed());
  });
  
});
