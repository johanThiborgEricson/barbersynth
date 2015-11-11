describe("Choir().getFrequencies(notes, lowestNote)", function() {
  
  var choir;
  var lowestNote;
  
  beforeEach(function() {
    lowestNote = Note();
    choir = Choir();
  });
  
  it("calls getSubPartial with 1 on lowestNote", function() {
    spyOn(lowestNote, "getSubPartial");
    spyOn(choir, "nearestPartialsOrNull").and.returnValue("partials");
    choir.getFrequencies("notes", lowestNote);
    expect(lowestNote.getSubPartial).toHaveBeenCalledWith(1);
  });
  
  it("calls nearestPartialsOrNull with the result of lowestNote" +
  ".getSubPartial(1) and notes", function() {
    spyOn(lowestNote, "getSubPartial").and.returnValue("sub partial 1");
    spyOn(choir, "nearestPartialsOrNull").and.returnValue("partials");
    choir.getFrequencies("notes", lowestNote);
    expect(choir.nearestPartialsOrNull)
    .toHaveBeenCalledWith("sub partial 1", "notes");
  });
  
  it("calls getSubPartial with 2 if nearestPartialsOrNull returns null the " +
  "first time", function() {
    spyOn(lowestNote, "getSubPartial");
    spyOn(choir, "nearestPartialsOrNull").and.returnValues(null, "partials");
    choir.getFrequencies("notes", lowestNote);
    expect(lowestNote.getSubPartial).toHaveBeenCalledWith(2);
  });
  
  it("calls nearestPartialsOrNull until it returns partials, and then returns" +
  "partials without calling it anymore", function() {
    spyOn(choir, "nearestPartialsOrNull").and
    .returnValues(null, null, "partials", "over-specified partials");
    expect(choir.getFrequencies("notes", lowestNote)).toBe("partials");
    expect(choir.nearestPartialsOrNull.calls.count()).toBe(3);
  });
  
});
