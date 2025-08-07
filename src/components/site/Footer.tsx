const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Noval Capital Group. All rights reserved.</p>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#about">About</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#book">Book a Call</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
