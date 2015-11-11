describe("Choir().nearestPartialsOrNull(suggestedF0, notes)", function() {
  
  it("calls nearestPartial on each note in notes with suggestedF0", function(){
    var note0 = Note();
    spyOn(note0, "nearestPartial");
    var note1 = Note();
    spyOn(note1, "nearestPartial");
    var choir = Choir();
    
    choir.nearestPartialsOrNull("suggested f0", [note0, note1]);
    
    expect(note0.nearestPartial).toHaveBeenCalledWith("suggested f0");
    expect(note1.nearestPartial).toHaveBeenCalledWith("suggested f0");
  });
  
  it("returns an array of the results from nearestPartial on each note, if " +
  "none is null", function() {
    var note0 = Note();
    spyOn(note0, "nearestPartial").and.returnValue("partial 0");
    var note1 = Note();
    spyOn(note1, "nearestPartial").and.returnValue("partial 1");
    var choir = Choir();
    
    expect(choir.nearestPartialsOrNull("suggested f0", [note0, note1]))
    .toEqual(["partial 0", "partial 1"]);
  });
  
  it("returns null if any of nearestPartial returns null", function() {
    var note0 = Note();
    spyOn(note0, "nearestPartial").and.returnValue("partial");
    var note1 = Note();
    spyOn(note1, "nearestPartial").and.returnValue(0);
    var note2 = Note();
    spyOn(note2, "nearestPartial").and.returnValue(null);
    var note3 = Note();
    spyOn(note3, "nearestPartial").and.returnValue(0);
    var choir = Choir();
    var notes = [note0, note1, note2, note3];
    
    expect(choir.nearestPartialsOrNull("suggested f0", notes)).toEqual(null);
  });
  
});
