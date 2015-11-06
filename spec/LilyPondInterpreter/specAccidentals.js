describe("accidentals", function() {
  
  var interpreter;
  
  beforeEach(function() {
    interpreter = LilyPondInterpreter();
    interpreter.tone = 0;
  });
  
  it("decreases tone by one for each es", function() {
    expect(interpreter.accidentals("es")).toBe(-1);
    expect(interpreter.accidentals("eses")).toBe(-2);
  });
  
  it("increases tone by one for each is", function() {
    expect(interpreter.accidentals("is")).toBe(1);
    expect(interpreter.accidentals("isis")).toBe(2);
  });
  
  it("leaves the tone if no accidental is specified", function() {
    expect(interpreter.accidentals("")).toBe(0);
  });
  
});
