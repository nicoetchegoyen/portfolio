import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface Node {
  id: string;
  labelKey: string;
  defaultLabel: string;
  x: number; // percentage 0-1
  y: number; // percentage 0-1
  baseX: number;
  baseY: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
}

const initialNodes: Omit<Node, 'vx' | 'vy'>[] = [
  { id: 'systems', labelKey: 'nodes.systems', defaultLabel: 'Sistemas', x: 0.5, y: 0.3, baseX: 0.5, baseY: 0.3, radius: 6, color: '#10b981' },
  { id: 'marketing', labelKey: 'nodes.marketing', defaultLabel: 'Marketing', x: 0.25, y: 0.4, baseX: 0.25, baseY: 0.4, radius: 5, color: '#6366f1' },
  { id: 'ai', labelKey: 'nodes.ai', defaultLabel: 'IA', x: 0.75, y: 0.35, baseX: 0.75, baseY: 0.35, radius: 5, color: '#6366f1' },
  { id: 'design', labelKey: 'nodes.design', defaultLabel: 'Diseño', x: 0.35, y: 0.7, baseX: 0.35, baseY: 0.7, radius: 4, color: '#6366f1' },
  { id: 'product', labelKey: 'nodes.product', defaultLabel: 'Producto', x: 0.65, y: 0.7, baseX: 0.65, baseY: 0.7, radius: 4, color: '#6366f1' },
];

const connections = [
  ['systems', 'marketing'],
  ['systems', 'ai'],
  ['systems', 'design'],
  ['systems', 'product'],
  ['marketing', 'design'],
  ['ai', 'product'],
  ['marketing', 'ai'],
];

export const NodeGraphMini = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    
    // Scale for device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const nodes: Node[] = initialNodes.map(n => ({ ...n, vx: 0, vy: 0 }));
    
    let mouseX = -1000;
    let mouseY = -1000;
    let hoveredNodeId: string | null = null;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Physics/Update
      if (!prefersReducedMotion) {
        hoveredNodeId = null;
        nodes.forEach(node => {
          const absX = node.x * width;
          const absY = node.y * height;
          
          const dx = mouseX - absX;
          const dy = mouseY - absY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 100;
          
          if (distance < node.radius * 4) {
            hoveredNodeId = node.id;
          }

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            node.vx += (dx / distance) * force * 0.01;
            node.vy += (dy / distance) * force * 0.01;
          }

          // Return to base position
          const baseAbsX = node.baseX * width;
          const baseAbsY = node.baseY * height;
          node.vx += (baseAbsX - absX) * 0.03;
          node.vy += (baseAbsY - absY) * 0.03;

          // Apply velocity and dampening
          node.x += node.vx / width;
          node.y += node.vy / height;
          node.vx *= 0.85;
          node.vy *= 0.85;
        });
      }

      // Draw connections
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      connections.forEach(([id1, id2]) => {
        const n1 = nodes.find(n => n.id === id1);
        const n2 = nodes.find(n => n.id === id2);
        if (n1 && n2) {
          ctx.beginPath();
          ctx.moveTo(n1.x * width, n1.y * height);
          ctx.lineTo(n2.x * width, n2.y * height);
          ctx.stroke();
        }
      });

      // Draw nodes
      nodes.forEach(node => {
        const absX = node.x * width;
        const absY = node.y * height;
        const isHovered = hoveredNodeId === node.id;
        const currentRadius = isHovered ? node.radius * 1.5 : node.radius;
        
        ctx.beginPath();
        ctx.arc(absX, absY, currentRadius, 0, Math.PI * 2);
        
        ctx.fillStyle = node.color;
        ctx.shadowBlur = isHovered ? 20 : 12;
        ctx.shadowColor = node.color;
        ctx.fill();
        
        // Reset shadow for text
        ctx.shadowBlur = 0;
        
        // Draw label
        ctx.fillStyle = isHovered ? '#f4f4f5' : '#a1a1aa';
        ctx.font = '12px "Geist Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(t(node.labelKey, node.defaultLabel), absX, absY + currentRadius + 18);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [t]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full cursor-crosshair"
      style={{ touchAction: 'none' }}
    />
  );
};

export default NodeGraphMini;
