import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-investment.jpg";
import { Button } from "@/components/ui/button";
import { TrendingUp, ShieldCheck, CalendarDays } from "lucide-react";

const Hero = () => {
  const [hasMotion, setHasMotion] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setHasMotion(!mq.matches);
  }, []);

  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImage}
          alt="Modern residential real estate development hero image"
          className="h-[70vh] w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/10" />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">Private Real Estate Investments</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          Returning investor capital <sup className="text-2xl md:text-4xl">n</sup>-fold through disciplined real estate
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
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

        <div className="mt-10 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-lg border bg-card/60 p-4 backdrop-blur">
            <p className="text-3xl font-bold">$50M+</p>
            <p className="text-sm text-muted-foreground">Total project volume</p>
          </div>
          <div className="rounded-lg border bg-card/60 p-4 backdrop-blur">
            <p className="text-3xl font-bold">18-24%</p>
            <p className="text-sm text-muted-foreground">Target IRR range</p>
          </div>
          <div className="rounded-lg border bg-card/60 p-4 backdrop-blur">
            <p className="text-3xl font-bold">100% LP</p>
            <p className="text-sm text-muted-foreground">Preferred returns paid first</p>
          </div>
        </div>

        {hasMotion && (
          <div className="pointer-events-none mt-12 flex items-center gap-6 opacity-80">
            <ShieldCheck className="text-primary" />
            <p className="text-sm text-muted-foreground">
              Institutional discipline. Boutique alignment.
            </p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Hero;
