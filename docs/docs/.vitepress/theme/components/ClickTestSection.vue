<template>
    <div class="p-4 flex flex-col lg:flex-row items-center gap-8 max-w-4xl mx-auto">

        <!-- 右侧连点测试区域 -->
        <div class="flex-1 w-full bg-white select-none rounded-xl">
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 h-full">
                <!-- 测试区域 -->
                <div class="relative">
                    <div @click="handleTestClick"
                        class="w-full h-48 sm:h-72 bg-gray-200/20 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200/30 transition-colors relative overflow-hidden">
                        <span class="text-sm sm:text-xl relative z-10">{{ getTestStatusText() }}</span>

                        <!-- Canvas烟花特效 -->
                        <canvas ref="fireworkCanvas"
                            class="absolute inset-0 pointer-events-none"
                            :width="canvasWidth"
                            :height="canvasHeight">
                        </canvas>
                    </div>

                    <!-- 浮动测试结果 -->
                    <div v-if="showResult"
                        class="absolute z-10 inset-0 bg-black/50 w-full rounded-lg flex items-center justify-center">
                        <div class="bg-white rounded-lg p-4 text-center w-[80%] shadow-lg sm:px-12">
                            <div class="text-xl font-bold text-blue-600 mb-3">测试完成！</div>
                            <div class="text-sm text-gray-600 mb-4">
                                3秒点击
                            </div>
                            <div class="text-lg mb-2">
                                <span class="font-bold text-2xl sm:text-5xl text-green-600">{{ clickCount }}</span> 次
                            </div>

                            <button @click="resetTest"
                                class="text-blue-500  rounded-lg">
                                重新测试
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 测试状态信息 -->
                <div class="mt-4 text-sm flex justify-between">
                    <div>点击次数: <span>{{ clickCount }}</span></div>
                    <div class="text-gray-500">
                        按下触发键 <span text-blue>(F4)</span> 点击
                    </div>
                    <div>剩余时间: <span>{{ remainingTime }}s</span></div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const isTestRunning = ref(false)
const clickCount = ref(0)
const remainingTime = ref(3)
const showResult = ref(false)
const fireworkCanvas = ref<HTMLCanvasElement>()
const canvasWidth = ref(400)
const canvasHeight = ref(256)
let testTimer: NodeJS.Timeout | null = null
let ctx: CanvasRenderingContext2D | null = null
let animationId: number | null = null

// 烟花粒子类
class FireworkParticle {
    x: number
    y: number
    vx: number
    vy: number
    color: string
    size: number
    life: number
    maxLife: number
    rotation: number
    rotationSpeed: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y

        // 随机速度和方向
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 120 + 30
        this.vx = Math.cos(angle) * speed
        this.vy = Math.sin(angle) * speed

        // 随机颜色
        this.color = `hsl(${Math.random() * 360}, 100%, 60%)`

        // 随机大小
        this.size = Math.random() * 8 + 2

        // 生命周期
        this.maxLife = 60 // 60帧约1秒
        this.life = this.maxLife

        // 旋转
        this.rotation = 0
        this.rotationSpeed = (Math.random() - 0.5) * 0.3
    }

    update() {
        this.x += this.vx * 0.016 // 假设60fps
        this.y += this.vy * 0.016
        this.vy += 200 * 0.016 // 重力效果
        this.vx *= 0.98 // 空气阻力
        this.vy *= 0.98
        this.rotation += this.rotationSpeed
        this.life--
    }

    draw(ctx: CanvasRenderingContext2D) {
        const alpha = this.life / this.maxLife
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        ctx.globalAlpha = alpha
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(0, 0, this.size * alpha, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
    }

    isDead() {
        return this.life <= 0
    }
}

const particles: FireworkParticle[] = []

const initCanvas = () => {
    if (!fireworkCanvas.value) return

    ctx = fireworkCanvas.value.getContext('2d')
    if (!ctx) return

    // 设置canvas尺寸
    const rect = fireworkCanvas.value.parentElement?.getBoundingClientRect()
    if (rect) {
        canvasWidth.value = rect.width
        canvasHeight.value = rect.height
        fireworkCanvas.value.width = rect.width
        fireworkCanvas.value.height = rect.height
    }

    // 开始动画循环
    animate()
}

const animate = () => {
    if (!ctx || !fireworkCanvas.value) return

    // 清空画布
    ctx.clearRect(0, 0, fireworkCanvas.value.width, fireworkCanvas.value.height)

    // 更新和绘制粒子
    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i]
        particle.update()
        particle.draw(ctx)

        // 移除死亡的粒子
        if (particle.isDead()) {
            particles.splice(i, 1)
        }
    }

    animationId = requestAnimationFrame(animate)
}

const createFirework = (x: number, y: number) => {
    // 创建30个烟花粒子
    for (let i = 0; i < 30; i++) {
        particles.push(new FireworkParticle(x, y))
    }
}

onMounted(() => {
    nextTick(() => {
        initCanvas()
    })
})

const getTestStatusText = () => {
    if (showResult.value) {
        return '点击重新测试按钮开始新测试'
    } else if (isTestRunning.value) {
        return '快速点击！'
    } else {
        return '点击开始3秒连点测试'
    }
}

const handleTestClick = (event: MouseEvent) => {
    if (showResult.value) {
        return // 如果显示结果，点击无效
    }

    if (!isTestRunning.value) {
        // 开始测试
        startClickTest()
    }

    // 计数点击
    clickCount.value++

    // 创建烟花特效
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    createFirework(x, y)
}

const startClickTest = () => {
    isTestRunning.value = true
    clickCount.value = 0
    remainingTime.value = 3
    showResult.value = false

    // 开始3秒倒计时
    testTimer = setInterval(() => {
        remainingTime.value--
        if (remainingTime.value <= 0) {
            endTest()
        }
    }, 1000)
}

const endTest = () => {
    isTestRunning.value = false
    showResult.value = true

    // 清除计时器
    if (testTimer) {
        clearInterval(testTimer)
        testTimer = null
    }
}

const resetTest = () => {
    endTest()
    clickCount.value = 0
    remainingTime.value = 3
    showResult.value = false
}
</script>