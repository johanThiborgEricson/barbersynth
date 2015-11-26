describe("BarberSynthGui()" +
".createSongSelectionElement(lilyPonds, lilyPondsForm)", 
function() {
  
  var barberSynth = BarberSynthGui();
  
  it("sets _lilyPondFields to an array of n input-elements type text with " +
  "value lilyPondK", function() {
    var songSelection = barberSynth
        .createSongSelectionElement(["lily pond 1", "lily pond 2"]);
    var i = 1;
    songSelection._lilyPondFields.map(function(lilyPond) {
      expect(lilyPond instanceof HTMLInputElement).toBe(true);
      expect(lilyPond.type).toEqual("text");
      expect(lilyPond.value).toEqual("lily pond " + i++);
    });
    
  });
  
  describe("when clicked", function() {
    it("calls its onclick-method", function() {
      var songSelection = barberSynth
          .createSongSelectionElement([], document.createElement("FORM"));
      spyOn(songSelection, "onclick");
      
      songSelection.dispatchEvent(new MouseEvent("click"));
      
      expect(songSelection.onclick).toHaveBeenCalled();
    });
    
    it("removes all children of lilyPondsForm", function() {
      var lilyPondsForm = document.createElement("FORM");
      lilyPondsForm.appendChild(document.createElement("INPUT"));
      lilyPondsForm.appendChild(document.createElement("INPUT"));
      var songSelection = barberSynth
          .createSongSelectionElement([], lilyPondsForm);
      
      expect(lilyPondsForm.firstChild).toBeTruthy();
      songSelection.dispatchEvent(new MouseEvent("click"));
      
      expect(lilyPondsForm.firstChild).toBeFalsy();
    });
    
    it("adds each element in _lilyPondFields to lilyPondsForm", function() {
      var lilyPondsForm = document.createElement("FORM");
      var songSelection = barberSynth
          .createSongSelectionElement([], lilyPondsForm);
      var input1 = document.createElement("INPUT");
      var input2 = document.createElement("INPUT");
      expect(songSelection._lilyPondFields).toBeDefined();
      songSelection._lilyPondFields = [input1, input2];
      
      songSelection.dispatchEvent(new MouseEvent("click"));
      
      expect(lilyPondsForm.firstChild).toBe(input1);
      expect(lilyPondsForm.lastChild).toBe(input2);
    });
    
  });
  
});
