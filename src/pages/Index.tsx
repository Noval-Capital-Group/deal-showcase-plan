import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Portfolio from "@/components/site/Portfolio";
import Bio from "@/components/site/Bio";
import BookCall from "@/components/site/BookCall";
import Footer from "@/components/site/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Noval Capital Group",
    "url": siteUrl,
    "description": "Private real estate investment group offering risk-managed returns and transparent reporting.",
  };

  return (
    <>
      <Helmet>
        <title>Investment Group | Book Investor Call & View Portfolio</title>
        <meta name="description" content="Private real estate investment group. Book an investor call and explore our portfolio and founder bio." />
        <link rel="canonical" href={siteUrl} />
        <meta property="og:title" content="Investment Group | Book Investor Call & View Portfolio" />
        <meta property="og:description" content="Private real estate investment group. Book an investor call and explore our portfolio and founder bio." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <Bio />
        <BookCall />
      </main>
      <Footer />
    </>
  );
};

export default Index;
