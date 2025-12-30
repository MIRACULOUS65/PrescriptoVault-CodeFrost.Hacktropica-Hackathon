"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// import { SplitText } from "gsap/SplitText"; // Removed to avoid Club GSAP dependency issues
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ShieldCheck } from "lucide-react";

// gsap.registerPlugin(SplitText, useGSAP);
gsap.registerPlugin(useGSAP);

interface ShaderPlaneProps {
    vertexShader: string;
    fragmentShader: string;
    uniforms: { [key: string]: { value: unknown } };
}

const ShaderPlane = ({
    vertexShader,
    fragmentShader,
    uniforms,
}: ShaderPlaneProps) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { size } = useThree();

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial;
            material.uniforms.u_time.value = state.clock.elapsedTime * 0.5;
            material.uniforms.u_resolution.value.set(size.width, size.height, 1.0);
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                side={THREE.FrontSide}
                depthTest={false}
                depthWrite={false}
            />
        </mesh>
    );
};

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;
  uniform float u_time;
  uniform vec3 u_resolution;
  uniform sampler2D u_channel0;

  vec2 toPolar(vec2 p) {
      float r = length(p);
      float a = atan(p.y, p.x);
      return vec2(r, a);
  }

  vec2 fromPolar(vec2 polar) {
      return vec2(cos(polar.y), sin(polar.y)) * polar.x;
  }

  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
      vec2 p = 6.0 * ((fragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y);

      vec2 polar = toPolar(p);
      float r = polar.x;
      float a = polar.y;

      vec2 i = p;
      float c = 0.0;
      float rot = r + u_time + p.x * 0.100;
      for (float n = 0.0; n < 4.0; n++) {
          float rr = r + 0.15 * sin(u_time*0.7 + float(n) + r*2.0);
          p *= mat2(
              cos(rot - sin(u_time / 10.0)), sin(rot),
              -sin(cos(rot) - u_time / 10.0), cos(rot)
          ) * -0.25;

          float t = r - u_time / (n + 30.0);
          i -= p + sin(t - i.y) + rr;

          c += 2.2 / length(vec2(
              (sin(i.x + t) / 0.15),
              (cos(i.y + t) / 0.15)
          ));
      }

      c /= 8.0;

      vec3 baseColor = vec3(0.1, 0.9, 0.6);
      vec3 finalColor = baseColor * smoothstep(0.0, 1.0, c * 0.9);

      fragColor = vec4(finalColor, 1.0);
  }

  void main() {
      vec4 fragColor;
      vec2 fragCoord = vUv * u_resolution.xy;
      mainImage(fragColor, fragCoord);
      gl_FragColor = fragColor;
  }
