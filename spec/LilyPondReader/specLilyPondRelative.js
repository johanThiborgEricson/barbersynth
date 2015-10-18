describe("lilyPondRelative", function() {
  
  var readerStub;
  var relativeStep;
  beforeEach(function() {
    readerStub = LilyPondReader();
    readerStub.nearestInA440Minor = jasmine.createSpy("nearestInA440Minor")
    .and.returnValue("nearest in A440 minor");
    readerStub.lilyPondAbsolute = jasmine.createSpy("lilyPondAbsolute")
    .and.returnValue("start relative number");
    readerStub.octavChange = jasmine.createSpy("octavChange")
    .and.returnValue("changed octav");
    readerStub.as12toneScale = jasmine.createSpy("as12toneScale")
    .and.returnValue("as 12 tone scale");
    readerStub.addAccidentals = jasmine.createSpy("addAccidentals")
    .and.returnValue("accidentals added");
    relativeStep = readerStub.lilyPondRelative("initial tone name", 
    "initial octave string");
    relativeStep("supplied tone name", "supplied accidental string", 
    "supplied octave string");

  });
  
  // TODO: absolute expects toneNumber and octav down and up string
  it("calls lilyPondAbsolute with the startRelative", function() {
    expect(readerStub.lilyPondAbsolute)
    .toHaveBeenCalledWith("initial tone name", "initial octave string");
  });
  
  it("calls nearestInA440Minor with the startRelativeNumber returned by " + 
  "lilyPondAbsolute and the supplied tone name, the first time", function() {
    expect(readerStub.nearestInA440Minor)
    .toHaveBeenCalledWith("supplied tone name", "start relative number");
  });
  
  it("calls nearestInA440Minor with the return value of octavChange, the " + 
  "second time it is called", function() {
    relativeStep("supplied tone name");
    expect(readerStub.nearestInA440Minor)
    .toHaveBeenCalledWith("supplied tone name", "changed octav");
  });
  
  it("calls octavChange with the return value of nearestInA440Minor and " + 
  "the supplied octaveString", function() {
    expect(readerStub.octavChange)
    .toHaveBeenCalledWith("nearest in A440 minor", "supplied octave string");
  });
  
  it("calls as12toneScale with the return value of octavChange", function() {
    expect(readerStub.as12toneScale)
    .toHaveBeenCalledWith("changed octav");
  });
  
  it("calls addAccidentals with the return value of as12toneScale and the " + 
  "supplied accidental string", function() {
    expect(readerStub.addAccidentals)
    .toHaveBeenCalledWith("as 12 tone scale", "supplied accidental string");
  });
  
  it("returns the return value of addAccidentals", function() {
    expect(relativeStep()).toEqual("accidentals added");
  });
  
});
