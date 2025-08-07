import { Building2, BarChart3, LineChart, MapPin } from "lucide-react";
import BlobMosaic from "./BlobMosaic";
import portfolio1 from "@/assets/portfolio-1.jpg";

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
            A selection of representative projects across development and value-add strategies.
          </p>
        </header>
        <div className="hidden md:block">
          <BlobMosaic src={portfolio1} alt="Construction progress collage" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DealCard title="Parkside Townhomes" subtitle="Build-to-rent development" metric="2.1x" location="Nashville, TN" />
        <DealCard title="Riverside Flats" subtitle="Value-add multifamily" metric="1.8x" location="Austin, TX" />
        <DealCard title="Elm Street Homes" subtitle="Infill new construction" metric="2.4x" location="Charlotte, NC" />
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
