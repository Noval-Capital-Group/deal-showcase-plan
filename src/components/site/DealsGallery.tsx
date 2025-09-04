import BlobMosaic from "./BlobMosaic";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface DealRowProps {
  title: string;
  location: string;
  type: string;
  status: string;
  mainImage: string;
  thumbnails: string[];
  isReversed?: boolean;
}

const DealRow: React.FC<DealRowProps> = ({ 
  title, 
  location, 
  type, 
  status, 
  mainImage, 
  thumbnails, 
  isReversed = false 
}) => {
  return (
    <div className={`flex flex-col lg:flex-row gap-8 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
      {/* Main Image */}
      <div className="flex-1">
        <BlobMosaic src={mainImage} alt={`${title} main view`} />
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
            <AspectRatio key={index} ratio={4/3}>
              <img
                src={thumb}
                alt={`${title} view ${index + 1}`}
                className="blob-mask h-full w-full object-cover rounded-lg opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                loading="lazy"
              />
            </AspectRatio>
          ))}
        </div>
      </div>
    </div>
  );
};

const DealsGallery = () => {
  const deals = [
    {
      title: "Modern Mixed-Use Development",
      location: "Austin, Texas",
      type: "Development",
      status: "Active",
      mainImage: "/lovable-uploads/1017CalvinBuildSplitImage.jpg",
      thumbnails: [
        "/lovable-uploads/1017CalvinBuildSplitImage.jpg",
        "/lovable-uploads/1017CalvinBuildSplitImage.jpg",
        "/lovable-uploads/1017CalvinBuildSplitImage.jpg",
      ]
    },
    {
      title: "Urban Residential Complex",
      location: "Denver, Colorado", 
      type: "Acquisition",
      status: "Completed",
      mainImage: "/lovable-uploads/1017CalvinBuildSplitImage.jpg",
      thumbnails: [
        "/lovable-uploads/1017CalvinBuildSplitImage.jpg",
        "/lovable-uploads/1017CalvinBuildSplitImage.jpg",
        "/lovable-uploads/1017CalvinBuildSplitImage.jpg",
      ]
    },
    {
      title: "Commercial Office Tower",
      location: "Phoenix, Arizona",
      type: "Value-Add",
      status: "In Progress", 
      mainImage: "/lovable-uploads/1017CalvinBuildSplitImage.jpg",
      thumbnails: [
        "/lovable-uploads/1017CalvinBuildSplitImage.jpg",
        "/lovable-uploads/1017CalvinBuildSplitImage.jpg",
        "/lovable-uploads/1017CalvinBuildSplitImage.jpg",
      ]
    },
    {
      title: "Luxury Retail Center",
      location: "Miami, Florida",
      type: "Development", 
      status: "Planning",
      mainImage: "/lovable-uploads/1017CalvinBuildSplitImage.jpg",
      thumbnails: [
        "/lovable-uploads/1017CalvinBuildSplitImage.jpg",
        "/lovable-uploads/1017CalvinBuildSplitImage.jpg",
        "/lovable-uploads/1017CalvinBuildSplitImage.jpg",
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
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsGallery;