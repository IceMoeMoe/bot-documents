/**
 * 粒子背景特效
 * 为VitePress文档站点添加动态粒子背景，增强科技感和视觉体验
 */

class ParticleEffect {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.mouse = {
      x: 0,
      y: 0,
      radius: 100
    };
    this.animationFrame = null;
    this.isActive = false;
  }

  init() {
    // 创建canvas元素
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('particle-canvas');
    this.ctx = this.canvas.getContext('2d');
    
    // 设置样式
    Object.assign(this.canvas.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: '-1',
      opacity: '0.7'
    });
    
    // 添加到DOM
    document.body.appendChild(this.canvas);
    
    // 设置canvas尺寸
    this.resize();
    
    // 创建粒子
    this.createParticles();
    
    // 添加事件监听
    window.addEventListener('resize', this.resize.bind(this));
    window.addEventListener('mousemove', this.mouseMove.bind(this));
    
    // 开始动画
    this.animate();
    this.isActive = true;
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // 如果已经有粒子，则重新创建以适应新尺寸
    if (this.particles.length > 0) {
      this.particles = [];
      this.createParticles();
    }
  }

  createParticles() {
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 150);
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 2 + 1,
        color: this.getRandomColor(),
        velocity: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5
        },
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  getRandomColor() {
    const colors = [
      '0, 240, 255', // 霓虹蓝
      '185, 103, 255', // 霓虹紫
      '255, 56, 100', // 霓虹粉
      '57, 255, 20' // 霓虹绿
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  mouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  animate() {
    this.animationFrame = requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      
      // 更新位置
      p.x += p.velocity.x;
      p.y += p.velocity.y;
      
      // 边界检查
      if (p.x < 0 || p.x > this.canvas.width) {
        p.velocity.x = -p.velocity.x;
      }
      
      if (p.y < 0 || p.y > this.canvas.height) {
        p.velocity.y = -p.velocity.y;
      }
      
      // 计算与鼠标的距离
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // 鼠标交互效果
      if (distance < this.mouse.radius) {
        const angle = Math.atan2(dy, dx);
        const force = (this.mouse.radius - distance) / this.mouse.radius;
        
        p.velocity.x += Math.cos(angle) * force * 0.2;
        p.velocity.y += Math.sin(angle) * force * 0.2;
      }
      
      // 限制最大速度
      const speed = Math.sqrt(p.velocity.x * p.velocity.x + p.velocity.y * p.velocity.y);
      if (speed > 1.5) {
        p.velocity.x = (p.velocity.x / speed) * 1.5;
        p.velocity.y = (p.velocity.y / speed) * 1.5;
      }
      
      // 绘制粒子
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
      this.ctx.fill();
      
      // 绘制连接线
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(${p.color}, ${(100 - distance) / 500})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }
  }

  destroy() {
    if (this.isActive) {
      // 移除事件监听
      window.removeEventListener('resize', this.resize);
      window.removeEventListener('mousemove', this.mouseMove);
      
      // 停止动画
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
      
      // 移除canvas
      if (this.canvas && this.canvas.parentNode) {
        this.canvas.parentNode.removeChild(this.canvas);
      }
      
      this.isActive = false;
    }
  }
}

export default new ParticleEffect();
