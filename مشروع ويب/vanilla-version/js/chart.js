// Chart utilities and advanced chart functionality
class SimpleChart {
  constructor(canvas, options = {}) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.options = {
      padding: 40,
      gridColor: "#e5e7eb",
      lineColor: "#9333ea",
      pointColor: "#9333ea",
      textColor: "#6b7280",
      font: "12px Cairo",
      ...options,
    }
    this.data = []
    this.labels = []
  }

  setData(data, labels = []) {
    this.data = data
    this.labels = labels
    this.draw()
  }

  draw() {
    const { width, height } = this.canvas
    const { padding } = this.options

    this.clear()
    this.drawGrid()
    this.drawLine()
    this.drawPoints()
    this.drawLabels()
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  drawGrid() {
    const { width, height } = this.canvas
    const { padding, gridColor } = this.options

    this.ctx.strokeStyle = gridColor
    this.ctx.lineWidth = 1

    // Horizontal lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i * (height - 2 * padding)) / 5
      this.ctx.beginPath()
      this.ctx.moveTo(padding, y)
      this.ctx.lineTo(width - padding, y)
      this.ctx.stroke()
    }

    // Vertical lines
    for (let i = 0; i <= 6; i++) {
      const x = padding + (i * (width - 2 * padding)) / 6
      this.ctx.beginPath()
      this.ctx.moveTo(x, padding)
      this.ctx.lineTo(x, height - padding)
      this.ctx.stroke()
    }
  }

  drawLine() {
    if (this.data.length === 0) return

    const { width, height } = this.canvas
    const { padding, lineColor } = this.options
    const maxValue = Math.max(...this.data)

    this.ctx.strokeStyle = lineColor
    this.ctx.lineWidth = 3
    this.ctx.beginPath()

    this.data.forEach((value, index) => {
      const x = padding + (index * (width - 2 * padding)) / (this.data.length - 1)
      const y = height - padding - (value / maxValue) * (height - 2 * padding)

      if (index === 0) {
        this.ctx.moveTo(x, y)
      } else {
        this.ctx.lineTo(x, y)
      }
    })

    this.ctx.stroke()
  }

  drawPoints() {
    if (this.data.length === 0) return

    const { width, height } = this.canvas
    const { padding, pointColor } = this.options
    const maxValue = Math.max(...this.data)

    this.ctx.fillStyle = pointColor

    this.data.forEach((value, index) => {
      const x = padding + (index * (width - 2 * padding)) / (this.data.length - 1)
      const y = height - padding - (value / maxValue) * (height - 2 * padding)

      this.ctx.beginPath()
      this.ctx.arc(x, y, 4, 0, 2 * Math.PI)
      this.ctx.fill()
    })
  }

  drawLabels() {
    if (this.data.length === 0) return

    const { width, height } = this.canvas
    const { padding, textColor, font } = this.options
    const maxValue = Math.max(...this.data)

    this.ctx.fillStyle = textColor
    this.ctx.font = font
    this.ctx.textAlign = "center"

    // Y-axis labels
    for (let i = 0; i <= 5; i++) {
      const value = (maxValue * (5 - i)) / 5
      const y = padding + (i * (height - 2 * padding)) / 5
      this.ctx.fillText(Math.round(value).toLocaleString(), 20, y + 4)
    }

    // X-axis labels
    if (this.labels.length > 0) {
      this.labels.forEach((label, index) => {
        const x = padding + (index * (width - 2 * padding)) / (this.labels.length - 1)
        this.ctx.fillText(label, x, height - 10)
      })
    }
  }

  animate(duration = 1000) {
    const startTime = performance.now()
    const originalData = [...this.data]

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Animate data points
      this.data = originalData.map((value) => value * progress)
      this.draw()

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        this.data = originalData
        this.draw()
      }
    }

    requestAnimationFrame(animate)
  }
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = SimpleChart
}
