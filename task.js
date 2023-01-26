class AlarmClock {
    constructor(){
        this.alarmCollection = [];
        this.timerId = null;
    }

    addClock (time, callback, id){
        if( typeof id === "undefined"){
            throw new Error("error text");
        }else if(
          typeof this.alarmCollection.find((clock) => clock.id === id) !== "undefined"){
            return console.error('Будильник уже существует');
        }
        this.alarmCollection.push({id, time, callback})

    }

    removeClock(id){
        let currentLenght = this.alarmCollection.length;
        this.alarmCollection = this.alarmCollection.filter((clock) => clock.id !== id);
        let newLenght = this.alarmCollection.length;
        return currentLenght > newLenght;
    }
  
    getCurrentFormattedTime(){
        return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    
    start(){
        let checkClock = (clock) => {
            if (this.getCurrentFormattedTime() === clock.time){
                clock.callback();
            } 
        }
        if (this.timerId === null) {
            this.timerId = setInterval(() => {
              this.alarmCollection.forEach((clock) => checkClock(clock));
            }, 2000);
          }
    }
    
    stop(){
        if(this.timerId !== null){
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    printAlarms(){
       return this.alarmCollection.forEach(
        (clock) => {console.log(`Номер будильника: ${clock.id}, Время звонка: ${clock.time}`)});
    }
    
    clearAlarms(){
        this.stop();
        this.alarmCollection = [];
    }
}

function testCase (){
    let alarmClock = new AlarmClock();
    alarmClock.addClock("8:30", () => console.log("Понидельник", 1));
    alarmClock.addClock("8:31", () => console.log("Дай учится", 2));
    alarmClock.removeClock(2);
    alarmClock.addClock("8:32", () => console.log("Вот и снова", 3));
    alarmClock.stop();
    alarmClock.printAlarms();
    alarmClock.start();
    alarmClock.clearAlarms();
    alarmClock.printAlarms();
}

