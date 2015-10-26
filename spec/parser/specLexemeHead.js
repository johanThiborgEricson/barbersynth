describe("Terminal(/ignore0(token1)...(tokenN)/, interpretation).splitLexemeHead", function() {
  it("when called with ignore0 + lexeme1 returns {lexeme: [lexeme1], code: ''}", function() {
    var terminal = Terminal(/ignore0(lexeme1)/);
    var code = {value: "ignore0lexeme1"};
    expect(terminal.lexemeHead(code)).toEqual(["lexeme1"]);
    expect(code.value).toEqual("");
  });
  
  it("when called with ignore0 + lexeme1 + code returns {lexeme: [lexeme1], code: code}", function() {
    var terminal = Terminal(/ignore0(lexeme1)/);
    var code = {value: "ignore0lexeme1code"};
    expect(terminal.lexemeHead(code)).toEqual(["lexeme1"]);
    expect(code.value).toEqual("code");
  });
  
  it("if ignore == '', when called with code + lexeme1 returns null", function() {
    var terminal = Terminal(/(lexeme1)/);
    var code = {value: "codelexeme1"};
    expect(terminal.lexemeHead(code)).toBe(null);
  });
  
  it("if n > 1, returns all captured groups", function(){
    var terminal = Terminal(/(lexeme1)(lexeme2)/);
    var code = {value: "lexeme1lexeme2"};
    expect(terminal.lexemeHead(code)).toEqual(["lexeme1", "lexeme2"]);
  });
  
  it("returns null when code doesn't match token", function() {
    var terminal = Terminal(/(lexeme1)/);
    expect(terminal.lexemeHead({value: "nonsense"})).toBe(null);
  });
  
});
