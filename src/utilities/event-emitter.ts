export type EventCallback<T = any> = (data: T) => void;

class EventEmitter {
  private events: { [key: string]: EventCallback[] };

  constructor() {
    this.events = {};
  }

  on<T = any>(event: string, listener: EventCallback<T>): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener as EventCallback);

    console.log("this.events", this.events);
  }

  emit<T = any>(event: string, data: T): void {
    const listeners = this.events[event];
    console.log(data);
    if (listeners) {

      console.log("listeners", listeners);
      listeners.forEach((listener) => listener(data));
    }
  }

  off(event: string): void {
    delete this.events[event];
  }
  
}

export default EventEmitter;

export const eventEmitter = new EventEmitter();