`;

interface HeroProps {
    title: string;
    description: string;
    badgeText?: string;
    badgeLabel?: string;
    ctaButtons?: Array<{ text: string; href?: string; primary?: boolean; onClick?: () => void }>;
    microDetails?: Array<string>;
}



const SyntheticHero = ({
    title,
    description,
    badgeText,
    badgeLabel,
    ctaButtons = [],
    microDetails = [],
}: HeroProps) => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const badgeWrapperRef = useRef<HTMLDivElement | null>(null);
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const paragraphRef = useRef<HTMLParagraphElement | null>(null);
    const ctaRef = useRef<HTMLDivElement | null>(null);
    const microRef = useRef<HTMLUListElement | null>(null);
    const shaderUniforms = useMemo(
        () => ({
            u_time: { value: 0 },
            u_resolution: { value: new THREE.Vector3(1, 1, 1) },
        }),
        [],
    );

    useGSAP(
        () => {
            // Animate elements in sequence
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            if (badgeWrapperRef.current) gsap.set(badgeWrapperRef.current, { autoAlpha: 0, y: -20 });
            if (headingRef.current) gsap.set(headingRef.current, { autoAlpha: 0, scale: 0.95 });
            if (paragraphRef.current) gsap.set(paragraphRef.current, { autoAlpha: 0, y: 20 });
            if (ctaRef.current) gsap.set(ctaRef.current, { autoAlpha: 0, y: 20 });
            if (microRef.current) gsap.set(microRef.current, { autoAlpha: 0 });

            // 1. Badge drops in
            if (badgeWrapperRef.current) {
                tl.to(badgeWrapperRef.current, { autoAlpha: 1, y: 0, duration: 0.8 });
            }

            // 2. Title fades in (text scramble handles the rest)
            if (headingRef.current) {
                tl.to(headingRef.current, { autoAlpha: 1, scale: 1, duration: 1.0 }, "-=0.4");
            }

            // 3. Description slides up
            if (paragraphRef.current) {
                tl.to(paragraphRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.6");
            }

            // 4. Buttons slide up with elastic bounce
            if (ctaRef.current) {
                tl.to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.6");
            }

            // 5. Micro details fade in
            if (microRef.current) {
                tl.to(microRef.current, { autoAlpha: 1, duration: 1.5 }, "-=0.4");
            }
        },
        { scope: sectionRef },
    );

    return (
        <section
            ref={sectionRef}
            className="relative flex items-center justify-center min-h-screen overflow-hidden bg-black"
        >
            <div className="absolute inset-0 z-0 opacity-80">
                <Canvas>
                    <ShaderPlane
                        vertexShader={vertexShader}
                        fragmentShader={fragmentShader}
                        uniforms={shaderUniforms}
                    />
                </Canvas>
            </div>

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto pointer-events-none">

                {/* Badge */}
                <div ref={badgeWrapperRef} className="pointer-events-auto mb-8">
                    <Badge
                        variant="outline"
                        className="pl-2 pr-4 py-1.5 bg-emerald-950/30 border-emerald-500/20 text-emerald-400 backdrop-blur-md hover:bg-emerald-950/50 hover:border-emerald-500/40 transition-all group"
                    >
                        <span className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">
                                {badgeLabel}
                            </span>
                            <span className="h-3 w-[1px] bg-emerald-500/20 mx-1" />
                            <span className="text-xs font-semibold tracking-wide text-emerald-100 group-hover:text-white transition-colors">
                                {badgeText}
                            </span>
                        </span>
                    </Badge>
                </div>

                <h1
                    ref={headingRef}
                    className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6 pointer-events-auto select-none"
                    style={{ textShadow: "0 0 40px rgba(16, 185, 129, 0.2)" }}
                >
                    {title}
                </h1>

                <p
                    ref={paragraphRef}
                    className="text-emerald-100/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-normal leading-relaxed pointer-events-auto"
                >
                    {description}
                </p>

                <div
                    ref={ctaRef}
                    className="flex flex-wrap items-center justify-center gap-5 pointer-events-auto"
                >
                    {ctaButtons.map((button, index) => {
                        const isPrimary = button.primary ?? index === 0;

                        // Primary Button: Glowing Emerald
                        const primaryClasses = "h-12 px-8 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold tracking-tight shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-0.5";

                        // Secondary Button: Glassy Dark
                        const secondaryClasses = "h-12 px-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium backdrop-blur-md transition-all hover:border-white/20";

                        const classes = isPrimary ? primaryClasses : secondaryClasses;

                        const content = (
                            <>
                                {button.text}
                                {isPrimary ? <ArrowRight className="ml-2 h-4 w-4" /> : null}
                            </>
                        );

                        if (button.href) {
                            return (
                                <Button
                                    key={index}
                                    className={classes}
                                    asChild
                                    onClick={button.onClick}
                                >
                                    <a href={button.href}>{content}</a>
                                </Button>
                            );
                        }

                        return (
                            <Button
                                key={index}
                                className={classes}
                                onClick={button.onClick}
                            >
                                {content}
                            </Button>
                        );
                    })}
                </div>

                {microDetails && microDetails.length > 0 && (
                    <ul
                        ref={microRef}
                        className="mt-16 flex flex-wrap justify-center gap-8 text-xs font-medium tracking-widest uppercase text-emerald-500/40 pointer-events-auto"
                    >
                        {microDetails.map((detail, index) => (
                            <li key={index} className="flex items-center gap-2 hover:text-emerald-400 transition-colors cursor-default">
                                <ShieldCheck className="h-3 w-3" />
                                {detail}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
};

export default SyntheticHero;
