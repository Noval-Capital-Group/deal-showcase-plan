import { Play } from "lucide-react";
import { useState } from "react";

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <section className="relative w-full bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold md:text-5xl">See Our Process in Action</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how we transform properties and deliver exceptional returns for our investors
          </p>
        </div>
        
        <div className="relative aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden bg-secondary">
          {!isPlaying ? (
            <div 
              className="relative w-full h-full bg-gradient-to-br from-primary/20 to-secondary cursor-pointer group"
              onClick={handlePlayVideo}
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center justify-center w-20 h-20 bg-primary rounded-full group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-semibold">Investment Overview</h3>
                <p className="text-white/80">Click to play video</p>
              </div>
            </div>
          ) : (
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
              title="Investment Process Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;