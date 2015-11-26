describe("BarberSynthGui().createMainElement(songs)", function() {
  
  var barberSynthGui;
  
  beforeEach(function() {
    barberSynthGui = BarberSynthGui();
  });
  
  it("calls createLilyPondsForm and calls createSongSelectionForm with " +
  "songs and the result", function() {
    var lilyPondsForm = document.createTextNode("lily ponds form");
    spyOn(barberSynthGui, "createLilyPondsForm").and.returnValue(lilyPondsForm);
    spyOn(barberSynthGui, "createSongSelectionForm").and.callThrough();
    
    barberSynthGui.createMainElement("songs");
    
    expect(barberSynthGui.createLilyPondsForm).toHaveBeenCalled();
    expect(barberSynthGui.createSongSelectionForm)
        .toHaveBeenCalledWith("songs", lilyPondsForm);
  });
  
  it("appends the results of create{.*}Form to the result", function() {
    var lilyPondsForm = document.createElement("FORM");
    lilyPondsForm.id = "lilyPondsForm";
    var songSelectionForm = document.createElement("FORM");
    songSelectionForm.id = "songSelectionForm";
    spyOn(barberSynthGui, "createLilyPondsForm").and.returnValue(lilyPondsForm);
    spyOn(barberSynthGui, "createSongSelectionForm").and
        .returnValue(songSelectionForm);
    
    var mainElement = barberSynthGui.createMainElement();
    
    expect(mainElement.querySelector("#songSelectionForm"))
        .toBe(songSelectionForm);
    expect(mainElement.querySelector("#lilyPondsForm"))
        .toBe(lilyPondsForm);
  });
  
});
