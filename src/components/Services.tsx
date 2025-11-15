import { Home, Building2, Store, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Home,
    title: "Residential",
    description: "Elegant custom mats for homes and residences with personalized designs",
  },
  {
    icon: Building2,
    title: "Corporate",
    description: "Professional branded mats for offices and corporate spaces",
  },
  {
    icon: Store,
    title: "Commercial",
    description: "Durable custom mats for shops, salons, and retail spaces",
  },
  {
    icon: Users,
    title: "Bulk Orders",
    description: "Special rates for events, property developers, and large orders",
  },
];

const Services = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            High-quality, durable materials perfect for any space
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1 animate-slide-in border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
