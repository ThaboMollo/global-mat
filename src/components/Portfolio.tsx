import mat1 from "@/assets/mat-1.jpg";
import mat2 from "@/assets/mat-2.jpg";
import mat3 from "@/assets/mat-3.jpg";
import mat4 from "@/assets/mat-4.jpg";

const portfolio = [
  { image: mat1, title: "Welcome Mat", category: "Residential" },
  { image: mat2, title: "Safety Exit Mat", category: "Commercial" },
  { image: mat3, title: "Corporate Branding", category: "Corporate" },
  { image: mat4, title: "Residence Welcome", category: "Residential" },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Portfolio
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing our premium custom mat designs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolio.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 w-full">
                  <h3 className="text-xl font-semibold text-primary-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-primary-foreground/80 text-sm">
                    {item.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
