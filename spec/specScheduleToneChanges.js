describe("scheduleToneChanges", function(){
  
  it("calls advanceStartTime", function(){
    var barberStub = Barbersynth([]);
    spyOn(barberStub, "advanceStartTime");
    barberStub.scheduleToneChanges();
    expect(barberStub.advanceStartTime).toHaveBeenCalled();
  });
  
  it("calls computeBaseToneAndPartials()", function() {
    var barberStub = Barbersynth([]);
    spyOn(barberStub, "computeBaseToneAndPartials");
    barberStub.scheduleToneChanges();
    expect(barberStub.computeBaseToneAndPartials).toHaveBeenCalled();
  });
  
  it("calls the scheduleToneChange method of each voice from the constructor " +
  "with the result of nextStartTime", function() {
    var voice1 = jasmine.createSpyObj("voice1", ["scheduleToneChange"]);
    var voice2 = jasmine.createSpyObj("voice2", ["scheduleToneChange"]);
    var barberStub = Barbersynth([voice1, voice2]);
    spyOn(barberStub, "advanceStartTime").and.returnValue("start time");
    barberStub.scheduleToneChanges();
    expect(voice1.scheduleToneChange).toHaveBeenCalledWith("start time");
    expect(voice2.scheduleToneChange).toHaveBeenCalledWith("start time");
  });
  
  xit("doesn't make heavy computations between computeStartTime and scheduling");
});
