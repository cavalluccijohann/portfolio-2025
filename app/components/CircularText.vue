<script setup lang="ts">
import { computed, ref, watchEffect, onUnmounted, onMounted } from 'vue'
import { Motion } from 'motion-v'

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';
  className?: string;
  link?: string;
}

const props = withDefaults(defineProps<CircularTextProps>(), {
  text: '',
  spinDuration: 20,
  onHover: 'speedUp',
  className: '',
  link: ''
})

const letters = computed(() => Array.from(props.text))
const isHovered = ref(false)
const isMounted = ref(false)
const isVisible = ref(false)

const currentRotation = ref(0)
const animationId = ref<number | null>(null)
const lastTime = ref<number>(0)
const rotationSpeed = ref<number>(0)

const getCurrentSpeed = () => {
  if (isHovered.value && props.onHover === 'pause') return 0

  const baseDuration = props.spinDuration
  const baseSpeed = 360 / baseDuration

  if (!isHovered.value) return baseSpeed

  switch (props.onHover) {
    case 'slowDown':
      return baseSpeed / 2
    case 'speedUp':
      return baseSpeed * 4
    case 'goBonkers':
      return baseSpeed * 20
    default:
      return baseSpeed
  }
}

const getCurrentScale = () => {
  return isHovered.value && props.onHover === 'goBonkers' ? 0.8 : 1
}

const animate = () => {
  if (!isMounted.value) return

  const now = Date.now()
  const deltaTime = lastTime.value > 0 ? (now - lastTime.value) / 1000 : 0
  lastTime.value = now

  const targetSpeed = getCurrentSpeed()

  const speedDiff = targetSpeed - rotationSpeed.value
  const smoothingFactor = Math.min(1, deltaTime * 5)
  rotationSpeed.value += speedDiff * smoothingFactor

  currentRotation.value = (currentRotation.value + rotationSpeed.value * deltaTime) % 360

  if (isMounted.value) {
    animationId.value = requestAnimationFrame(animate)
  }
}

const startAnimation = () => {
  if (!isMounted.value) return

  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
  lastTime.value = Date.now()
  rotationSpeed.value = getCurrentSpeed()
  animate()
}

onMounted(() => {
  isMounted.value = true
  // Petit délai pour l'apparition progressive
  setTimeout(() => {
    isVisible.value = true
    startAnimation()
  }, 100)
})

watchEffect(() => {
  if (isMounted.value && isVisible.value) {
    startAnimation()
  }
})

onUnmounted(() => {
  isMounted.value = false
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
})

const handleHoverStart = () => {
  isHovered.value = true
}

const handleHoverEnd = () => {
  isHovered.value = false
}

const getLetterTransform = (index: number) => {
  const rotationDeg = (360 / letters.value.length) * index
  const factor = Math.PI / letters.value.length
  const x = factor * index
  const y = factor * index
  return `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`
}
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-700 ease-out"
    enter-from-class="opacity-0 scale-75"
    enter-to-class="opacity-100 scale-100"
  >
    <NuxtLink
      v-if="isVisible"
      :to="props.link"
      class="flex items-center justify-center w-full h-full"
      :class="props.className"
      @mouseenter="handleHoverStart"
      @mouseleave="handleHoverEnd"
    >
      <Motion
        :animate="{
          rotate: currentRotation,
          scale: getCurrentScale()
        }"
        :transition="{
          rotate: {
            duration: 0
          },
          scale: {
            type: 'spring',
            damping: 20,
            stiffness: 300
          }
        }"
        :class="`m-0 mx-auto rounded-full w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] relative font-black text-primary text-center cursor-pointer origin-center ${props.className}`"
        @mouseenter="handleHoverStart"
        @mouseleave="handleHoverEnd"
      >
        <span
          v-for="(letter, i) in letters"
          :key="i"
          class="absolute inline-block inset-0 text-xl lg:text-2xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
          :style="{
            transform: getLetterTransform(i),
            WebkitTransform: getLetterTransform(i)
          }"
        >
          {{ letter }}
        </span>
      </Motion>
    </NuxtLink>
  </Transition>
</template>
