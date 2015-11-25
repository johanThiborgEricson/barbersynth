describe("SongSelectorElement()", function() {
  
  it("registers eventListener to listen for clicks on it", function() {
    var songSelectorElement = SongSelectorElement();
    spyOn(songSelectorElement.eventListener, "handleEvent");
    expect(songSelectorElement.eventListener.handleEvent)
    .not.toHaveBeenCalled();
    
    songSelectorElement.dispatchEvent(new MouseEvent("click"));
    
    expect(songSelectorElement.eventListener.handleEvent).toHaveBeenCalled();
  });
  
  it("calls SongSelectorElement.EventListener with its arguments", function() {
    spyOn(SongSelectorElement, "EventListener");
    var songSelectorElement = SongSelectorElement("its", "arguments");
    expect(SongSelectorElement.EventListener)
    .toHaveBeenCalledWith("its", "arguments");
  });
  
});