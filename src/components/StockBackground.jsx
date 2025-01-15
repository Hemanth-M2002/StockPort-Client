import { useEffect, useRef } from 'react'

const StockBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const candlesticks = []
    const lines = []

    // Initialize candlesticks
    for (let i = 0; i < 50; i++) {
      candlesticks.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: Math.random() * 10 + 2,
        height: Math.random() * 50 + 10,
        color: Math.random() > 0.5 ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)'
      })
    }

    // Initialize lines
    for (let i = 0; i < 20; i++) {
      lines.push({
        startX: Math.random() * canvas.width,
        startY: Math.random() * canvas.height,
        endX: Math.random() * canvas.width,
        endY: Math.random() * canvas.height,
        color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1)`
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Animate candlesticks
      candlesticks.forEach(candlestick => {
        ctx.fillStyle = candlestick.color
        ctx.fillRect(candlestick.x, candlestick.y, candlestick.width, candlestick.height)

        candlestick.y -= 0.5
        if (candlestick.y + candlestick.height < 0) {
          candlestick.y = canvas.height
          candlestick.x = Math.random() * canvas.width
        }
      })

      // Animate lines
      lines.forEach(line => {
        ctx.beginPath()
        ctx.moveTo(line.startX, line.startY)
        ctx.lineTo(line.endX, line.endY)
        ctx.strokeStyle = line.color
        ctx.stroke()

        line.startY -= 0.2
        line.endY -= 0.2
        if (line.startY < 0 && line.endY < 0) {
          line.startY = canvas.height
          line.endY = canvas.height + Math.random() * 100
          line.startX = Math.random() * canvas.width
          line.endX = Math.random() * canvas.width
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
}

export default StockBackground
