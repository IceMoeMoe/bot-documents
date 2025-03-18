/**
 * 矩阵雨特效
 * 为VitePress文档站点添加经典的黑客帝国风格矩阵雨效果
 */

class MatrixRain {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
    this.fontSize = 14;
    this.columns = 0;
    this.drops = [];
    this.animationFrame = null;
    this.isActive = false;
  }

  init() {
    // 创建canvas元素
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('matrix-canvas');
    this.ctx = this.canvas.getContext('2d');
    
    // 设置样式
    Object.assign(this.canvas.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: '-2',
      opacity: '0.15'
    });
    
    // 添加到DOM
    document.body.appendChild(this.canvas);
    
    // 设置canvas尺寸
    this.resize();
    
    // 初始化雨滴
    this.initRain();
    
    // 添加事件监听
    window.addEventListener('resize', this.resize.bind(this));
    
    // 开始动画
    this.animate();
    this.isActive = true;
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // 重新计算列数
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    
    // 重新初始化雨滴
    this.initRain();
  }

  initRain() {
    this.drops = [];
    for (let i = 0; i < this.columns; i++) {
      // 初始位置随机分布在屏幕上方
      this.drops[i] = Math.random() * -100;
    }
  }

  animate() {
    this.animationFrame = requestAnimationFrame(this.animate.bind(this));
    
    // 半透明黑色背景，形成拖尾效果
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // 设置文字样式
    this.ctx.fillStyle = '#0f0';
    this.ctx.font = `${this.fontSize}px monospace`;
    
    // 绘制字符
    for (let i = 0; i < this.drops.length; i++) {
      // 随机选择一个字符
      const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
      
      // 计算x坐标
      const x = i * this.fontSize;
      // 计算y坐标
      const y = this.drops[i] * this.fontSize;
      
      // 绘制字符
      this.ctx.fillText(text, x, y);
      
      // 更新雨滴位置
      if (y > this.canvas.height && Math.random() > 0.975) {
        // 重置到顶部
        this.drops[i] = 0;
      } else {
        // 向下移动
        this.drops[i]++;
      }
    }
  }

  destroy() {
    if (this.isActive) {
      // 移除事件监听
      window.removeEventListener('resize', this.resize);
      
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

export default new MatrixRain();
