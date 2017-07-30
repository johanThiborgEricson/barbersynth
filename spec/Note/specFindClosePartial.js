describe("(new Note(tone)).findClosePartial(fundamental), with tone - fundamental", 
function() {
  it("= 12, sets partial to the second partial and note.fundamental to " + 
  "fundamental", function() {
    var note = new Note(15);
    expect(note.findClosePartial(3)).toBe(true);
    expect(note.partial).toBe(2);
    expect(note.fundamental).toBe(3);
  });
  
  it("= 19, sets partial to the third partial", function() {
    var note = new Note(19);
    expect(note.findClosePartial(0)).toBe(true);
    expect(note.partial).toBe(3);
  });
  
  it("= 28, sets partial to the fifth partial", function() {
    var note = new Note(28);
    expect(note.findClosePartial(0)).toBe(true);
    expect(note.partial).toBe(5);
  });
  
  it("= 13, returns false and sets partial and fundamental to undefined", 
  function() {
    var note = new Note(13);
    note.fundamental = "a fundamental";
    note.partial = "a partial";
    expect(note.findClosePartial(0)).toBe(false);
    expect(note.fundamental).toBe(undefined);
    expect(note.partial).toBe(undefined);
  });
  
});
