describe("(new Choir()).asPartials(notes, lowestNote)", function() {
  
  var choir;
  var lowestNote;
  
  beforeEach(function() {
    lowestNote = new Note();
    choir = new Choir();
  });
  
  it("calls getSubPartial with 1 on lowestNote", function() {
    spyOn(lowestNote, "getSubPartial");
    spyOn(choir, "findClosePartials").and.returnValue("partials");
    
    choir.asPartials("notes", lowestNote);
    
    expect(lowestNote.getSubPartial).toHaveBeenCalledWith(1);
  });
  
  it("calls findClosePartials with the result of lowestNote" +
  ".getSubPartial(1) and notes", function() {
    spyOn(lowestNote, "getSubPartial").and.returnValue("sub partial 1");
    // undefined return value creates infinite loop
    spyOn(choir, "findClosePartials").and.returnValue(true);
    
    choir.asPartials("notes", lowestNote);
    
    expect(choir.findClosePartials)
    .toHaveBeenCalledWith("sub partial 1", "notes");
  });
  
  it("calls getSubPartial with 2 if findClosePartials fails the " +
  "first time", function() {
    spyOn(lowestNote, "getSubPartial");
    spyOn(choir, "findClosePartials").and.returnValues(false, true);
    
    choir.asPartials("notes", lowestNote);
    
    expect(lowestNote.getSubPartial).toHaveBeenCalledWith(2);
  });
  
});
