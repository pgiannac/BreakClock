let pomodoro = {
    started : false,
    minutes : 0,
    seconds : 0,
    fillerHeight : 0,
    fillerIncrement : 15,
    interval : null,
    hoursDom: null,
    minutesDom : null,
    secondsDom : null,
    fillerDom : null,
    init : function(){
      let self = this;
      this.hoursDom = document.querySelector('#hours');
      this.minutesDom = document.querySelector('#minutes');
      this.secondsDom = document.querySelector('#seconds');
      this.fillerDom = document.querySelector('#filler');
      this.interval = setInterval(function(){
        self.intervalCallback.apply(self);
      }, 1000);
      document.querySelector('#work').onclick = function(){
        self.startWork.apply(self);
      };
      document.querySelector('#shortBreak').onclick = function(){
        self.startShortBreak.apply(self);
      };
      document.querySelector('#longBreak').onclick = function(){
        self.startLongBreak.apply(self);
      };
      document.querySelector('#end').onclick = function(){
        self.stopTimer.apply(self);
      };
    },
    resetVariables : function(hours, mins, secs, started){
      this.hours = hours;
      this.minutes = mins;
      this.seconds = secs;
      this.started = started;
      this.fillerIncrement = 200/(this.minutes*60);
      this.fillerHeight = 0;  
    },
    startWork: function() {
      this.resetVariables(1,30, 0, true);
    },
    startShortBreak : function(){
      this.resetVariables(0,15, 0, true);
    },
    startLongBreak : function(){
      this.resetVariables(0,30, 0, true);
    },
    stopTimer : function(){
      this.resetVariables(0,0,0, false);
      this.updateDom();
    },
    toDoubleDigit : function(num){
      if(num < 10) {
        return "0" + parseInt(num, 10);
      }
      return num;
    },
    updateDom : function(){
      this.hoursDom.innerHTML = this.toDoubleDigit(this.hours);
      this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
      this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
      this.fillerHeight = this.fillerHeight + this.fillerIncrement;
      this.fillerDom.style.height = this.fillerHeight + 'px';
    },
    intervalCallback : function(){
      if(!this.started) return false;
      if(this.seconds == 0) {
        if(this.minutes == 0) {
          if(this.hours == 0) {
            this.timerComplete();
            return;
          }
          this.hours--;
          this.seconds =59;
          this.minutes =59;
        }
        this.seconds =59;
        this.minutes--;

      } else {
        this.seconds--;
      }
      this.updateDom();
    },
    timerComplete : function(){
      this.started = false;
      this.fillerHeight = 0;
    }
};
window.onload = function(){
  pomodoro.init();
};