describe("naturalScaleSteps", function() {
  
  // I don't know why I felt safer copying seven [].map(function):S than copying
  // seven for(i = 0; i < 7; i++){}:s. I hope it's readable.
  it("returns the positive or negative scale steps between two tones that is " + 
  "smaller than a fifth, accidentals disregarded", function() {
    var readerStub = LilyPondReader();
    var scaleTones = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    var is = [0, 1, 2, 3, 4, 5, 6];
    
    // prime returns 0
    is.map(function(i) {
      var actual = readerStub.naturalScaleSteps(scaleTones[i], scaleTones[i]);
      expect(actual).toBe(0);
    });
    
    // second returns 1 (one scale step up)
    is.map(function(i) {
      var second = scaleTones[(i+1)%7];
      var actual = readerStub.naturalScaleSteps(scaleTones[i], second);
      expect(actual).toBe(1);
    });

    // third returns 2 (two scale steps up)
    is.map(function(i) {
      var third = scaleTones[(i+2)%7];
      var actual = readerStub.naturalScaleSteps(scaleTones[i], third);
      expect(actual).toBe(2);
    });

    // fourth returns 3 (three scale steps up)
    is.map(function(i) {
      var fourth = scaleTones[(i+3)%7];
      var actual = readerStub.naturalScaleSteps(scaleTones[i], fourth);
      expect(actual).toBe(3);
    });
    
    // fifth returns -3 (three scale steps (a fourth) down)
    is.map(function(i) {
      var fifth = scaleTones[(i+4)%7];
      var actual = readerStub.naturalScaleSteps(scaleTones[i], fifth);
      expect(actual).toBe(-3);
    });

    // sixth returns -2 (two scale steps (a third) down)
    is.map(function(i) {
      var sixth = scaleTones[(i+5)%7];
      var actual = readerStub.naturalScaleSteps(scaleTones[i], sixth);
      expect(actual).toBe(-2);
    });

    // seventh returns -1 (one scale step (a second) down)
    is.map(function(i) {
      var seventh = scaleTones[(i+6)%7];
      var actual = readerStub.naturalScaleSteps(scaleTones[i], seventh);
      expect(actual).toBe(-1);
    });

  });
  
});
