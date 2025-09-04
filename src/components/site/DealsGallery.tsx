import { useState } from "react";
import { ZoomIn } from "lucide-react";
import BlobMosaic from "./BlobMosaic";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface DealRowProps {
  title: string;
  location: string;
  type: string;
  status: string;
  profit: string;
  story: string;
  mainImage: string;
  thumbnails: string[];
  isReversed?: boolean;
  rowIndex?: number;
}

const DealRow: React.FC<DealRowProps> = ({ 
  title, 
  location, 
  type, 
  status,
  profit,
  story,
  mainImage, 
  thumbnails, 
  isReversed = false,
  rowIndex = 0
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const lightboxSlides = thumbnails.map(src => ({ src }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  return (
    <div className={`flex flex-col lg:flex-row gap-8 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
      {/* Main Image */}
      <div className="flex-1">
        <BlobMosaic src={mainImage} alt={`${title} main view`} incIndex={rowIndex} />
      </div>
      
      {/* Content and Thumbnails */}
      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {type}
            </span>
            <span className="bg-accent/10 text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
              {status}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-foreground">{title}</h3>
          <p className="text-muted-foreground flex items-center gap-1">
            <span>📍</span> {location}
          </p>
        </div>
        
        {/* Thumbnails Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {thumbnails.map((thumb, index) => (
            <div 
              key={index} 
              className="aspect-square relative group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <img
                src={thumb}
                alt={`${title} view ${index + 1}`}
                className="h-full w-full object-cover rounded-full opacity-80 group-hover:opacity-100 transition-opacity"
                loading="lazy"
              />
              {/* Hover Zoom Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/60 rounded-full p-3 animate-pulse">
                  <ZoomIn className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Profit Return Section */}
        <div className="pt-6 border-t border-border/50">
          <div className="text-center lg:text-left">
            <p className="text-sm text-muted-foreground mb-2">Deal Returns</p>
            <p className="text-3xl md:text-4xl font-bold text-primary">{profit}</p>
          </div>
        </div>
        
        {/* Story Section */}
        <div className="pt-6 border-t border-border/50">
          <div className="text-center lg:text-left">
            <p className="text-sm text-muted-foreground mb-2">The Story Behind The Deal</p>
            <p className="text-2xl md:text-2xl text-primary">{story}</p>
          </div>
        </div>

        {/* Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={lightboxSlides}
        />
      </div>
    </div>
  );
};

const DealsGallery = () => {
  const deals = [
    {
      title: "9622 Kinder Lane (Build-to-STR Development)",
      location: "Sunny Side, Houston, Texas",
      type: "Build-to-Rent",
      status: "Completed",
      profit: "$160,000+",
      story: "We built this duplex back in 2019 by hiring a builder. I paid 37,500 for the land, and approximately 200K for construction. I sold this property for 430K 2 years later!",
      mainImage: "/lovable-uploads/9622Kinder/IMG_4889.JPG",
      thumbnails: [
        "/lovable-uploads/9622Kinder/IMG_LivingRoom_2.jpeg",
        "/lovable-uploads/9622Kinder/IMG_MasterBath.JPG",
        "/lovable-uploads/9622Kinder/IMG_MasterBedroom.jpeg",
      ]
    },
    {
      title: "1021 Calvin Ave (Build-to-Sell Multifamily)",
      location: "Acres Homes, Houston, Texas", 
      type: "Build-to-Sell",
      status: "Completed",
      profit: "$100,000+",
      story: "We purchased the land for this duplex for 45K and split it in half by subdividing it into two lots. On Lot 1 I built this duplex for 260K and sold it for 398K.",
      mainImage: "/lovable-uploads/1021Calvin/IMG_Exterior.jpeg",
      thumbnails: [
        "/lovable-uploads/1021Calvin/IMG_MasterBedroom.jpeg",
        "/lovable-uploads/1021Calvin/IMG_LivingRoom.jpeg",
        "/lovable-uploads/1021Calvin/IMG_MasterBath.jpeg",
        "/lovable-uploads/1021Calvin/IMG_2ndBath.jpeg",
        "/lovable-uploads/1021Calvin/IMG_Kitchen.jpeg",
        "/lovable-uploads/1021Calvin/IMG_TwinBeds.jpeg",
      ]
    },
    {
      title: "1017 Calvin Ave (Build-to-STR Multifamily)",
      location: "Acres Homes, Houston, Texas",
      type: "Build-to-STR",
      status: "Completed",
      profit: "$160,000+",
      story: "This was the second duplex on Lot 2 that we previously purchased for 45K. We built this one for about 340K during the peak of the pandemic which may have been the worse time to build a property in america from a supply chain perspective in the last probably 50 years. We sold this project for the highest in the area at $550K.",
      mainImage: "/lovable-uploads/1017Calvin/IMG_Exterior.jpg",
      thumbnails: [
        "/lovable-uploads/1017Calvin/IMG_EntryStairs.jpg",
        "/lovable-uploads/1017Calvin/IMG_Kitchen_2.jpg",
        "/lovable-uploads/1017Calvin/IMG_Kitchen_3.jpg",
        "/lovable-uploads/1017Calvin/IMG_Kitchen.jpg",
        "/lovable-uploads/1017Calvin/IMG_Living.jpg",
        "/lovable-uploads/1017Calvin/IMG_MasterBedroom.jpg",
        "/lovable-uploads/1017Calvin/IMG_MasterBath.jpg",
        "/lovable-uploads/1017Calvin/IMG_2ndBath.jpg",
        "/lovable-uploads/1017Calvin/IMG_Laundry.jpg",
      ]
    },
    {
      title: "4921 & 4923 Pederson St. (Build-to-Rent Multifamily)",
      location: "South Side, Houston, Texas",
      type: "Build-to-Rent", 
      status: "Completed",
      profit: "$200,000+",
      story: "We completed these two duplexes at the end of last year (2024). Total build costs was around 460K all in per duplex which included land and holding costs. These duplexes appraised for 600K each. This is a prime example of the type of projects we invest in. These are the projects the generate great multiples on original capital invested.",
      mainImage: "/lovable-uploads/PedersonSt/IMG_Exterior.jpg",
      thumbnails: [
        "/lovable-uploads/PedersonSt/IMG_Exterior_2.jpg",
        "/lovable-uploads/PedersonSt/IMG_Exterior_Rear.jpg",
        "/lovable-uploads/PedersonSt/IMG_Exterior_Rear_2.jpg",  
        "/lovable-uploads/PedersonSt/IMG_StairEntry.jpg",
        "/lovable-uploads/PedersonSt/IMG_StairEntry_Upstairs.jpg",
        "/lovable-uploads/PedersonSt/IMG_Upstairs_Island.jpg",
        "/lovable-uploads/PedersonSt/IMG_Balcony_2.jpg",
        "/lovable-uploads/PedersonSt/IMG_LivingRoom.jpg",
        "/lovable-uploads/PedersonSt/IMG_Kitchen.jpg",
        "/lovable-uploads/PedersonSt/IMG_Hallway.jpg",
        "/lovable-uploads/PedersonSt/IMG_2ndRoom.jpg",
        "/lovable-uploads/PedersonSt/IMG_2ndBathroom.jpg",
        "/lovable-uploads/PedersonSt/IMG_MasterBedroom.jpg",
        "/lovable-uploads/PedersonSt/IMG_MasterBath.jpg",
      ]
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-primary">Investment</span> Portfolio
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our carefully curated collection of real estate investments across key markets, 
            each selected for its potential to deliver exceptional returns.
          </p>
        </div>
        
        <div className="space-y-24">
          {deals.map((deal, index) => (
            <DealRow 
              key={index}
              {...deal}
              isReversed={index % 2 === 1}
              rowIndex={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsGallery;