describe("(new LilyPondInterpreter()).melody(prefix + absolute + s + " +
"relative1 + ... + s + relativeN + postfix", function() {
  
  var interpreter;
  var methodFactory = InterpreterMethodFactory();
  
  beforeEach(function() {
    interpreter = new LilyPondInterpreter();
    expect(interpreter.absoluteNote).toBeDefined();
    interpreter.absoluteNote = methodFactory.atom(/absolute/, function() {
      return "absolute note";
    });
    
    expect(interpreter.relativeNote).toBeDefined();
    interpreter.relativeNote = methodFactory.atom(/relative(\d)/, 
    function(digit) {
      return "relative note " + digit;
    });
    
  });
  
  it("if n = 0, parses absoluteNote and returns an array of its result", 
  function() {
    expect(interpreter.melody("absolute")).toEqual(["absolute note"]);
  });
  
  it("if s is one blankspace and n = 1, returns result of absolute and " +
  "relative", function() {
    
    expect(interpreter.melody("absolute relative1"))
        .toEqual(["absolute note", "relative note 1"]);
  });
  
  it("accepts one or more space, tab and newline between notes", function() {
    expect(interpreter.melody("absolute\t\n relative1"))
        .toEqual(["absolute note", "relative note 1"]);
  });
  
  it("does not accept s to be the empty string", function() {
    expect(function(){
      interpreter.melody("absoluterelative1");
    }).toThrow();
  });
  
  it("accepts spaces, tabs and newlines around the input", function() {
    expect(interpreter.melody("\nabsolute\t")).toEqual(["absolute note"]);
  });
  
});