<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps<{
  draw: boolean
}>()

const canvas = ref(null)
const canvasContainer = ref(null)
const isDrawing = ref(false)
const lastX = ref(0)
const lastY = ref(0)
const drawings = ref([])
const cursorX = ref(0)
const cursorY = ref(0)
const isCursorVisible = ref(false)
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

function updateCursor(event) {
  if (!canvasContainer.value) return
  const rect = canvasContainer.value.getBoundingClientRect()
  cursorX.value = event.clientX - rect.left
  cursorY.value = event.clientY - rect.top
  isCursorVisible.value = true
}

function hideCursor() {
  isCursorVisible.value = false
}

const shouldShowCursor = computed(() => {
  if (typeof window === 'undefined') return isCursorVisible.value
  // Sur desktop (>= 768px), le dessin est toujours actif, donc on affiche le curseur
  // Sur mobile, on affiche le curseur seulement si draw est true
  const isDesktop = window.innerWidth >= 768
  return isCursorVisible.value && (isDesktop || props.draw)
})

const canvasPointerEvents = computed(() => {
  if (typeof window === 'undefined') return props.draw ? 'auto' : 'none'
  const isDesktop = window.innerWidth >= 768
  // Sur desktop, toujours actif. Sur mobile, seulement si draw est true
  return (isDesktop || props.draw) ? 'auto' : 'none'
})

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

function handleMouseMove(event) {
  updateCursor(event)
  if (isDrawing.value) {
    draw(event)
  }
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
  <div 
    ref="canvasContainer" 
    class="relative w-full" 
    style="height: calc(100vh - 80px);"
    @mousemove="updateCursor"
    @mouseleave="hideCursor"
  >
    <canvas
      ref="canvas"
      class="w-full"
      style="height: calc(100vh - 80px);"
      :style="{ 
        pointerEvents: canvasPointerEvents, 
        cursor: 'none' 
      }"
      @mousedown="startDrawing"
      @mousemove="handleMouseMove"
      @mouseup="stopDrawing"
      @mouseleave="(e) => { stopDrawing(e); hideCursor() }"
      @mouseenter="updateCursor"
      @touchstart="startDrawing"
      @touchmove="draw"
      @touchend="stopDrawing"
      @touchcancel="stopDrawing"
    />
    <div
      v-if="shouldShowCursor"
      class="custom-cursor"
      :style="{
        left: cursorX + 'px',
        top: cursorY + 'px',
        pointerEvents: 'none',
        display: 'block'
      }"
    >
      <!-- Contour blanc vertical -->
      <div class="cursor-line cursor-line-vertical-w cursor-white"></div>
      <!-- Contour blanc horizontal -->
      <div class="cursor-line cursor-line-horizontal-w cursor-white"></div>
      <!-- Croix noire verticale -->
      <div class="cursor-line cursor-line-vertical cursor-black"></div>
      <!-- Croix noire horizontale -->
      <div class="cursor-line cursor-line-horizontal cursor-black"></div>
    </div>
  </div>
</template>

<style scoped>
canvas {
  touch-action: none;
}

.custom-cursor {
  position: absolute;
  width: 24px;
  height: 24px;
  transform: translate(-50%, -50%);
  z-index: 9999;
  pointer-events: none;
}

.cursor-line {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.cursor-line-vertical {
  width: 2px;
  height: 24px;
}

.cursor-line-horizontal {
  width: 24px;
  height: 2px;
}

.cursor-line-vertical-w {
  width: 5px;
  height: 27px;
}

.cursor-line-horizontal-w {
  width: 27px;
  height: 5px;
}

.cursor-white {
  background-color: #ffffff;
  z-index: 1;
}

.cursor-black {
  background-color: #000000;
  z-index: 2;
}
</style>
