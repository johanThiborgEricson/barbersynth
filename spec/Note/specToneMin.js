describe("Note().toneMin(other)", function() {
  
  it("returns this if it has lower tone than other, and other if it has a " + 
  "higher tone", 
  function() {
    var thisNote = Note(1);
    var other = Note(2);
    
    expect(thisNote.toneMin(other)).toBe(thisNote);
    thisNote = Note(3);
    expect(thisNote.toneMin(other)).toBe(other);
  });
  
});
