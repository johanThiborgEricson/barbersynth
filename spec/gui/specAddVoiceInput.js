describe("(new Gui()).addVoiceInput(VoiceInput)", function() {
  it("inserts a text input before the Add Voice button.", function() {
    var gui = new Gui();
    var voiceInput = gui.VoiceInput();
    
    gui.addVoiceInput(voiceInput);
    var buttonElement = gui.addVoiceButton.element;
    var buttonIndex = Array.prototype.indexOf.call(
      gui.element.childNodes, buttonElement);
    var inputIndex = Array.prototype.indexOf.call(
      gui.element.childNodes, voiceInput.element);
      
    expect(gui.element.childNodes).toContain(voiceInput.element);
    expect(gui.element.childNodes).toContain(buttonElement);
    expect(inputIndex).toBeLessThan(buttonIndex);
    gui.player.audioCtx.close();
  });
  
  it("should be called from the constructor.", function() {
    spyOn(Gui.prototype, "addVoiceInput");
    
    var gui = new Gui();
    
    expect(Gui.prototype.addVoiceInput).toHaveBeenCalled();
    gui.player.audioCtx.close();
  });
});