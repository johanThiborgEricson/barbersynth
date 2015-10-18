describe("nearestInAminor", function() {
  xit("returns the same scale-step if it is the same tone", function() {
    var readerStub = LilyPondReader();
    var toneNames = ["a", "b", "c", "d", "e", "f", "g"];
    [0, 1, 2, 3, 4, 5, 6].map(function(i) {
      expect(readerStub.nearestInA440Minor(toneNames[i], i)).toBe(i);
    });
    
  });
    
  it("dummy", function() {
    var readerStub = LilyPondReader();
    expect(readerStub.nearestInA440Minor("a", 0)).toBe(0);
  });
  
  it("dummy2", function() {
    var readerStub = LilyPondReader();
    expect(readerStub.nearestInA440Minor("b", 0)).toBe(1);
  });
  
  it("dummy3", function() {
    var readerStub = LilyPondReader();
    expect(readerStub.nearestInA440Minor("b", 1)).toBe(1);
  });
  
  it("takes a tone as a number of A minor scale steps from concert pitch A " + 
  "and a name of a tone and returns the nearest tone with that name as a " + 
  "number of A minor scale steps from concert pitch A (440 Hz)", function() {
    var readerStub = LilyPondReader();
    var toneNames = ["a", "b", "c", "d", "e", "f", "g"];
    var oldA440MinorScaleSteps = 0;
    var modulo7 = function(a) {
      return (((a)%7)+7)%7;
    };
    
    [-14, -6, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8].map(function(prev) {
      [0, 1, 2, 3, 4, 5, 6].map(function(cur) {
        var steps = modulo7(cur-prev+3)-3;
        var expected = prev + steps;
        expect(readerStub.nearestInA440Minor(toneNames[cur], prev)).toBe(expected);
      });
      
    });
    
  });
  
});
