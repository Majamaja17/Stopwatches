class Stopwatch {
  constructor(container) {
    this.container = container
    this.running = false;
    this.display = this.container.querySelector('.stopwatch');
    this.reset();
    this.print(this.times);
    this.build(this.container)
  }

  reset() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
  }

  print() {
    this.display.innerText = this.format(this.times);
  }

  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }

  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }

  stop() {
    this.running = false;
    clearInterval(this.watch);
  }

  build(container) {

    const startButton = container.getElementsByClassName('start');
    startButton[0].addEventListener('click', () => this.start());

    const stopButton = container.getElementsByClassName('stop');
    stopButton[0].addEventListener('click', () => {
      this.stop();
    });

    const resetButton = container.getElementsByClassName('reset');
    resetButton[0].addEventListener('click', () => {
      this.reset();
      this.print();
      this.stop();
    });

    const saveButton = container.getElementsByClassName('save');
    saveButton[0].addEventListener('click', () => {
      this.container.querySelector('.results').innerHTML += `<li>${this.display.textContent}</li>`;
    }); 

    const deleteButton = this.container.getElementsByClassName('delete');
    deleteButton[0].addEventListener('click', () => {
      this.container.querySelector('.results').innerHTML = " ";
    }); 
  }
}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

['.container', '.stopwatch_second'].forEach((selector) => {
    new Stopwatch(document.querySelector(selector))
})