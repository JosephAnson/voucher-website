export class Queue {
  running: boolean
  tasks: (() => Promise<void>)[]

  constructor() {
    this.tasks = []
    this.running = false
  }

  enqueue(task: () => Promise<void>) {
    this.tasks.push(task)
    if (!this.running)
      this.run()
  }

  async run() {
    this.running = true
    while (this.tasks.length > 0) {
      const task = this.tasks.shift()
      if (task) {
        try {
          await task()
        }
        catch (error) {
          console.error('Error executing task:', error)
        }
      }
    }
    this.running = false
  }
}
