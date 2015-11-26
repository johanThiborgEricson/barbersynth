describe("BarberSynthGui().createSongSelectorElement(lilyPonds, lilyPondsForm)", 
function() {
  
  var barberSynth = BarberSynthGui();
  
  it("sets _lilyPondFields to an array of n input-elements type text with " +
  "value lilyPondK", function() {
    var songSelector = barberSynth
        .createSongSelectorElement(["lily pond 1", "lily pond 2"]);
    var i = 1;
    songSelector._lilyPondFields.map(function(lilyPond) {
      expect(lilyPond instanceof HTMLInputElement).toBe(true);
      expect(lilyPond.type).toEqual("text");
      expect(lilyPond.value).toEqual("lily pond " + i++);
    });
    
  });
  
  describe("when clicked", function() {
    it("calls its onclick-method", function() {
      var songSelector = barberSynth
          .createSongSelectorElement([], document.createElement("FORM"));
      spyOn(songSelector, "onclick");
      
      songSelector.dispatchEvent(new MouseEvent("click"));
      
      expect(songSelector.onclick).toHaveBeenCalled();
    });
    
    it("removes all children of lilyPondsForm", function() {
      var lilyPondsForm = document.createElement("FORM");
      lilyPondsForm.appendChild(document.createElement("INPUT"));
      lilyPondsForm.appendChild(document.createElement("INPUT"));
      var songSelector = barberSynth
          .createSongSelectorElement([], lilyPondsForm);
      
      expect(lilyPondsForm.firstChild).toBeTruthy();
      songSelector.dispatchEvent(new MouseEvent("click"));
      
      expect(lilyPondsForm.firstChild).toBeFalsy();
    });
    
    it("adds each element in _lilyPondFields to lilyPondsForm", function() {
      var lilyPondsForm = document.createElement("FORM");
      var songSelector = barberSynth
          .createSongSelectorElement([], lilyPondsForm);
      var input1 = document.createElement("INPUT");
      var input2 = document.createElement("INPUT");
      expect(songSelector._lilyPondFields).toBeDefined();
      songSelector._lilyPondFields = [input1, input2];
      
      songSelector.dispatchEvent(new MouseEvent("click"));
      
      expect(lilyPondsForm.firstChild).toBe(input1);
      expect(lilyPondsForm.lastChild).toBe(input2);
    });
    
  });
  
});
