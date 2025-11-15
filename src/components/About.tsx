import { CheckCircle2 } from "lucide-react";

const features = [
  "Premium quality materials",
  "Custom designs & logos",
  "Fast turnaround times",
  "Durable & long-lasting",
  "Competitive pricing",
  "Professional service",
];

const About = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Global Mat
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We are a leading provider of premium custom mat supplies, specializing 
              in personalized doormats for homes, offices, salons, and shops. Our 
              commitment to quality and customer satisfaction has made us the trusted 
              choice for custom mat solutions.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Whether you need a single custom mat for your residence or bulk orders 
              for a commercial project, we deliver exceptional results that exceed 
              expectations.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 shadow-[var(--shadow-elegant)]">
              <div className="bg-background/95 rounded-xl p-8">
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  Why Choose Us?
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Quality Materials</h4>
                    <p className="text-muted-foreground">
                      We use only the finest materials to ensure durability and 
                      long-lasting performance.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Custom Design</h4>
                    <p className="text-muted-foreground">
                      Bring your vision to life with fully customizable designs, 
                      logos, and text options.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Expert Service</h4>
                    <p className="text-muted-foreground">
                      Our team provides professional guidance from concept to 
                      delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
