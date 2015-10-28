describe("Terminal(token, interpretation)" + 
".parse(unparsedCodePointer)(value)", function() {
  it("calls lexemeHead with unparsedCodePointer", function() {
    var terminal = Terminal("token", "interpretation");
    spyOn(terminal, "lexemeHead");
    terminal.parse("unparsedCodePointer");
    expect(terminal.lexemeHead).toHaveBeenCalledWith("unparsedCodePointer");
  });
  
  it("calls interpretation with value and all the elements in the result " + 
  "of lexemeHead", function() {
    var interpretation = jasmine.createSpy("interpretation");
    var terminal = Terminal("token", interpretation);
    spyOn(terminal, "lexemeHead").and.returnValue(["lexeme a", "lexeme b"]);
    var instruction = terminal.parse();
    instruction("value");
    expect(interpretation).toHaveBeenCalledWith("value", "lexeme a", "lexeme b");
  });
  
  it("returns the result of interpretation", function() {
    var interpretation = jasmine.createSpy("interpretation").and
    .returnValue("interpretation result");
    var terminal = Terminal("token", interpretation);
    spyOn(terminal, "lexemeHead").and.returnValue([]);
    expect(instruction = terminal.parse()()).toEqual("interpretation result");
  });
  
  it("returns null if the result of lexemeHead is null", function() {
    var terminal = Terminal("token", "interpretation");
    spyOn(terminal, "lexemeHead").and.returnValue(null);
    expect(terminal.parse()).toBe(null);
  });
  
});
