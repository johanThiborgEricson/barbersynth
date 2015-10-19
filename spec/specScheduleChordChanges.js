describe("scheduleChordChanges", function(){
  
  it("calls advanceStartTime", function(){
    var barberStub = Barbersynth([]);
    spyOn(barberStub, "advanceStartTime").and
    .returnValues({value: "start time"}, {done: true});
    barberStub.scheduleChordChanges();
    expect(barberStub.advanceStartTime).toHaveBeenCalled();
  });
  
  it("calls computeBaseToneAndPartials()", function() {
    var barberStub = Barbersynth([]);
    spyOn(barberStub, "computeBaseToneAndPartials");
    spyOn(barberStub, "advanceStartTime").and
    .returnValues({value: "start time"}, {done: true});
    barberStub.scheduleChordChanges();
    expect(barberStub.computeBaseToneAndPartials).toHaveBeenCalled();
  });
  
  it("calls the scheduleToneChange method of each voice from the constructor " +
  "with the result of advanceStartTime", function() {
    var voice1 = Voice();
    spyOn(voice1, "scheduleToneChange");
    var voice2 = Voice();
    spyOn(voice2, "scheduleToneChange");
    var barberStub = Barbersynth([voice1, voice2]);
    spyOn(barberStub, "advanceStartTime").and
    .returnValues({value: "start time"}, {done: true});
    barberStub.scheduleChordChanges();
    expect(voice1.scheduleToneChange).toHaveBeenCalledWith("start time");
    expect(voice2.scheduleToneChange).toHaveBeenCalledWith("start time");
  });
  
  it("continues while advanceStartTime().done is false", function() {
    var voice = Voice();
    spyOn(voice, "scheduleToneChange");
    var barberStub = Barbersynth([voice]);
    spyOn(barberStub, "advanceStartTime").and
    .returnValues({value: 0}, {done: false, value: 1}, {value: 2, done: true});
    barberStub.scheduleChordChanges();
    expect(voice.scheduleToneChange).toHaveBeenCalledWith(0);
    expect(voice.scheduleToneChange).toHaveBeenCalledWith(1);
    expect(voice.scheduleToneChange).not.toHaveBeenCalledWith(2);
    
  });
  
});
