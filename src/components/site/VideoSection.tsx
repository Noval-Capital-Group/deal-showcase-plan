import { Play } from "lucide-react";
import { useState, useRef } from "react";
import { HLSVideoPlayerRef } from "@/components/shared/HLSVideoPlayer";
import HLSVideoPlayer from "@/components/shared/HLSVideoPlayer";

const VideoSection = () => {
  const videoPlayerRef = useRef<HLSVideoPlayerRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    
    <section className="w-full bg-black">
      <div className="w-full">

        {/* Video Container - Full screen width */}
        <div className="w-full">
          <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
            <HLSVideoPlayer
              ref={videoPlayerRef}
              videoUrl="https://vz-447b6532-fd2.b-cdn.net/1a6ce0a5-ac96-423c-b8f0-b3f61da9cb6a/playlist.m3u8"
              autoPlay={true}
              showControls={true}
              className="w-screen h-full object-cover"
              containerClassName="relative w-screen h-full"
            />
          </div>
        </div>
      </div>
    </section>

  );
};

export default VideoSection;