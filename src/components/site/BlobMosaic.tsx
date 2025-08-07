import React from "react";

interface BlobMosaicProps {
  src: string;
  alt: string;
}

const BlobMosaic: React.FC<BlobMosaicProps> = ({ src, alt }) => {
  return (
    <div className="blob relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
      <img
        src={src}
        alt={alt}
        className="blob-mask h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

export default BlobMosaic;
