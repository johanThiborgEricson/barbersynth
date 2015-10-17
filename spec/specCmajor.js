describe("cMajor", function() {
  var readerStub;
  beforeEach(function() {
    readerStub = LilyPondReader();
  });
  
  xit("returns 0 for c, 1 for d, 2 for e, and so on", function() {
    var expected = [0, 1, 2, 3, 4, 5, 6];
    var input = ["c", "d", "e", "f", "g", "a", "b"];
    expected.map(function(i) {
      expect(readerStub.cMajor(input[i], "", "")).toBe(i);
    });
  });
  
  xit("changes the octav and returns the result", function(){
    readerStub.octaveChange = jasmine.createSpy("octaveChange")
    .and.returnValue("changed octave");
    expect(readerStub.cMajor("c", "octave string"))
    .toBe("changed octave");
    expect(readerStub.octavChange).toHaveBeenCalledWith(0, "octave string");
  });
  
});
