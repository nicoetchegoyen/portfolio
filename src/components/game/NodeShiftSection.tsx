import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crosshair, Heart, MousePointer2, Play, RotateCcw, Sparkles, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';

type GameStatus = 'ready' | 'playing' | 'won' | 'lost';
type OrbType = 'signal' | 'glitch';

interface Orb {
  id: number;
  type: OrbType;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

interface Point {
  x: number;
  y: number;
}

const ROUND_SECONDS = 30;
const TARGET_SIGNALS = 12;
const STARTING_ENERGY = 3;

function createOrb(id: number, width: number, height: number, type: OrbType, player: Point): Orb {
  let x = 0;
  let y = 0;
  let distance = 0;

  do {
    x = 42 + Math.random() * Math.max(1, width - 84);
    y = 52 + Math.random() * Math.max(1, height - 104);
    distance = Math.hypot(x - player.x, y - player.y);
  } while (distance < 130);

  const speed = type === 'glitch' ? 38 + Math.random() * 28 : 22 + Math.random() * 20;
  const angle = Math.random() * Math.PI * 2;
  return {
    id,
    type,
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: type === 'glitch' ? 17 : 13,
    phase: Math.random() * Math.PI * 2,
  };
}

export function NodeShiftSection() {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const arenaRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<GameStatus>('ready');
  const playerRef = useRef<Point>({ x: 320, y: 220 });
  const targetRef = useRef<Point>({ x: 320, y: 220 });
  const trailRef = useRef<Point[]>([]);
  const orbsRef = useRef<Orb[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef(0);
  const startTimeRef = useRef(0);
  const lastTimeRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const orbIdRef = useRef(0);
  const energyRef = useRef(STARTING_ENERGY);
  const collectedRef = useRef(0);
  const comboRef = useRef(0);

  const [status, setStatus] = useState<GameStatus>('ready');
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [energy, setEnergy] = useState(STARTING_ENERGY);
  const [collected, setCollected] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);

  const updateStatus = useCallback((nextStatus: GameStatus) => {
    statusRef.current = nextStatus;
    setStatus(nextStatus);
  }, []);

  const burst = useCallback((x: number, y: number, color: string, amount: number) => {
    for (let index = 0; index < amount; index += 1) {
      const angle = (Math.PI * 2 * index) / amount + Math.random() * 0.35;
      const speed = 45 + Math.random() * 95;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color,
        size: 1.5 + Math.random() * 3,
      });
    }
  }, []);

  const resetGame = useCallback(() => {
    orbsRef.current = [];
    particlesRef.current = [];
    trailRef.current = [];
    energyRef.current = STARTING_ENERGY;
    collectedRef.current = 0;
    comboRef.current = 0;
    setScore(0);
    setCombo(0);
    setEnergy(STARTING_ENERGY);
    setCollected(0);
    setTimeLeft(ROUND_SECONDS);
    updateStatus('ready');
  }, [updateStatus]);

  const startGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const center = { x: canvas.clientWidth / 2, y: canvas.clientHeight / 2 };
    playerRef.current = center;
    targetRef.current = center;
    trailRef.current = [];
    orbsRef.current = [];
    particlesRef.current = [];
    energyRef.current = STARTING_ENERGY;
    collectedRef.current = 0;
    comboRef.current = 0;
    setScore(0);
    setCombo(0);
    setEnergy(STARTING_ENERGY);
    setCollected(0);
    setTimeLeft(ROUND_SECONDS);
    startTimeRef.current = performance.now();
    lastTimeRef.current = startTimeRef.current;
    lastSpawnRef.current = 0;
    updateStatus('playing');
    canvas.focus();
  }, [updateStatus]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const arena = arenaRef.current;
    if (!canvas || !arena) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (statusRef.current !== 'playing') {
        playerRef.current = { x: width / 2, y: height / 2 };
        targetRef.current = { x: width / 2, y: height / 2 };
      }
    };

    const moveTarget = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      targetRef.current = {
        x: Math.max(24, Math.min(rect.width - 24, clientX - rect.left)),
        y: Math.max(24, Math.min(rect.height - 24, clientY - rect.top)),
      };
    };

    const handlePointerMove = (event: PointerEvent) => moveTarget(event.clientX, event.clientY);
    const handlePointerDown = (event: PointerEvent) => moveTarget(event.clientX, event.clientY);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (statusRef.current !== 'playing') return;
      const step = 34;
      const next = { ...targetRef.current };
      if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') next.x -= step;
      else if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') next.x += step;
      else if (event.key === 'ArrowUp' || event.key.toLowerCase() === 'w') next.y -= step;
      else if (event.key === 'ArrowDown' || event.key.toLowerCase() === 's') next.y += step;
      else return;
      event.preventDefault();
      next.x = Math.max(24, Math.min(canvas.clientWidth - 24, next.x));
      next.y = Math.max(24, Math.min(canvas.clientHeight - 24, next.y));
      targetRef.current = next;
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(arena);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('keydown', handleKeyDown);

    const render = (now: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const delta = Math.min((now - lastTimeRef.current) / 1000, 0.035);
      lastTimeRef.current = now;

      context.clearRect(0, 0, width, height);

      const background = context.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, width * 0.62);
      background.addColorStop(0, 'rgba(112,167,255,.08)');
      background.addColorStop(0.45, 'rgba(200,255,82,.025)');
      background.addColorStop(1, 'rgba(0,0,0,0)');
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      context.strokeStyle = 'rgba(229,255,196,.055)';
      context.lineWidth = 1;
      for (let x = 0; x < width; x += 42) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }
      for (let y = 0; y < height; y += 42) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      const player = playerRef.current;
      player.x += (targetRef.current.x - player.x) * Math.min(1, delta * 10);
      player.y += (targetRef.current.y - player.y) * Math.min(1, delta * 10);
      trailRef.current.unshift({ x: player.x, y: player.y });
      trailRef.current = trailRef.current.slice(0, 18);

      if (statusRef.current === 'playing') {
        const elapsed = (now - startTimeRef.current) / 1000;
        const remaining = Math.max(0, Math.ceil(ROUND_SECONDS - elapsed));
        setTimeLeft((current) => (current === remaining ? current : remaining));

        if (remaining <= 0) updateStatus(collectedRef.current >= TARGET_SIGNALS ? 'won' : 'lost');

        const spawnDelay = Math.max(440, 820 - elapsed * 9);
        if (now - lastSpawnRef.current > spawnDelay) {
          const glitchChance = Math.min(0.42, 0.2 + elapsed * 0.006);
          const type: OrbType = Math.random() < glitchChance ? 'glitch' : 'signal';
          orbsRef.current.push(createOrb(orbIdRef.current++, width, height, type, player));
          lastSpawnRef.current = now;
        }

        orbsRef.current.forEach((orb) => {
          orb.x += orb.vx * delta;
          orb.y += orb.vy * delta;
          orb.phase += delta * (orb.type === 'glitch' ? 4 : 2);

          if (orb.x < orb.radius || orb.x > width - orb.radius) {
            orb.vx *= -1;
            orb.x = Math.max(orb.radius, Math.min(width - orb.radius, orb.x));
          }
          if (orb.y < orb.radius || orb.y > height - orb.radius) {
            orb.vy *= -1;
            orb.y = Math.max(orb.radius, Math.min(height - orb.radius, orb.y));
          }
        });

        const collided = orbsRef.current.find((orb) => Math.hypot(orb.x - player.x, orb.y - player.y) < orb.radius + 17);
        if (collided) {
          orbsRef.current = orbsRef.current.filter((orb) => orb.id !== collided.id);
          if (collided.type === 'signal') {
            collectedRef.current += 1;
            comboRef.current += 1;
            const gained = 100 + Math.min(comboRef.current - 1, 5) * 25;
            setCollected(collectedRef.current);
            setCombo(comboRef.current);
            setScore((current) => current + gained);
            burst(collided.x, collided.y, '#c8ff52', 16);
            if (collectedRef.current >= TARGET_SIGNALS) updateStatus('won');
          } else {
            energyRef.current -= 1;
            comboRef.current = 0;
            setEnergy(energyRef.current);
            setCombo(0);
            burst(collided.x, collided.y, '#ff625c', 22);
            if (energyRef.current <= 0) updateStatus('lost');
          }
        }
      }

      context.save();
      orbsRef.current.filter((orb) => orb.type === 'signal').slice(0, 4).forEach((orb) => {
        const distance = Math.hypot(orb.x - player.x, orb.y - player.y);
        if (distance > 220) return;
        context.beginPath();
        context.moveTo(player.x, player.y);
        context.lineTo(orb.x, orb.y);
        context.strokeStyle = `rgba(200,255,82,${Math.max(0, 0.2 - distance / 1400)})`;
        context.setLineDash([4, 8]);
        context.stroke();
      });
      context.restore();

      orbsRef.current.forEach((orb) => {
        const pulse = 1 + Math.sin(orb.phase) * 0.12;
        context.save();
        context.translate(orb.x, orb.y);
        if (orb.type === 'signal') {
          context.shadowColor = '#c8ff52';
          context.shadowBlur = 22;
          context.fillStyle = '#c8ff52';
          context.beginPath();
          context.arc(0, 0, orb.radius * pulse, 0, Math.PI * 2);
          context.fill();
          context.shadowBlur = 0;
          context.strokeStyle = 'rgba(200,255,82,.4)';
          context.lineWidth = 1;
          context.beginPath();
          context.arc(0, 0, orb.radius * 1.8, 0, Math.PI * 2);
          context.stroke();
        } else {
          context.rotate(orb.phase * 0.35);
          context.strokeStyle = '#ff625c';
          context.lineWidth = 3;
          context.shadowColor = '#ff625c';
          context.shadowBlur = 18;
          const size = orb.radius * pulse;
          context.strokeRect(-size * 0.72, -size * 0.72, size * 1.44, size * 1.44);
          context.beginPath();
          context.moveTo(-size * 0.42, -size * 0.42);
          context.lineTo(size * 0.42, size * 0.42);
          context.moveTo(size * 0.42, -size * 0.42);
          context.lineTo(-size * 0.42, size * 0.42);
          context.stroke();
        }
        context.restore();
      });

      particlesRef.current = particlesRef.current.filter((particle) => particle.life > 0);
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        particle.vx *= 0.97;
        particle.vy *= 0.97;
        particle.life -= delta * 1.8;
        context.globalAlpha = Math.max(0, particle.life);
        context.fillStyle = particle.color;
        context.fillRect(particle.x, particle.y, particle.size, particle.size);
      });
      context.globalAlpha = 1;

      trailRef.current.forEach((point, index) => {
        const opacity = (1 - index / trailRef.current.length) * 0.22;
        context.beginPath();
        context.arc(point.x, point.y, Math.max(2, 10 - index * 0.45), 0, Math.PI * 2);
        context.fillStyle = `rgba(112,167,255,${opacity})`;
        context.fill();
      });

      const playerGlow = context.createRadialGradient(player.x, player.y, 2, player.x, player.y, 34);
      playerGlow.addColorStop(0, 'rgba(240,246,233,1)');
      playerGlow.addColorStop(0.22, 'rgba(112,167,255,.95)');
      playerGlow.addColorStop(1, 'rgba(112,167,255,0)');
      context.fillStyle = playerGlow;
      context.beginPath();
      context.arc(player.x, player.y, 34, 0, Math.PI * 2);
      context.fill();
      context.strokeStyle = 'rgba(112,167,255,.8)';
      context.lineWidth = 1.5;
      context.beginPath();
      context.arc(player.x, player.y, 20 + Math.sin(now / 280) * 2, 0, Math.PI * 2);
      context.stroke();
      context.fillStyle = '#f0f6e9';
      context.beginPath();
      context.arc(player.x, player.y, 5.5, 0, Math.PI * 2);
      context.fill();

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animationRef.current);
      observer.disconnect();
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('keydown', handleKeyDown);
    };
  }, [burst, updateStatus]);

  return (
    <Section id="game" className="node-shift-section">
      <SectionHeader number="04" title="NODE//SHIFT" subtitle={t('game.runner.subtitle', 'Mové el núcleo. Capturá la señal. Esquivá el ruido.')} />

      <div className="signal-runner-shell rounded-[30px] border border-[var(--color-border)] overflow-hidden">
        <div className="node-shift-topbar">
          <div className="flex items-center gap-2">
            <span className="node-shift-led bg-red-400/70" />
            <span className="node-shift-led bg-amber-300/70" />
            <span className="node-shift-led bg-emerald-400/70" />
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px] sm:text-xs text-[var(--color-text-muted)]">
            <span>LIVE_SIMULATION</span>
            <span className={status === 'playing' ? 'text-[var(--color-accent)]' : ''}>{status === 'playing' ? 'SIGNAL.LIVE' : 'SYSTEM.READY'}</span>
          </div>
        </div>

        <div className="signal-runner-hud">
          <div className="signal-hud-block"><span>{t('game.runner.signals', 'SEÑALES')}</span><strong>{collected}<small>/{TARGET_SIGNALS}</small></strong></div>
          <div className="signal-hud-block"><span>{t('game.runner.score', 'PUNTAJE')}</span><strong>{String(score).padStart(4, '0')}</strong></div>
          <div className="signal-hud-block hidden sm:flex"><span>COMBO</span><strong className={combo >= 3 ? 'text-[var(--color-accent)]' : ''}>×{combo}</strong></div>
          <div className="signal-hud-block">
            <span>{t('game.runner.energy', 'ENERGÍA')}</span>
            <div className="flex gap-1.5 mt-1.5">
              {Array.from({ length: STARTING_ENERGY }, (_, index) => <Heart key={index} className={`w-4 h-4 ${index < energy ? 'signal-heart-active' : 'signal-heart-empty'}`} />)}
            </div>
          </div>
          <div className="signal-hud-time"><span>{timeLeft}</span><small>s</small></div>
        </div>

        <div ref={arenaRef} className={`signal-runner-arena ${status === 'playing' ? 'is-playing' : ''}`}>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full outline-none" tabIndex={0} aria-label={t('game.runner.canvasLabel', 'Área de juego NODE SHIFT')} />
          <div className="signal-legend pointer-events-none">
            <span><i className="signal-dot" /> {t('game.runner.collect', 'CAPTURÁ')}</span>
            <span><i className="glitch-dot" /> {t('game.runner.avoid', 'ESQUIVÁ')}</span>
          </div>

          <AnimatePresence mode="wait">
            {status === 'ready' && (
              <motion.div className="signal-game-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div className="signal-game-card" initial={{ scale: 0.94, y: 12 }} animate={{ scale: 1, y: 0 }}>
                  <div className="signal-game-icon"><Crosshair className="w-6 h-6" /></div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-accent)]">NODE//SHIFT</span>
                  <h3>{t('game.runner.readyTitle', 'Sincronizá el núcleo')}</h3>
                  <p>{t('game.runner.instructions', 'Mové el núcleo con el mouse o el dedo. Capturá 12 señales verdes y evitá los glitches rojos.')}</p>
                  <div className="signal-controls">
                    <span><MousePointer2 className="w-3.5 h-3.5" /> mouse / touch</span>
                    <span>WASD / arrows</span>
                  </div>
                  <button onClick={startGame} className="primary-cta rounded-full px-6 py-3 inline-flex items-center gap-2 font-mono text-xs cursor-pointer">
                    <Play className="w-3.5 h-3.5 fill-current" /> {t('game.runner.start', 'INICIAR SEÑAL')}
                  </button>
                </motion.div>
              </motion.div>
            )}

            {(status === 'won' || status === 'lost') && (
              <motion.div className="signal-game-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.div className="signal-game-card" initial={{ scale: 0.9, y: 15 }} animate={{ scale: 1, y: 0 }}>
                  <div className={`signal-game-icon ${status === 'lost' ? 'is-danger' : ''}`}>{status === 'won' ? <Sparkles className="w-6 h-6" /> : <Zap className="w-6 h-6" />}</div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-accent)]">{status === 'won' ? 'SYSTEM.SYNCED' : 'SIGNAL.LOST'}</span>
                  <h3>{status === 'won' ? t('game.runner.wonTitle', 'Sistema conectado') : t('game.runner.lostTitle', 'Señal interrumpida')}</h3>
                  <p>{status === 'won' ? t('game.runner.wonText', 'Capturaste la señal y convertiste el ruido en un sistema vivo.') : t('game.runner.lostText', 'Estuviste cerca. Volvé a entrar, encadená combos y mantenete lejos del ruido.')}</p>
                  <div className="signal-result-score"><span>{t('game.runner.score', 'PUNTAJE')}</span><strong>{score}</strong></div>
                  <button onClick={startGame} className="primary-cta rounded-full px-6 py-3 inline-flex items-center gap-2 font-mono text-xs cursor-pointer">
                    <RotateCcw className="w-3.5 h-3.5" /> {t('game.runner.retry', 'JUGAR DE NUEVO')}
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="signal-runner-footer">
          <p><span>// objetivo:</span> {t('game.runner.footer', '12 señales · 30 segundos · 3 vidas')}</p>
          <button onClick={resetGame} className="font-mono text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer">RESET_SIMULATION</button>
        </div>
      </div>
    </Section>
  );
}

export default NodeShiftSection;
