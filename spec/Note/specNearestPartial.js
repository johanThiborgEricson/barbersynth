describe("Note(tone).nearestPartial(f0), with tone - f0", function() {
  it("= 12, returns the second partial", function() {
    var note = Note(15);
    expect(note.nearestPartial(3)).toEqual(2);
  });
  
  it("= 19, returns the third partial", function() {
    var note = Note(19);
    expect(note.nearestPartial(0)).toEqual(3);
  });
  
  it("= 28, returns the fifth partial", function() {
    var note = Note(28);
    expect(note.nearestPartial(0)).toEqual(5);
  });
  
  it("= 13, returns null", function() {
    var note = Note(13);
    expect(note.nearestPartial(0)).toEqual(null);
  });
  
});
