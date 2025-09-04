import { Building2, BarChart3, LineChart, MapPin } from "lucide-react";
import BlobMosaic from "./BlobMosaic";
import portfolio1 from "/lovable-uploads/1017CalvinBuildSplitImage.jpg";

interface DealCardProps {
  title: string;
  subtitle: string;
  metric: string;
  location: string;
}

const DealCard = ({ title, subtitle, metric, location }: DealCardProps) => (
  <article className="group rounded-xl border bg-card p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
    <header className="mb-3 flex items-center gap-3">
      <div className="rounded-lg bg-secondary p-2 text-primary">
        <Building2 />
      </div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </header>
    <dl className="mt-4 flex items-center justify-between">
      <div>
        <dt className="text-xs text-muted-foreground">Projected Equity Multiple</dt>
        <dd className="text-xl font-bold">{metric}</dd>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4" /> {location}
      </div>
    </dl>
  </article>
);

const Portfolio = () => {
  return (
    <section id="portfolio" className="container mx-auto px-4 py-20">
      <div className="mb-10 grid items-center gap-8 md:grid-cols-2">
        <header className="max-w-xl">
          <h2 className="text-3xl font-bold md:text-4xl">Portfolio Highlights</h2>
          <p className="mt-3 text-muted-foreground">
            We have built up a proven track record of delivering strong returns, developing and operating high-quality residential properties in the Houston Texas market. We are vertically integrated, from pre-construction, to final exit either via sale or long term hold.
            With a focus on risk-managed growth and investor-first transparency we want to help you achieve your investment goals. Allow us to help you build your wealth through real estate with strong returns.
          </p>
        </header>
        <div className="hidden md:block">
          <BlobMosaic src={portfolio1} alt="Construction progress collage" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DealCard title="9622 Kinder Lane" subtitle="Build-to-STR development" metric="2.1x" location="Sunny Side, Houston, TX" />
        <DealCard title="1021 & 1017 Calvin Ave" subtitle="Build-to-Sell multifamily" metric="1.8x" location="Acres Homes, Houston, TX" />
        <DealCard title="4921 & 4923 Pederson St." subtitle="Build-to-Rent multifamily" metric="2.4x" location="South Side, Houston, TX" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 rounded-xl border bg-card p-6 md:grid-cols-3">
        <div className="flex items-center gap-3">
          <BarChart3 className="text-primary" />
          <p className="text-sm text-muted-foreground">Data-driven underwriting</p>
        </div>
        <div className="flex items-center gap-3">
          <LineChart className="text-primary" />
          <p className="text-sm text-muted-foreground">Active risk management</p>
        </div>
        <div className="flex items-center gap-3">
          <Building2 className="text-primary" />
          <p className="text-sm text-muted-foreground">Operational excellence</p>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
