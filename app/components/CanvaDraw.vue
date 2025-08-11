<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
const isDrawing = ref(false)
const lastX = ref(0)
const lastY = ref(0)
const drawings = ref([])
let animationFrameId = null
let points = []

onMounted(() => {
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  const ctx = canvas.value.getContext('2d')
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.lineWidth = 5
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  // Démarrer l'animation
  animate()
})

const resizeCanvas = () => {
  if (canvas.value) {
    const rect = canvas.value.getBoundingClientRect()
    canvas.value.width = rect.width
    canvas.value.height = rect.height
  }
}


function animate() {
  const ctx = canvas.value.getContext('2d')
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  const now = Date.now()
  drawings.value = drawings.value.filter(drawing => {
    const age = now - drawing.timestamp
    if (age < 5000) {
      const opacity = 1 - (age / 5000)
      ctx.globalAlpha = opacity
      ctx.strokeStyle = '#FF5800'

      // Dessiner le trait avec interpolation
      ctx.beginPath()
      ctx.moveTo(drawing.points[0].x, drawing.points[0].y)

      for (let i = 1; i < drawing.points.length; i++) {
        const xc = (drawing.points[i].x + drawing.points[i - 1].x) / 2
        const yc = (drawing.points[i].y + drawing.points[i - 1].y) / 2
        ctx.quadraticCurveTo(drawing.points[i - 1].x, drawing.points[i - 1].y, xc, yc)
      }

      ctx.stroke()
      return true
    }
    return false
  })

  ctx.globalAlpha = 1
  animationFrameId = requestAnimationFrame(animate)
}

function startDrawing(event) {
  isDrawing.value = true
  const rect = canvas.value.getBoundingClientRect()
  lastX.value = event.clientX - rect.left
  lastY.value = event.clientY - rect.top
  points = [{ x: lastX.value, y: lastY.value }]
}

function draw(event) {
  if (!isDrawing.value) return

  const rect = canvas.value.getBoundingClientRect()
  const currentX = event.clientX - rect.left
  const currentY = event.clientY - rect.top

  // Ajouter le point actuel
  points.push({ x: currentX, y: currentY })

  const ctx = canvas.value.getContext('2d')
  ctx.globalAlpha = 1
  ctx.strokeStyle = '#FF5800'

  // Dessiner le trait en temps réel
  ctx.beginPath()
  ctx.moveTo(lastX.value, lastY.value)
  ctx.lineTo(currentX, currentY)
  ctx.stroke()

  // Sauvegarder le dessin avec tous les points
  drawings.value.push({
    points: [...points],
    timestamp: Date.now()
  })

  lastX.value = currentX
  lastY.value = currentY
}

function stopDrawing() {
  isDrawing.value = false
  points = []
}

// Nettoyer l'animation lors de la destruction du composant
onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<template>
  <canvas
    ref="canvas"
    class="border-1 border-[#FF5800] rounded-lg w-full"
    style="height: calc(100vh - 80px);"

    @mousedown="startDrawing"
    @mousemove="draw"
    @mouseup="stopDrawing"
    @mouseleave="stopDrawing"
  />
</template>

<style scoped>
canvas {
  touch-action: none;
}
</style>
