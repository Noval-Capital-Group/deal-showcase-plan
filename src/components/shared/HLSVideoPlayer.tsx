import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Volume2 } from "lucide-react";
import Hls from "hls.js";
import VideoProgressForm from "@/components/shared/VideoProgressForm";

interface HLSVideoPlayerProps {
    videoUrl: string;
    autoPlay?: boolean;
    showControls?: boolean;
    showUnmuteButton?: boolean;
    onVideoReady?: () => void;
    onError?: (error: any) => void;
    className?: string;
    containerClassName?: string;
    unmuteButtonPosition?: "center" | "bottom";
    componentName?: string; // For debugging
    enableProgressGate?: boolean; // Show form overlay at specified percentage
    progressGatePercentage?: number; // Percentage to trigger form (0-100)
    enablePlayheadStorage?: boolean; // Store/restore playhead position
    onProgressGateSubmit?: (data: { name: string; email: string; phone: string; consent: boolean }) => void;
}

export interface HLSVideoPlayerRef {
    play: () => Promise<void>;
    pause: () => void;
    reset: () => void;
    setMuted: (muted: boolean) => void;
    getCurrentTime: () => number;
    setCurrentTime: (time: number) => void;
    isPlaying: () => boolean;
    isMuted: () => boolean;
}

const HLSVideoPlayer = forwardRef<HLSVideoPlayerRef, HLSVideoPlayerProps>(({
    videoUrl,
    autoPlay = false,
    showControls = true,
    showUnmuteButton = true,
    onVideoReady,
    onError,
    className = "w-screen h-full object-cover",
    containerClassName = "relative w-full h-full",
    unmuteButtonPosition = "center",
    componentName = "HLSVideoPlayer",
    enableProgressGate = false,
    progressGatePercentage = 20,
    enablePlayheadStorage = false,
    onProgressGateSubmit
}, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const [isVideoMuted, setIsVideoMuted] = useState(true);
    const [hasUnmutedOnce, setHasUnmutedOnce] = useState(false);
    const [isVideoReady, setIsVideoReady] = useState(false);
    const [showProgressForm, setShowProgressForm] = useState(false);
    const [isGatePaused, setIsGatePaused] = useState(false);
    const [hasSubmittedForm, setHasSubmittedForm] = useState(false);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
        play: async () => {
            if (videoRef.current) {
                return videoRef.current.play();
            }
            return Promise.reject("Video not available");
        },
        pause: () => {
            if (videoRef.current) {
                videoRef.current.pause();
            }
        },
        reset: () => {
            if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.muted = true;
                setIsVideoMuted(true);
                setHasUnmutedOnce(false);
                setShowProgressForm(false);
                setIsGatePaused(false);
                // Don't reset hasSubmittedForm - this should persist
            }
        },
        setMuted: (muted: boolean) => {
            if (videoRef.current) {
                videoRef.current.muted = muted;
                setIsVideoMuted(muted);
            }
        },
        getCurrentTime: () => {
            return videoRef.current?.currentTime || 0;
        },
        setCurrentTime: (time: number) => {
            if (videoRef.current) {
                videoRef.current.currentTime = time;
            }
        },
        isPlaying: () => {
            return videoRef.current ? !videoRef.current.paused : false;
        },
        isMuted: () => {
            return videoRef.current ? videoRef.current.muted : true;
        }
    }));

    // Check if form was previously submitted
    useEffect(() => {
        if (enableProgressGate && videoUrl) {
            const storageKey = `video_form_submitted_${btoa(videoUrl)}`;
            const hasSubmitted = localStorage.getItem(storageKey) === 'true';
            setHasSubmittedForm(hasSubmitted);
            console.log(`${componentName}: Form submission status:`, hasSubmitted);
        }
    }, [enableProgressGate, videoUrl, componentName]);

    // Load stored playhead position
    useEffect(() => {
        if (enablePlayheadStorage && videoRef.current && videoUrl && isVideoReady) {
            const storageKey = `video_playhead_${btoa(videoUrl)}`;
            console.log(`${componentName}: Storage key for restore:`, storageKey);
            console.log(`${componentName}: Video URL for storage:`, videoUrl);
            const storedTime = localStorage.getItem(storageKey);
            console.log(`${componentName}: Stored time found:`, storedTime);
            if (storedTime) {
                const time = parseFloat(storedTime);
                if (!isNaN(time) && time > 0) {
                    videoRef.current.currentTime = time;
                    console.log(`${componentName}: Restored playhead position:`, time);
                }
            }
        }
    }, [enablePlayheadStorage, videoUrl, isVideoReady, componentName]);

    // Save playhead position
    useEffect(() => {
        if (!enablePlayheadStorage || !videoRef.current || !videoUrl) return;

        const video = videoRef.current;
        const storageKey = `video_playhead_${btoa(videoUrl)}`;

        const handleTimeUpdate = () => {
            if (video.currentTime > 0) {
                localStorage.setItem(storageKey, video.currentTime.toString());
            }
        };

        video.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [enablePlayheadStorage, videoUrl]);

    // Progress gate logic - enforce watch gate continuously
    useEffect(() => {
        if (!enableProgressGate || !videoRef.current) return;

        const video = videoRef.current;

        const handleTimeUpdate = () => {
            if (video.duration > 0 && !hasSubmittedForm) {
                const percentage = (video.currentTime / video.duration) * 100;
                const gateTimePosition = (progressGatePercentage / 100) * video.duration;

                // If user tries to watch or scrub past the gate without submitting form
                if (video.currentTime >= gateTimePosition) {
                    video.pause();
                    video.currentTime = gateTimePosition; // Keep at gate position
                    setShowProgressForm(true);
                    setIsGatePaused(true);
                    console.log(`${componentName}: Watch gate enforced at ${percentage}%`);
                }
            }
        };

        const handleSeeked = () => {
            // Also check when user manually scrubs the video
            handleTimeUpdate();
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('seeked', handleSeeked);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('seeked', handleSeeked);
        };
    }, [enableProgressGate, progressGatePercentage, hasSubmittedForm, componentName]);

    useEffect(() => {
        if (videoRef.current && videoUrl) {
            const video = videoRef.current;

            console.log(`${componentName}: Starting video initialization`);
            console.log(`${componentName}: Video element available:`, !!video);
            console.log(`${componentName}: Video URL:`, videoUrl);

            // Reset video state
            if (!enablePlayheadStorage) {
                video.currentTime = 0;
            }
            video.muted = true;
            setIsVideoMuted(true);
            setHasUnmutedOnce(false);
            setIsVideoReady(false);
            setShowProgressForm(false);
            setIsGatePaused(false);
            // Don't reset hasSubmittedForm here - it should persist across video reloads

            // Cleanup any existing HLS instance
            if (hlsRef.current) {
                console.log(`${componentName}: Cleaning up existing HLS instance`);
                hlsRef.current.destroy();
                hlsRef.current = null;
            }

            if (Hls.isSupported()) {
                console.log(`${componentName}: Using HLS.js for video playback`);
                const hls = new Hls({
                    startLevel: -1,
                    capLevelToPlayerSize: true,
                    maxBufferLength: 30,
                    maxMaxBufferLength: 60
                });

                hlsRef.current = hls;

                hls.on(Hls.Events.ERROR, (event, data) => {
                    if (data.fatal) {
                        console.error(`${componentName}: Fatal HLS Error:`, event, data);
                        onError?.(data);
                    }
                });

                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    console.log(`${componentName}: Manifest parsed, video ready`);
                    setIsVideoReady(true);
                    onVideoReady?.();

                    if (autoPlay) {
                        video.play().catch(error => {
                            console.error(`${componentName}: Error auto-playing video:`, error);
                        });
                    }
                });

                hls.loadSource(videoUrl);
                hls.attachMedia(video);
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                // Native HLS support (Safari)
                console.log(`${componentName}: Using native HLS support`);
                video.src = videoUrl;

                const handleLoadedData = () => {
                    console.log(`${componentName}: Video data loaded, ready for playback`);
                    setIsVideoReady(true);
                    onVideoReady?.();

                    if (autoPlay) {
                        video.play().catch(error => {
                            console.error(`${componentName}: Error auto-playing video:`, error);
                        });
                    }
                };

                video.addEventListener('loadeddata', handleLoadedData);

                return () => {
                    video.removeEventListener('loadeddata', handleLoadedData);
                };
            } else {
                console.error(`${componentName}: HLS not supported`);
                onError?.({ message: "HLS not supported in this browser" });
            }
        }

        return () => {
            if (hlsRef.current) {
                console.log(`${componentName}: Cleaning up HLS`);
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
        };
    }, [videoUrl, autoPlay, componentName, onVideoReady, onError]);

    const handleProgressFormClose = (submitted = false) => {
        // Only mark as submitted if the form was actually submitted
        if (submitted && videoUrl) {
            const storageKey = `video_form_submitted_${btoa(videoUrl)}`;
            localStorage.setItem(storageKey, 'true');
            setHasSubmittedForm(true);

            // Resume video playback after successful submission
            if (videoRef.current) {
                videoRef.current.play();
            }
        } else {
            // If form was closed without submission, reset the video to beginning and auto-play
            if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch(console.warn);
            }
        }

        setShowProgressForm(false);
        setIsGatePaused(false);

        // Only resume video playback if form was submitted and not muted
        if (submitted && videoRef.current && !isVideoMuted) {
            videoRef.current.play().catch(console.warn);
        }
    };

    const handleVolumeChange = () => {
        if (videoRef.current) {
            const previousMuted = isVideoMuted;
            const currentMuted = videoRef.current.muted;
            setIsVideoMuted(currentMuted);

            // If video was previously muted and is now unmuted for the first time
            if (previousMuted && !currentMuted && !hasUnmutedOnce) {
                setHasUnmutedOnce(true);
                // Only restart from beginning if playhead storage is disabled
                if (!enablePlayheadStorage) {
                    videoRef.current.currentTime = 0;
                }
            }
        }
    };

    const handleUnmuteClick = () => {
        if (videoRef.current) {
            videoRef.current.muted = false;
            setIsVideoMuted(false);
            if (!hasUnmutedOnce) {
                setHasUnmutedOnce(true);
                // Only restart from beginning if playhead storage is disabled
                if (!enablePlayheadStorage) {
                    videoRef.current.currentTime = 0;
                }
            }
        }
    };

    return (
        <div className={containerClassName}>
            <video
                ref={videoRef}
                className={className}
                controls={showControls && !isVideoMuted && !isGatePaused}
                muted
                loop
                playsInline
                onVolumeChange={handleVolumeChange}
            >
                Your browser does not support HLS video streaming.
            </video>

            {/* Progress Gate Form Overlay */}
            {showProgressForm && (
                <VideoProgressForm
                    onClose={handleProgressFormClose}
                    videoUrl={videoUrl}
                />
            )}

            {/* Unmute button - only show when video is muted and ready */}
            {showUnmuteButton && isVideoMuted && isVideoReady && (
                <div
                    className="absolute cursor-pointer z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    onClick={handleUnmuteClick}
                >
                    <div className="flex flex-col items-center">


                        <div className="relative">
                            {/* Pulse animation wrapper */}
                            <div
                                className="relative bg-black/80 backdrop-blur-sm px-6 py-3 rounded-2xl border-2 border-white"
                                style={{
                                    boxShadow: '0 0 0 1.5px rgba(0, 0, 0, 0.08)'
                                }}
                            >
                                {/* Pulse effect */}
                                <div
                                    className="absolute inset-0 rounded-2xl pointer-events-none"
                                    style={{
                                        animation: 'pulse-shadow 1.5s infinite ease-out',
                                        animationName: 'pulse-shadow',
                                        animationDuration: '1.5s',
                                        animationIterationCount: 'infinite',
                                        animationTimingFunction: 'ease-out',
                                    }}
                                ></div>


                                <span className="relative text-white font-bold text-md z-10 flex items-center gap-2 whitespace-nowrap">
                                    <Volume2
                                        size={unmuteButtonPosition === "center" ? 48 : 32}
                                        className="text-white drop-shadow-2xl animate-pulse"
                                    />Turn On Sound
                                </span>
                            </div>

                            {/* CSS Animation */}
                            <style dangerouslySetInnerHTML={{
                                __html: `
                  @keyframes pulse-shadow {
                    0% {
                      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
                    }
                    70% {
                      box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
                    }
                    100% {
                      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
                    }
                  }
                `
                            }} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
});

HLSVideoPlayer.displayName = "HLSVideoPlayer";

export default HLSVideoPlayer;