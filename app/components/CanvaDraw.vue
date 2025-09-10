<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  draw: boolean
}>()

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

function getCoordinates(event) {
  const rect = canvas.value.getBoundingClientRect()
  let clientX, clientY

  if (event.touches) {
    clientX = event.touches[0].clientX
    clientY = event.touches[0].clientY
  } else {
    clientX = event.clientX
    clientY = event.clientY
  }

  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  }
}

function startDrawing(event) {
  if (!props.draw && window.innerWidth < 768) return
  if (window.innerWidth < 768) {
    if (!props.draw) return
  }

  event.preventDefault() // No scroll on mobile
  isDrawing.value = true

  const coords = getCoordinates(event)
  lastX.value = coords.x
  lastY.value = coords.y
  points = [{ x: lastX.value, y: lastY.value }]
}

function draw(event) {
  // check the size of the screen
  if (window.innerWidth < 768) {
    if (!isDrawing.value || !props.draw) return
  } else {
    if (!isDrawing.value) return
  }

  event.preventDefault() // no scroll on mobile

  const coords = getCoordinates(event)
  const currentX = coords.x
  const currentY = coords.y

  // added the actual dots
  points.push({ x: currentX, y: currentY })

  const ctx = canvas.value.getContext('2d')
  ctx.globalAlpha = 1
  ctx.strokeStyle = '#FF5800'

  // Drawing in real time
  ctx.beginPath()
  ctx.moveTo(lastX.value, lastY.value)
  ctx.lineTo(currentX, currentY)
  ctx.stroke()

  // Save the sketch with all the dots
  drawings.value.push({
    points: [...points],
    timestamp: Date.now()
  })

  lastX.value = currentX
  lastY.value = currentY
}

function stopDrawing(event) {
  if (event) {
    event.preventDefault()
  }
  isDrawing.value = false
  points = []
}

// Clean the animpation when the component is destroyed
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
    class="w-full"
    style="height: calc(100vh - 80px);"
    :style="{ pointerEvents: draw ? 'auto' : 'none' }"
    @mousedown="startDrawing"
    @mousemove="draw"
    @mouseup="stopDrawing"
    @mouseleave="stopDrawing"
    @touchstart="startDrawing"
    @touchmove="draw"
    @touchend="stopDrawing"
    @touchcancel="stopDrawing"
  />
</template>

<style scoped>
canvas {
  touch-action: none;
}
</style>
