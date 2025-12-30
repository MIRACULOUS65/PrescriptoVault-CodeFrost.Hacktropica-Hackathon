"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stethoscope, Users, Building2, Shield, ArrowRight } from "lucide-react";
import * as THREE from "three";

type Uniforms = {
    [key: string]: {
        value: number[] | number[][] | number;
        type: string;
    };
};

interface ShaderProps {
    source: string;
    uniforms: Uniforms;
    maxFps?: number;
}

interface SignInFlowProps {
    className?: string;
    mode?: "signin" | "signup";
}

type UserRole = "doctor" | "patient" | "pharmacy" | null;

// Canvas Reveal Effect Component
export const CanvasRevealEffect = ({
    animationSpeed = 10,
    opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
    colors = [[16, 185, 129]], // Emerald color
    containerClassName,
    dotSize,
    showGradient = true,
    reverse = false,
}: {
    animationSpeed?: number;
    opacities?: number[];
    colors?: number[][];
    containerClassName?: string;
    dotSize?: number;
    showGradient?: boolean;
    reverse?: boolean;
}) => {
    return (
        <div className={cn("h-full relative w-full", containerClassName)}>
            <div className="h-full w-full">
                <DotMatrix
                    colors={colors ?? [[16, 185, 129]]}
                    dotSize={dotSize ?? 3}
                    opacities={opacities ?? [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]}
                    shader={`${reverse ? 'u_reverse_active' : 'false'}_;animation_speed_factor_${animationSpeed.toFixed(1)}_;`}
                    center={["x", "y"]}
                />
            </div>
            {showGradient && (
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
            )}
        </div>
    );
};

interface DotMatrixProps {
    colors?: number[][];
    opacities?: number[];
    totalSize?: number;
    dotSize?: number;
    shader?: string;
    center?: ("x" | "y")[];
}

const DotMatrix: React.FC<DotMatrixProps> = ({
    colors = [[16, 185, 129]],
    opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
    totalSize = 20,
    dotSize = 2,
    shader = "",
    center = ["x", "y"],
}) => {
    const uniforms = React.useMemo(() => {
        let colorsArray = [colors[0], colors[0], colors[0], colors[0], colors[0], colors[0]];
        if (colors.length === 2) {
            colorsArray = [colors[0], colors[0], colors[0], colors[1], colors[1], colors[1]];
        } else if (colors.length === 3) {
            colorsArray = [colors[0], colors[0], colors[1], colors[1], colors[2], colors[2]];
        }
        return {
            u_colors: {
                value: colorsArray.map((color) => [color[0] / 255, color[1] / 255, color[2] / 255]),
                type: "uniform3fv",
            },
            u_opacities: { value: opacities, type: "uniform1fv" },
            u_total_size: { value: totalSize, type: "uniform1f" },
            u_dot_size: { value: dotSize, type: "uniform1f" },
            u_reverse: { value: shader.includes("u_reverse_active") ? 1 : 0, type: "uniform1i" },
        };
    }, [colors, opacities, totalSize, dotSize, shader]);

    return (
        <Shader
            source={`
        precision mediump float;
        in vec2 fragCoord;
        uniform float u_time;
        uniform float u_opacities[10];
        uniform vec3 u_colors[6];
        uniform float u_total_size;
        uniform float u_dot_size;
        uniform vec2 u_resolution;
        uniform int u_reverse;
        out vec4 fragColor;

        float PHI = 1.61803398874989484820459;
        float random(vec2 xy) {
            return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
        }

        void main() {
            vec2 st = fragCoord.xy;
            ${center.includes("x") ? "st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));" : ""}
            ${center.includes("y") ? "st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));" : ""}

            float opacity = step(0.0, st.x);
            opacity *= step(0.0, st.y);

            vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));
            float frequency = 5.0;
            float show_offset = random(st2);
            float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency));
            opacity *= u_opacities[int(rand * 10.0)];
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

            vec3 color = u_colors[int(show_offset * 6.0)];

            float animation_speed_factor = 0.5;
            vec2 center_grid = u_resolution / 2.0 / u_total_size;
            float dist_from_center = distance(center_grid, st2);
            float timing_offset_intro = dist_from_center * 0.01 + (random(st2) * 0.15);
            float max_grid_dist = distance(center_grid, vec2(0.0, 0.0));
            float timing_offset_outro = (max_grid_dist - dist_from_center) * 0.02 + (random(st2 + 42.0) * 0.2);

            float current_timing_offset;
            if (u_reverse == 1) {
                current_timing_offset = timing_offset_outro;
                opacity *= 1.0 - step(current_timing_offset, u_time * animation_speed_factor);
                opacity *= clamp((step(current_timing_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
            } else {
                current_timing_offset = timing_offset_intro;
                opacity *= step(current_timing_offset, u_time * animation_speed_factor);
                opacity *= clamp((1.0 - step(current_timing_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
            }

            fragColor = vec4(color, opacity);
            fragColor.rgb *= fragColor.a;
        }`}
            uniforms={uniforms}
            maxFps={60}
        />
    );
};

