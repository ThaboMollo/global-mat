import { Button } from "@/components/ui/button";
import heroMat from "@/assets/hero-mat.jpg";
import { useEffect, useState } from "react";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [heroMat];

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const currentImage = images[currentIndex];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-[background-image] duration-700 ease-in-out"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(29, 41, 57, 0.95), rgba(29, 41, 57, 0.7)), url(${currentImage})`,
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10 animate-fade-in">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Step Into Style —<br />
            <span className="text-accent">One Mat at a Time</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
            Premium custom mat supplies for homes, offices, salons, and shops. 
            Personalized with names, quotes, or logos.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={scrollToContact}
              className="text-lg px-8"
            >
              Get Your Custom Mat
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
              className="text-lg px-8 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 hover:border-primary-foreground/50"
            >
              View Our Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
