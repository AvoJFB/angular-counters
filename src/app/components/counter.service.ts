export class CounterService {
  counters = [
    {
      title: 'Dogs',
      value: 0,
    },
    {
      title: 'Cats',
      value: 0,
    },
    {
      title: 'Pigs',
      value: 0,
    },
  ];

  getCounters() {
    return this.counters;
  }

  incrementCounter(counter) {
    counter.value += 1;
  }

  decrementCounter(counter) {
    counter.value -= 1;
  }

  createCounter(title) {
    this.counters.push({
      title,
      value: 0
    });
  }

  deleteCounter(counter) {
    const index = this.counters.indexOf(counter);

    if (index > -1) {
      this.counters.splice(index, 1);
    }
  }
}
