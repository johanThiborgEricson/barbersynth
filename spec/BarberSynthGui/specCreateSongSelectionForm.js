describe("BarberSynthGui().createSongSelectionForm(songs, lilyPondsForm)", 
function() {
  
  var barberSynthGui = BarberSynthGui();
  var elem = document.createElement("INPUT");

  it("calls createSongSelectionFragment with the title and lilyPonds of " +
  "each song and lilyPondsForm", function() {
    spyOn(barberSynthGui, "createSongSelectionFragment").and.returnValue(elem);
    var songs = [["title 1", "lily ponds 1"], ["title 2", "lily ponds 2"]];
    
    barberSynthGui.createSongSelectionForm(songs, "lily ponds form");
    
    expect(barberSynthGui.createSongSelectionFragment)
        .toHaveBeenCalledWith("title 1", "lily ponds 1", "lily ponds form");
    expect(barberSynthGui.createSongSelectionFragment)
        .toHaveBeenCalledWith("title 2", "lily ponds 2", "lily ponds form");
  });
  
  it("appends the result of createSongSelectionFragment to the result", 
  function() {
    var elem1 = document.createElement("INPUT");
    var elem2 = document.createElement("INPUT");
    spyOn(barberSynthGui, "createSongSelectionFragment").and
        .returnValues(elem1, elem2);
    var songs = [["title 1", "lily ponds 1"], ["title 2", "lily ponds 2"]];
    
    var selectionForm = barberSynthGui
        .createSongSelectionForm(songs, "lily ponds form");
    
    expect(selectionForm.firstChild).toBe(elem1);
    expect(selectionForm.lastChild).toBe(elem2);
  });
  
});
