import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AnnouncementBarProps {
    onDismiss: () => void;
}

export function AnnouncementBar({ onDismiss }: AnnouncementBarProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [timeLeft, setTimeLeft] = useState("");
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Countdown Logic
        const calculateTimeLeft = () => {
            const now = new Date();
            const midnight = new Date(now);
            midnight.setHours(24, 0, 0, 0);
            const diff = midnight.getTime() - now.getTime();

            if (diff > 0) {
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / 1000 / 60) % 60);
                const seconds = Math.floor((diff / 1000) % 60);
                return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
            } else {
                return "00h 00m 00s";
            }
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = canvas.parentElement?.offsetHeight || 48; // Fallback to 48px if 0
        };

        // Initial set
        updateCanvasSize();

        const particles: { x: number; y: number; radius: number; speed: number; opacity: number }[] = [];
        const particleCount = 50;

        const initParticles = () => {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 1,
                    speed: Math.random() * 1 + 0.5,
                    opacity: Math.random() * 0.5 + 0.3
                });
            }
        };

        initParticles();

        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                ctx.fill();

                p.y += p.speed;
                p.x += Math.sin(p.y * 0.05) * 0.5;

                if (p.y > canvas.height) {
                    p.y = -5;
                    p.x = Math.random() * canvas.width;
                }
            });

            requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            updateCanvasSize();
            // Re-distribute particles if needed, or let them fall naturally
        };

        window.addEventListener('resize', handleResize);

        // Also observe the element for size changes (animation completion)
        const resizeObserver = new ResizeObserver(() => {
            updateCanvasSize();
        });
        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            resizeObserver.disconnect();
        };
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        setTimeout(onDismiss, 300); // Wait for animation to finish
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full bg-violet-600/30 backdrop-blur-xl border-b border-white/10 shadow-lg text-white overflow-hidden z-[60]"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/40 via-purple-600/40 to-indigo-600/40 pointer-events-none"></div>
                    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-80" />

                    <div className="container mx-auto px-4 h-10 md:h-12 flex items-center justify-between relative z-10">
                        <div className="flex-1 flex items-center justify-center gap-2 md:gap-3 text-[11px] md:text-sm font-medium tracking-wide">
                            {/* Badge - Hidden on very small screens, visible on sm+ */}
                            <span className="hidden sm:flex items-center gap-1.5 md:gap-2 animate-pulse-glow bg-white/10 px-2 py-0.5 rounded-full border border-white/20">
                                <Sparkles size={12} className="text-yellow-300 fill-yellow-300" />
                                <span className="font-bold text-yellow-100">LIMITED OFFER</span>
                            </span>

                            <span className="hidden lg:inline text-white/90">
                                Launch your dream app today!
                            </span>

                            <div className="flex items-center gap-2 group">
                                {/* Mobile Text (< sm) */}
                                <span className="sm:hidden flex items-center gap-2 text-center truncate max-w-[200px] xs:max-w-none">
                                    <span className="text-yellow-200 font-bold">30% OFF</span>
                                    <span className="w-px h-3 bg-white/30 mx-0.5"></span>
                                    <span className="font-mono text-xs opacity-90 tracking-tight">{timeLeft}</span>
                                </span>

                                {/* Desktop/Tablet Text (>= sm) */}
                                <span className="hidden sm:inline">
                                    Get <span className="font-bold text-white border-b border-white/40">30% OFF</span> App Publishing!
                                </span>

                                <Link
                                    to="/order"
                                    className="inline-flex items-center gap-1 bg-white text-indigo-600 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold hover:bg-indigo-50 transition-colors shadow-lg shadow-black/10 group-hover:scale-105 duration-200 whitespace-nowrap"
                                >
                                    <span className="sm:hidden">Claim</span>
                                    <span className="hidden sm:inline">Publish Now</span>
                                    <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        <button
                            onClick={handleDismiss}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
                            aria-label="Dismiss announcement"
                        >
                            <X size={14} className="md:w-4 md:h-4 text-white/80 hover:text-white" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
