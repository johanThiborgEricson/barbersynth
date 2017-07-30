describe("(new Gui()).appendGui()", function(){
  var gui;
  
  beforeEach(function() {
    gui = new Gui();
  });
  
  afterEach(function() {
    gui.player.audioCtx.close();
  });
  
  it("appends Gui.element to body's children", function() {
    
    var element = document.createElement("div");
    gui.element = element;
    
    gui.appendGui();
    
    expect(document.body.lastChild).toBe(element);
  });
  
  it("doesn't crach", function() {
    gui.appendGui();
  });
  
  afterEach(function() {
    document.body.removeChild(gui.element);
    expect(document.body.lastChild).not.toBe(gui.element);
  });
});