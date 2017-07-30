describe("The Play just button", function() {
  it("when clicked, calls barbersynth with the content of the first " + 
  "Lily Pond string input and the player of the gui", function() {
    var player = new Player();
    spyOn(window, "Player").and.returnValue(player);
    var gui = new Gui();
    gui.voiceInputs[0].element.value = "lily pond string";
    spyOn(window, "barbersynth");
    
    var clickEvent = new MouseEvent("click");
    gui.playJust.dispatchEvent(clickEvent);
    
    expect(barbersynth).toHaveBeenCalledWith(["lily pond string"], player);
  });
  
  it("exists in the gui", function() {
    var gui = new Gui();
    
    expect(gui.element.children).toContain(gui.playJust);
    gui.player.audioCtx.close();
  });
  
  it("doesn't crash when clicked", function() {
    var gui = new Gui();
    gui.voiceInputs[0].element.value = "a4";
    
    var clickEvent = new MouseEvent("click");
    
    expect(function() {
      gui.playJust.dispatchEvent(clickEvent);
    }).not.toThrow();
    
  });
  
  it("calls barbersynth with each of the input values", function() {
    var player = new Player();
    spyOn(window, "Player").and.returnValue(player);
    var gui = new Gui();
    gui.voiceInputs[0].element.value = "lps1";
    gui.addVoiceInput(gui.VoiceInput());
    gui.voiceInputs[1].element.value = "lps2";
    spyOn(window, "barbersynth");
    
    var clickEvent = new MouseEvent("click");
    gui.playJust.dispatchEvent(clickEvent);
    
    expect(barbersynth).toHaveBeenCalledWith(["lps1", "lps2"], player);
  });
  
});