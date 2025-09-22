import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

const BookCall = () => {
  return (
    <section id="book" className="container mx-auto px-4 py-20">
      <div className="rounded-xl border bg-card p-8 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Book an Investor Call</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Choose a time that works for you. We’ll discuss your goals, our process, and current opportunities.
        </p>
        <div className="mt-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" variant="hero">
                Open Calendar
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[80vh] p-0">
              <iframe
                src="https://novalcapitalgroup.com/?fluent-booking=calendar&host=a10fa273_admin&event=investor-call-30min"
                className="w-full h-full rounded-lg"
                title="Book Investor Call"
                frameBorder="0"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default BookCall;
