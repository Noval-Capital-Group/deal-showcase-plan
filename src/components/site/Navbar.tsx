import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#" className="font-semibold">Noval Capital Group</a>
        <div className="hidden items-center gap-6 sm:flex">
          <a href="#portfolio" className="text-sm text-muted-foreground hover:text-foreground">Portfolio</a>
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground">About</a>
          <a href="#book" className="text-sm text-muted-foreground hover:text-foreground">Book a Call</a>
          <Button asChild size="sm" variant="premium">
            <a href="#book" aria-label="Book an investor call">Invest</a>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
