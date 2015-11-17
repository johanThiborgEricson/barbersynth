describe("Note(tone).getSubPartial(n)", function() {
  it("if tone is 0 and n is 1, returns 0", function() {
    var note = Note(0);
    expect(note.getSubPartial(1)).toBe(0);
  });
  
  it("if tone is 0 and n is 2, returns -12", function() {
    var note = Note(0);
    expect(note.getSubPartial(2)).toBe(-12);
  });
  
  it("returns the sub partial relative to tone", function() {
    var note = Note(1);
    expect(note.getSubPartial(1)).toBe(1);
  });
  
  it("returns integer values", function() {
    var note = Note(0);
    expect(note.getSubPartial(3)).toEqual(-19);
  });
  
  it("if tone is 0 and n is 16, returns -48", function() {
    var note = Note(0);
    expect(note.getSubPartial(16)).toBe(-48);
  });
  
  it("returns different tones for n = 22 and n = 23", function() {
    var note = Note(0);
    expect(note.getSubPartial(22)).not.toEqual(note.getSubPartial(23));
  });
  
});
