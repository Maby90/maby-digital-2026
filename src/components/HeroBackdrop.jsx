import React, { useEffect, useRef } from 'react';
import { heavyFX } from '../lib/gsap';

// Animated WebGL "flow nebula": domain-warped fbm noise tinted with the brand
// mint, with a soft light that follows the pointer. Reads theme colors from CSS
// vars so it works in both light and dark. Falls back to the static CSS grid +
// glow when WebGL is unavailable or motion/heavy FX are disabled.

const FRAG = `
precision highp float;
uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;     // 0..1
uniform vec3  u_mint;
uniform vec3  u_bg;
uniform float u_dark;      // 1.0 dark, 0.0 light

// hash / value noise
float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
  vec2 u=f*f*(3.-2.*f);
  return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;
}
float fbm(vec2 p){
  float v=0., a=0.5;
  for(int i=0;i<6;i++){ v+=a*noise(p); p*=2.02; a*=0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = (gl_FragCoord.xy - 0.5*u_res.xy) / u_res.y;
  float t = u_time * 0.05;

  // domain warp
  vec2 q = vec2(fbm(p*1.4 + t), fbm(p*1.4 - t + 5.2));
  vec2 r = vec2(fbm(p*1.4 + 1.7*q + t*1.3), fbm(p*1.4 + 1.7*q - t));
  float f = fbm(p*1.6 + 2.2*r);

  // pointer light
  vec2 m = (u_mouse - 0.5) * vec2(u_res.x/u_res.y, 1.0);
  float d = distance(p, m);
  float glow = smoothstep(0.9, 0.0, d) * 0.6;

  float intensity = smoothstep(0.25, 0.95, f) + glow;

  // fade toward bottom + radial top emphasis
  float topfade = smoothstep(1.05, 0.1, uv.y);
  intensity *= mix(0.35, 1.0, topfade);

  vec3 col = mix(u_bg, u_mint, intensity * (u_dark>0.5 ? 0.55 : 0.32));

  // subtle grain
  col += (hash(gl_FragCoord.xy + u_time) - 0.5) * 0.015;

  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`;

function readColor(varName) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  const parts = raw.split(/\s+/).map(Number);
  if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
    return parts.map((n) => n / 255);
  }
  return [0, 0, 0];
}

export default function HeroBackdrop() {
  const canvasRef = useRef(null);
  const enabled = typeof window !== 'undefined' && heavyFX();

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false });
    if (!gl) return;

    const compile = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = {
      res: gl.getUniformLocation(prog, 'u_res'),
      time: gl.getUniformLocation(prog, 'u_time'),
      mouse: gl.getUniformLocation(prog, 'u_mouse'),
      mint: gl.getUniformLocation(prog, 'u_mint'),
      bg: gl.getUniformLocation(prog, 'u_bg'),
      dark: gl.getUniformLocation(prog, 'u_dark'),
    };

    let mint = readColor('--mint');
    let bg = readColor('--bg');
    const syncColors = () => { mint = readColor('--mint'); bg = readColor('--bg'); };
    const themeObserver = new MutationObserver(syncColors);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const resize = () => {
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    };

    const mouse = { x: 0.5, y: 0.35, tx: 0.5, ty: 0.35 };
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) / rect.width;
      mouse.ty = 1 - (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    let running = true;
    const io = new IntersectionObserver(([en]) => { running = en.isIntersecting; }, { threshold: 0 });
    io.observe(canvas);

    let raf = 0;
    const start = performance.now();
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (!running) return; // keep the single chain alive, skip drawing when offscreen
      resize();
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(U.res, canvas.width, canvas.height);
      gl.uniform1f(U.time, (now - start) / 1000);
      gl.uniform2f(U.mouse, mouse.x, mouse.y);
      gl.uniform3f(U.mint, mint[0], mint[1], mint[2]);
      gl.uniform3f(U.bg, bg[0], bg[1], bg[2]);
      gl.uniform1f(U.dark, document.documentElement.classList.contains('dark') ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      running = false;
      io.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('pointermove', onMove);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [enabled]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Static fallback (also the base layer under the canvas) */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-x-0 top-0 h-[80vh] bg-radial-fade" />
      {enabled && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-70 [mask-image:radial-gradient(120%_90%_at_50%_0%,black_25%,transparent_85%)]"
        />
      )}
    </div>
  );
}