const ShaderMaterial = ({ source, uniforms, maxFps = 60 }: { source: string; maxFps?: number; uniforms: Uniforms }) => {
    const { size } = useThree();
    const ref = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const material: any = ref.current.material;
        const timeLocation = material.uniforms.u_time;
        timeLocation.value = clock.getElapsedTime();
    });

    const getUniforms = () => {
        const preparedUniforms: any = {};
        for (const uniformName in uniforms) {
            const uniform: any = uniforms[uniformName];
            switch (uniform.type) {
                case "uniform1f": preparedUniforms[uniformName] = { value: uniform.value, type: "1f" }; break;
                case "uniform1i": preparedUniforms[uniformName] = { value: uniform.value, type: "1i" }; break;
                case "uniform3f": preparedUniforms[uniformName] = { value: new THREE.Vector3().fromArray(uniform.value), type: "3f" }; break;
                case "uniform1fv": preparedUniforms[uniformName] = { value: uniform.value, type: "1fv" }; break;
                case "uniform3fv": preparedUniforms[uniformName] = { value: uniform.value.map((v: number[]) => new THREE.Vector3().fromArray(v)), type: "3fv" }; break;
                case "uniform2f": preparedUniforms[uniformName] = { value: new THREE.Vector2().fromArray(uniform.value), type: "2f" }; break;
                default: console.error(`Invalid uniform type for '${uniformName}'.`); break;
            }
        }
        preparedUniforms["u_time"] = { value: 0, type: "1f" };
        preparedUniforms["u_resolution"] = { value: new THREE.Vector2(size.width * 2, size.height * 2) };
        return preparedUniforms;
    };

    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            vertexShader: `
      precision mediump float;
      in vec2 coordinates;
      uniform vec2 u_resolution;
      out vec2 fragCoord;
      void main(){
        float x = position.x;
        float y = position.y;
        gl_Position = vec4(x, y, 0.0, 1.0);
        fragCoord = (position.xy + vec2(1.0)) * 0.5 * u_resolution;
        fragCoord.y = u_resolution.y - fragCoord.y;
      }`,
            fragmentShader: source,
            uniforms: getUniforms(),
            glslVersion: THREE.GLSL3,
            blending: THREE.CustomBlending,
            blendSrc: THREE.SrcAlphaFactor,
            blendDst: THREE.OneFactor,
        });
    }, [size.width, size.height, source]);

    return (
        <mesh ref={ref as any}>
            <planeGeometry args={[2, 2]} />
            <primitive object={material} attach="material" />
        </mesh>
    );
};

const Shader: React.FC<ShaderProps> = ({ source, uniforms, maxFps = 60 }) => {
    return (
        <Canvas className="absolute inset-0 h-full w-full">
            <ShaderMaterial source={source} uniforms={uniforms} maxFps={maxFps} />
        </Canvas>
    );
};

