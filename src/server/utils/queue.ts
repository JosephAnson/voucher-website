export class Queue {
  running: boolean
  tasks: { task: (() => Promise<void>); timeout: number }[]

  constructor() {
    this.tasks = []
    this.running = false
  }

  enqueue(task: () => Promise<void>, { timeout = 0 } = {}) {
    this.tasks.push({ task, timeout })
    if (!this.running)
      this.run()
  }

  async run() {
    this.running = true
    while (this.tasks.length > 0) {
      const newTask = this.tasks.shift()
      if (newTask) {
        const { task, timeout } = newTask

        try {
          await task()
        }
        catch (error) {
          console.error('Error executing task:', error)
        }

        if (timeout > 0)
          await new Promise(resolve => setTimeout(resolve, timeout))
      }
    }
    this.running = false
  }
}
