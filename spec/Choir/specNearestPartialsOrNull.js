describe("(new Choir()).nearestPartialsOrNull(suggestedFundamental, notes)", 
function() {
  
  it("calls nearestPartial on each note in notes with suggestedFundamental",
  function(){
    var note0 = new Note();
    spyOn(note0, "nearestPartial");
    var note1 = new Note();
    spyOn(note1, "nearestPartial");
    var choir = new Choir();
    
    choir.nearestPartialsOrNull("suggested fundamental", [note0, note1]);
    
    expect(note0.nearestPartial).toHaveBeenCalledWith("suggested fundamental");
    expect(note1.nearestPartial).toHaveBeenCalledWith("suggested fundamental");
  });
  
  it("returns an array of the results from nearestPartial on each note, if " +
  "none is null", function() {
    var note0 = new Note();
    spyOn(note0, "nearestPartial").and.returnValue("partial 0");
    var note1 = new Note();
    spyOn(note1, "nearestPartial").and.returnValue("partial 1");
    var choir = new Choir();
    
    expect(choir.nearestPartialsOrNull("suggested fundamental", [note0, note1]))
    .toEqual(["partial 0", "partial 1"]);
  });
  
  it("returns null if any of nearestPartial returns null", function() {
    var note0 = new Note();
    spyOn(note0, "nearestPartial").and.returnValue("partial");
    var note1 = new Note();
    spyOn(note1, "nearestPartial").and.returnValue(0);
    var note2 = new Note();
    spyOn(note2, "nearestPartial").and.returnValue(null);
    var note3 = new Note();
    spyOn(note3, "nearestPartial").and.returnValue(0);
    var choir = new Choir();
    var notes = [note0, note1, note2, note3];
    
    expect(choir.nearestPartialsOrNull("suggested fundamental", notes)).toEqual(null);
  });
  
});
