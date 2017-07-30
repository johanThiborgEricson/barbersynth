describe("The Add voice button, when clicked,", function(){
  it("calls addVoiceInput()", function() {
    var gui = new Gui();
    spyOn(gui, "addVoiceInput");
    
    var clickEvent = new MouseEvent("click");
    gui.addVoiceButton.element.dispatchEvent(clickEvent);
    
    expect(gui.addVoiceInput).toHaveBeenCalled();
    gui.player.audioCtx.close();
  });
});