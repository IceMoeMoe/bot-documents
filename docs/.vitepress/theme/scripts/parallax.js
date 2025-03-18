/**
 * 滚动视差效果
 * 为VitePress文档站点添加滚动视差效果，增强页面深度感
 */

class ParallaxEffect {
  constructor() {
    this.elements = [];
    this.isActive = false;
    this.ticking = false;
  }

  init() {
    // 查找可应用视差效果的元素
    this.findElements();
    
    // 添加事件监听
    window.addEventListener('scroll', this.onScroll.bind(this));
    window.addEventListener('resize', this.onResize.bind(this));
    
    // 初始应用一次效果
    this.update();
    
    this.isActive = true;
    
    // 添加CSS样式
    this.addStyles();
  }

  findElements() {
    // 清空现有元素
    this.elements = [];
    
    // 查找标题元素
    const headings = document.querySelectorAll('.vp-doc h1, .vp-doc h2, .vp-doc h3, .VPHero .name, .VPHero .text');
    headings.forEach(el => {
      this.elements.push({
        el,
        type: 'heading',
        speed: 0.05
      });
    });
    
    // 查找特性卡片
    const features = document.querySelectorAll('.VPFeature');
    features.forEach((el, index) => {
      this.elements.push({
        el,
        type: 'feature',
        speed: 0.1,
        delay: index * 100
      });
    });
    
    // 查找图片
    const images = document.querySelectorAll('.vp-doc img');
    images.forEach(el => {
      this.elements.push({
        el,
        type: 'image',
        speed: 0.15
      });
    });
    
    // 查找代码块
    const codeBlocks = document.querySelectorAll('.vp-doc div[class*="language-"]');
    codeBlocks.forEach(el => {
      this.elements.push({
        el,
        type: 'code',
        speed: 0.08
      });
    });
  }

  onScroll() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.update();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  onResize() {
    // 重新查找元素
    this.findElements();
    // 更新效果
    this.update();
  }

  update() {
    const scrollY = window.scrollY;
    
    this.elements.forEach(item => {
      const { el, type, speed } = item;
      
      // 检查元素是否在视口中
      if (this.isInViewport(el)) {
        // 计算元素距离视口顶部的距离
        const rect = el.getBoundingClientRect();
        const elTop = rect.top + scrollY;
        const offset = (scrollY - elTop) * speed;
        
        // 根据元素类型应用不同效果
        switch (type) {
          case 'heading':
            el.style.transform = `translateY(${offset}px)`;
            break;
          case 'feature':
            el.style.transform = `translateY(${offset}px) scale(${1 + Math.abs(offset) * 0.001})`;
            break;
          case 'image':
            el.style.transform = `translateY(${offset}px) scale(${1 + Math.abs(offset) * 0.0005})`;
            break;
          case 'code':
            el.style.transform = `translateY(${offset * 0.5}px)`;
            break;
        }
      }
    });
  }

  isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top < (window.innerHeight || document.documentElement.clientHeight) + 100 &&
      rect.bottom > -100
    );
  }

  addStyles() {
    // 创建样式元素
    const style = document.createElement('style');
    style.textContent = `
      .vp-doc h1, .vp-doc h2, .vp-doc h3, .VPHero .name, .VPHero .text,
      .VPFeature, .vp-doc img, .vp-doc div[class*="language-"] {
        will-change: transform;
        transition: transform 0.1s ease-out;
      }
    `;
    document.head.appendChild(style);
  }

  destroy() {
    if (this.isActive) {
      // 移除事件监听
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onResize);
      
      // 重置元素样式
      this.elements.forEach(item => {
        item.el.style.transform = '';
      });
      
      this.isActive = false;
    }
  }
}

export default new ParallaxEffect();
