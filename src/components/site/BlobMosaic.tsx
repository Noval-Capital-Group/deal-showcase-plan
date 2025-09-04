import React from "react";

interface BlobMosaicProps {
  src: string;
  alt: string;
  incIndex?: number;
}

const BlobMosaic: React.FC<BlobMosaicProps> = ({ src, alt, incIndex = 0 }) => {
  const maskIndex = (incIndex % 5) + 1; // Cycle through patterns 1-5
  
  return (
    <div className="blob relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
      <img
        src={src}
        alt={alt}
        className={`blob-mask blob-mask-${maskIndex} h-full w-full object-cover`}
        loading="lazy"
      />
    </div>
  );
};

export default BlobMosaic;