export const SignInFlow = ({ className, mode = "signin" }: SignInFlowProps) => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [step, setStep] = useState<"email" | "role" | "code" | "success">("email");
    const [selectedRole, setSelectedRole] = useState<UserRole>(null);
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const codeInputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [initialCanvasVisible, setInitialCanvasVisible] = useState(true);
    const [reverseCanvasVisible, setReverseCanvasVisible] = useState(false);

    const roles = [
        { id: "doctor" as const, title: "Doctor", description: "Prescribe & manage patients", icon: Stethoscope, color: "from-blue-500/20 to-blue-600/20" },
        { id: "patient" as const, title: "Patient", description: "Access your health vault", icon: Users, color: "from-emerald-500/20 to-emerald-600/20" },
        { id: "pharmacy" as const, title: "Pharmacy", description: "Verify & dispense", icon: Building2, color: "from-purple-500/20 to-purple-600/20" },
    ];

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setStep("role");
        }
    };

    const handleRoleSelect = (role: UserRole) => {
        setSelectedRole(role);
        setTimeout(() => setStep("code"), 300);
    };

    useEffect(() => {
        if (step === "code") {
            setTimeout(() => codeInputRefs.current[0]?.focus(), 500);
        }
    }, [step]);

    const handleCodeChange = (index: number, value: string) => {
        if (value.length <= 1) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            if (value && index < 5) codeInputRefs.current[index + 1]?.focus();
            if (index === 5 && value && newCode.every(digit => digit.length === 1)) {
                setReverseCanvasVisible(true);
                setTimeout(() => setInitialCanvasVisible(false), 50);
                setTimeout(() => setStep("success"), 2000);
                setTimeout(() => router.push(`/${selectedRole}`), 3000);
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            codeInputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className={cn("flex w-full flex-col min-h-screen bg-black relative", className)}>
            <div className="absolute inset-0 z-0">
                {initialCanvasVisible && (
                    <div className="absolute inset-0">
                        <CanvasRevealEffect animationSpeed={3} containerClassName="bg-black" colors={[[16, 185, 129]]} dotSize={6} reverse={false} />
                    </div>
                )}
                {reverseCanvasVisible && (
                    <div className="absolute inset-0">
                        <CanvasRevealEffect animationSpeed={4} containerClassName="bg-black" colors={[[16, 185, 129]]} dotSize={6} reverse={true} />
                    </div>
                )}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,1)_0%,_transparent_100%)]" />
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col flex-1">
                <div className="flex flex-1 flex-col justify-center items-center px-4">
                    <div className="w-full max-w-md mt-20">
                        <AnimatePresence mode="wait">
                            {step === "email" && <EmailStep email={email} setEmail={setEmail} handleSubmit={handleEmailSubmit} mode={mode} />}
                            {step === "role" && <RoleStep roles={roles} onSelect={handleRoleSelect} onBack={() => setStep("email")} />}
                            {step === "code" && <CodeStep code={code} codeInputRefs={codeInputRefs} handleCodeChange={handleCodeChange} handleKeyDown={handleKeyDown} onBack={() => setStep("role")} />}
                            {step === "success" && <SuccessStep />}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Email Step Component
