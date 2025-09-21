import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Bio = () => {
  return (
    <section id="about" className="container mx-auto px-4 py-20">
      <div className="grid items-start gap-10 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-6 mb-6">
            <Avatar className="h-32 w-32 border-4 border-primary/20">
              <AvatarImage 
                src="/lovable-uploads/1560e76c-3e03-47d9-b330-2d7de0990775.png" 
                alt="Lavon - Founder" 
                className="object-cover"
              />
              <AvatarFallback>LV</AvatarFallback>
            </Avatar>
            <h2 className="text-3xl font-bold md:text-4xl">Founder Bio</h2>
          </div>
          <p className="mt-4 text-muted-foreground">
            Lavon is currently the Mortgage Broker / Owner of Multiculture Mortgage a Houston-based mortgage company offering a wide range of lending products to new homeowners and investors throughout the Southeast Coast. He is also an active Real Estate Investor / Developer / GC building wealth through multi-family housing in the Houston area. Lavon's unique skill set of lending and boots on the ground development is a very unique operator mix that lends to his success.
          </p>
          <p className="mt-4 text-muted-foreground">
            With a background spanning acquisitions, development, and capital markets, our founder has led multidisciplinary teams delivering strong, risk-adjusted outcomes for private investors. The fund is built on three pillars: integrity, investors-first, and disciplined execution.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li>• 20+ years software engineering experience</li>
            <li>• A Licensed Mortgage Broker</li>
            <li>• 15+ years across the real estate lifecycle</li>
            <li>• A recent 5+ year track record in ground-up and value-add residential construction management</li>
            <li>• Manages Investor Communications, Advising & Reporting</li>
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
      
      {/* Team Member Section */}
      <div className="mt-20 grid items-start gap-10 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-6 mb-6">
            <Avatar className="h-32 w-32 border-4 border-primary/20">
              <AvatarImage 
                src="/lovable-uploads/e1e389de-54a9-427a-a741-41110127af72.png" 
                alt="Diana Woods - Team Member" 
                className="object-cover"
              />
              <AvatarFallback>DW</AvatarFallback>
            </Avatar>
            <h2 className="text-3xl font-bold md:text-4xl">Diana Woods</h2>
          </div>
          <p className="mt-4 text-muted-foreground">
            Diana Woods brings over 15 years of real estate management expertise to Noval Capital Group, specializing in property operations, investment sales, and market analysis. Her journey began in 2008 as the on-site manager of a large multifamily apartment community, where she gained firsthand experience overseeing leasing, maintenance coordination, and tenant relations at scale.
          </p>
          <p className="mt-4 text-muted-foreground">
            Since then, Diana has been instrumental in managing our portfolio of owned investment properties — including both long-term rentals and a growing number of short-term/mid-term Airbnb units. Her responsibilities span everything from day-to-day property oversight to leasing, maintenance management, and investor relationship management. She also leads all Comparable Market Analysis (CMA) work for new acquisitions and sales strategy, ensuring each project is aligned with the latest local comps and investor return goals.
          </p>
          <p className="mt-4 text-muted-foreground">
            Since then, Diana has been instrumental in managing our portfolio of owned investment properties — including both long-term rentals and a growing number of short-term/mid-term Airbnb units. Her responsibilities span everything from day-to-day property oversight to leasing, maintenance management, and investor relationship management. She also leads all Comparable Market Analysis (CMA) work for new acquisitions and sales strategy, ensuring each project is aligned with the latest local comps and investor return goals.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li>• A Licensed National Association Of Realtor Holder</li>
            <li>• 15+ years of property & portfolio management experience</li>
            <li>• Leads investment sales strategy and Comparable Market Analyses (CMAs)</li>
            <li>• Manages day-to-day operations of all in-house LT rentals and STRs</li>
            <li>• With a focus on investor relations and communication</li>
          </ul>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold">Key Responsibilities</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Diana oversees investment analysis, market research, and investor communications, ensuring our investment decisions are data-driven and our stakeholders remain informed throughout each project.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg bg-secondary p-4">
              <p className="font-semibold">Analysis</p>
              <p className="text-muted-foreground">Market research & due diligence</p>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <p className="font-semibold">Communications</p>
              <p className="text-muted-foreground">Investor relations</p>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <p className="font-semibold">Reporting</p>
              <p className="text-muted-foreground">Performance tracking</p>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <p className="font-semibold">Strategy</p>
              <p className="text-muted-foreground">Portfolio optimization</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bio;