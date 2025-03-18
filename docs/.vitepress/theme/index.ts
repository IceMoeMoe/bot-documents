import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ChatPanel from '@cordisjs/vitepress/client/components/chat-panel.vue'
import ChatMessage from './components/chat-message.vue'
import './styles/custom.css'

// 导入特效脚本
import { onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vitepress'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ChatPanel', ChatPanel)
    app.component('ChatMessage', ChatMessage)
  },
  setup() {
    // 在客户端加载时初始化特效
    const route = useRoute()
    let particleEffect = null
    let matrixRain = null
    let parallaxEffect = null
    
    onMounted(() => {
      // 动态加载粒子特效脚本
      import('./scripts/particles.js').then((module) => {
        particleEffect = module.default
        particleEffect.init()
      })
      
      // 动态加载矩阵雨特效脚本
      import('./scripts/matrix-rain.js').then((module) => {
        matrixRain = module.default
        matrixRain.init()
      })
      
      // 动态加载滚动视差效果脚本
      import('./scripts/parallax.js').then((module) => {
        parallaxEffect = module.default
        parallaxEffect.init()
      })
      
      // 添加页面过渡效果
      document.body.classList.add('ready')
      
      // 添加链接点击涟漪效果
      document.addEventListener('click', createRippleEffect)
      
      // 添加全局样式
      addGlobalStyles()
    })
    
    onUnmounted(() => {
      // 清理特效
      if (particleEffect) {
        particleEffect.destroy()
      }
      
      if (matrixRain) {
        matrixRain.destroy()
      }
      
      if (parallaxEffect) {
        parallaxEffect.destroy()
      }
      
      document.removeEventListener('click', createRippleEffect)
    })
    
    // 链接点击涟漪效果函数
    const createRippleEffect = (event) => {
      const target = event.target
      if (target.tagName === 'A' || target.closest('a')) {
        const x = event.clientX
        const y = event.clientY
        
        const ripple = document.createElement('div')
        ripple.className = 'ripple-effect'
        ripple.style.position = 'fixed'
        ripple.style.left = `${x}px`
        ripple.style.top = `${y}px`
        ripple.style.width = '0'
        ripple.style.height = '0'
        ripple.style.borderRadius = '50%'
        ripple.style.backgroundColor = 'rgba(0, 240, 255, 0.4)'
        ripple.style.transform = 'translate(-50%, -50%)'
        ripple.style.animation = 'ripple-animation 1s ease-out forwards'
        
        document.body.appendChild(ripple)
        
        setTimeout(() => {
          ripple.remove()
        }, 1000)
      }
    }
    
    // 添加全局样式
    const addGlobalStyles = () => {
      const style = document.createElement('style')
      style.textContent = `
        @keyframes ripple-animation {
          0% {
            width: 0;
            height: 0;
            opacity: 0.8;
          }
          100% {
            width: 200px;
            height: 200px;
            opacity: 0;
          }
        }
        
        @keyframes glow-animation {
          0% {
            box-shadow: 0 0 5px rgba(0, 240, 255, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(0, 240, 255, 0.8);
          }
          100% {
            box-shadow: 0 0 5px rgba(0, 240, 255, 0.5);
          }
        }
        
        .vp-doc a, .VPNavBarMenuLink, .VPSidebarItem .text {
          position: relative;
          overflow: hidden;
        }
        
        .VPButton {
          animation: glow-animation 3s infinite;
        }
        
        .fade-enter-active,
        .fade-leave-active {
          transition: opacity 0.3s ease;
        }
        
        .fade-enter-from,
        .fade-leave-to {
          opacity: 0;
        }
      `
      document.head.appendChild(style)
    }
  }
} satisfies Theme
