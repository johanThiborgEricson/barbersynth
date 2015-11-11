describe("Choir().getFrequencies(notes)", function() {
  
  var choir;
  var lowestNote;
  
  beforeEach(function() {
    choir = Choir();
    lowestNote = Note();
    spyOn(choir, "lowest").and.returnValue(lowestNote);
  });
  
  it("calls lowest with notes", function() {
    var notes = [Note()];
    choir.getFrequencies(notes);
    expect(choir.lowest).toHaveBeenCalledWith(notes);
  });
  
  it("calls getSubPartial with 1 on the lowest note", function() {
    spyOn(lowestNote, "getSubPartial");
    choir.getFrequencies();
    expect(lowestNote.getSubPartial).toHaveBeenCalledWith(1);
  });
  
});