const EmailStep = ({ email, setEmail, handleSubmit, mode }: any) => {
    const router = useRouter();

    return (
        <motion.div key="email-step" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.4 }} className="space-y-6 text-center">
            <div className="flex items-center justify-center mb-6">
                <Shield className="h-12 w-12 text-emerald-400" />
            </div>
            <div className="space-y-1">
                <h1 className="text-4xl font-bold text-white">Welcome to PrescriptoVault</h1>
                <p className="text-lg text-emerald-100/60">{mode === "signin" ? "Sign in to your account" : "Create your account"}</p>
            </div>
            <div className="space-y-4">
                <form onSubmit={handleSubmit} className="relative">
                    <input type="email" placeholder="your.email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full backdrop-blur-[1px] bg-emerald-950/10 text-white border border-emerald-500/20 rounded-full py-3 px-4 focus:outline-none focus:border-emerald-500/40 text-center placeholder:text-emerald-100/30" required />
                    <button type="submit" className="absolute right-1.5 top-1.5 text-white w-9 h-9 flex items-center justify-center rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 transition-colors">
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </form>
            </div>
            <p className="text-xs text-emerald-100/30 pt-10">Secured by blockchain technology</p>


            {/* Bypass Auth Button */}
            <div className="pt-8 border-t border-emerald-500/10">
                <p className="text-xs text-emerald-100/20 mb-3">Development Mode</p>
                <button
                    onClick={() => router.push('/admin')}
                    className="px-6 py-2 text-xs rounded-full bg-red-950/30 border border-red-500/20 text-red-400 hover:bg-red-950/50 transition-colors"
                >
                    → Admin Dashboard
                </button>
            </div>
        </motion.div>
    );
};

// Role Step Component  
const RoleStep = ({ roles, onSelect, onBack }: any) => (
    <motion.div key="role-step" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} transition={{ duration: 0.4 }} className="space-y-6">
        <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold text-white">Select Your Role</h1>
            <p className="text-emerald-100/60">Choose how you'll use PrescriptoVault</p>
        </div>
        <div className="space-y-3">
            {roles.map((role: any) => (
                <motion.button key={role.id} onClick={() => onSelect(role.id)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full p-4 rounded-xl bg-emerald-950/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all text-left group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 group-hover:bg-emerald-950/50 transition-colors">
                            <role.icon className="h-6 w-6 text-emerald-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-white">{role.title}</h3>
                            <p className="text-sm text-emerald-100/50">{role.description}</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </motion.button>
            ))}
        </div>
        <button onClick={onBack} className="w-full py-3 rounded-full border border-emerald-500/20 text-emerald-100/60 hover:text-white hover:border-emerald-500/40 transition-colors">
            Back
        </button>
    </motion.div>
);

// Code Step Component
const CodeStep = ({ code, codeInputRefs, handleCodeChange, handleKeyDown, onBack }: any) => (
    <motion.div key="code-step" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} transition={{ duration: 0.4 }} className="space-y-6 text-center">
        <div className="space-y-1">
            <h1 className="text-3xl font-bold text-white">Verification Code</h1>
            <p className="text-emerald-100/60">Enter the 6-digit code sent to your email</p>
        </div>
        <div className="relative rounded-full py-4 px-5 border border-emerald-500/20 bg-emerald-950/5">
            <div className="flex items-center justify-center gap-2">
                {code.map((digit: string, i: number) => (
                    <input key={i} ref={(el) => { codeInputRefs.current[i] = el; }} type="text" inputMode="numeric" pattern="[0-9]*" maxLength={1} value={digit} onChange={e => handleCodeChange(i, e.target.value)} onKeyDown={e => handleKeyDown(i, e)} className="w-10 h-12 text-center text-xl bg-transparent text-white border-b-2 border-emerald-500/30 focus:border-emerald-400 focus:outline-none" style={{ caretColor: 'transparent' }} />
                ))}
            </div>
        </div>
        <button onClick={onBack} className="w-full py-3 rounded-full border border-emerald-500/20 text-emerald-100/60 hover:text-white hover:border-emerald-500/40 transition-colors">
            Back
        </button>
    </motion.div>
);

// Success Step Component
const SuccessStep = () => (
    <motion.div key="success-step" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="space-y-6 text-center">
        <div className="space-y-1">
            <h1 className="text-3xl font-bold text-white">Welcome!</h1>
            <p className="text-emerald-100/60">Redirecting to your dashboard...</p>
        </div>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="py-10">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <svg className="h-8 w-8 text-black" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </div>
        </motion.div>
    </motion.div>
);
