import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

const BookCall = () => {
  return (
    <section id="book" className="container mx-auto px-4 py-20">
      <div className="rounded-xl border bg-card p-8 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Book an Investor Call</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Choose a time that works for you. We’ll discuss your goals, our process, and current opportunities.
        </p>
        <div className="mt-6">
          <Button asChild size="lg" variant="hero">
            {/* TODO: Replace with your actual calendar link */}
            <a href="https://cal.com/your-name/intro" target="_blank" rel="noreferrer">
              Open Calendar
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BookCall;
