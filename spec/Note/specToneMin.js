describe("(new Note()).toneMin(other)", function() {
  
  it("returns this if it has lower tone than other, and other if it has a " + 
  "higher tone", 
  function() {
    var thisNote = new Note(1);
    var other = new Note(2);
    
    expect(thisNote.toneMin(other)).toBe(thisNote);
    thisNote = new Note(3);
    expect(thisNote.toneMin(other)).toBe(other);
  });
  
});
