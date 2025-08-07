import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp, ShieldCheck, CalendarDays } from "lucide-react";
import BlobMosaic from "./BlobMosaic";
import portfolio2 from "@/assets/portfolio-2.jpg";

const Hero = () => {
  const [hasMotion, setHasMotion] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setHasMotion(!mq.matches);
  }, []);

  return (
    <header className="relative overflow-hidden">
      <div className="container mx-auto grid items-center gap-10 px-4 pb-12 pt-20 md:grid-cols-2 md:pb-20">
        <div>
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Private Real Estate Investments</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
            Returning investor capital n-fold through disciplined real estate
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            We acquire, develop, and operate cash-flowing assets with a focus on risk-managed growth and investor-first transparency.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="hero">
              <a href="#book" aria-label="Book an investor call">
                <CalendarDays className="mr-2" /> Book an Investor Call
              </a>
            </Button>
            <Button asChild size="lg" variant="premium">
              <a href="#portfolio" aria-label="View portfolio">
                <TrendingUp className="mr-2" /> View Portfolio
              </a>
            </Button>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4">
            <div className="rounded-lg border bg-card/60 p-4 backdrop-blur">
              <p className="text-2xl font-bold">$50M+</p>
              <p className="text-xs text-muted-foreground">Total project volume</p>
            </div>
            <div className="rounded-lg border bg-card/60 p-4 backdrop-blur">
              <p className="text-2xl font-bold">18-24%</p>
              <p className="text-xs text-muted-foreground">Target IRR range</p>
            </div>
            <div className="rounded-lg border bg-card/60 p-4 backdrop-blur">
              <p className="text-2xl font-bold">100% LP</p>
              <p className="text-xs text-muted-foreground">Preferred returns first</p>
            </div>
          </div>

          {hasMotion && (
            <div className="pointer-events-none mt-8 flex items-center gap-6 opacity-80">
              <ShieldCheck className="text-primary" />
              <p className="text-sm text-muted-foreground">Institutional discipline. Boutique alignment.</p>
            </div>
          )}
        </div>

        <div className="relative">
          <BlobMosaic src={portfolio2} alt="Modern residential townhomes portfolio collage" />
        </div>
      </div>
    </header>
  );
};

export default Hero;
