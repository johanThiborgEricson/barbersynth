describe("(new LilyPondInterpreter()).octavation", function() {
  
  var interpreter;
  
  beforeEach(function() {
    interpreter = new LilyPondInterpreter();
  });
  
  it("returns one less per comma", function() {
    expect(interpreter.octavation(",")).toBe(-1);
    expect(interpreter.octavation(",,")).toBe(-2);
    expect(interpreter.octavation(",,,")).toBe(-3);
  });
  
  it("returns one more per apostrophe", function() {
    expect(interpreter.octavation("'")).toBe(1);
    expect(interpreter.octavation("''")).toBe(2);
    expect(interpreter.octavation("'''")).toBe(3);
  });
  
  it("returns zero for the empty string", function() {
    expect(interpreter.octavation("")).toBe(0);
  });
  
});
