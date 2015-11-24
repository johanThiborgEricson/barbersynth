describe("Song(theTitle, [lilyPond1, ... , lilyPondN])", function() {
  
  it("sets _radio to a new input-element with type 'radio' and name 'title'", 
  function() {
    var song = Song("", []);
    var radio = song._radio;
    expect(radio instanceof HTMLInputElement).toBe(true);
    expect(radio.type).toEqual("radio");
    expect(radio.name).toEqual("title");
  });
    
  it("sets _label to a new text-node with data theTitle", function() {
    var song = Song("the title", []);
    expect(song._label instanceof Text).toBe(true);
    expect(song._label.data).toEqual("the title");
  });
  
  it("sets _lilyPonds to an array of n input-elements type text with value " +
  "lilyPondK", function() {
    var song = Song("", ["lily pond 1", "lily pond 2"]);
    var i = 1;
    song._lilyPonds.map(function(lilyPond) {
      expect(lilyPond instanceof HTMLInputElement).toBe(true);
      expect(lilyPond.type).toEqual("text");
      expect(lilyPond.value).toEqual("lily pond " + i++);
    });
    
  });
    
});
