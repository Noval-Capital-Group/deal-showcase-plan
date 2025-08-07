import { Button } from "@/components/ui/button";

const Bio = () => {
  return (
    <section id="about" className="container mx-auto px-4 py-20">
      <div className="grid items-start gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold md:text-4xl">Founder Bio</h2>
          <p className="mt-4 text-muted-foreground">
            With a background spanning acquisitions, development, and capital markets, our founder has led multidisciplinary teams delivering strong, risk-adjusted outcomes for private investors. The firm is built on three pillars: transparency, alignment, and disciplined execution.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li>• 10+ years across the real estate lifecycle</li>
            <li>• Track record in ground-up and value-add residential</li>
            <li>• Investor-first structures with clear reporting</li>
          </ul>
          <div className="mt-6">
            <Button asChild variant="link">
              <a href="#portfolio">See selected projects →</a>
            </Button>
          </div>
        </div>
        <aside className="rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold">Investment Approach</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            We prioritize downside protection through conservative leverage, resilient locations, and hands-on operations, while creating value via design, construction quality, and efficient asset management.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg bg-secondary p-4">
              <p className="font-semibold">Core Focus</p>
              <p className="text-muted-foreground">Residential infill</p>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <p className="font-semibold">Hold Period</p>
              <p className="text-muted-foreground">24–48 months</p>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <p className="font-semibold">Structure</p>
              <p className="text-muted-foreground">LP/GP aligned</p>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <p className="font-semibold">Reporting</p>
              <p className="text-muted-foreground">Quarterly updates</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Bio;
