import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Database, Target, Calendar, TrendingUp, Users, ArrowRight, BarChart3 } from "lucide-react";
import heroImage from "@/assets/dashboard-hero.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: "Radar de Oportunidades",
      description: "Predicción inteligente de convocatorias futuras basada en análisis histórico y IA.",
      highlight: "Próximos 6 meses"
    },
    {
      icon: Calendar,
      title: "Convocatorias Activas", 
      description: "Gestión en tiempo real de oportunidades abiertas con alertas automatizadas.",
      highlight: "127 activas"
    },
    {
      icon: TrendingUp,
      title: "Análisis de Ganadores",
      description: "Inteligencia competitiva basada en proyectos financiados anteriormente.",
      highlight: "5000+ proyectos"
    },
    {
      icon: Users,
      title: "Perfiles de Financiadores",
      description: "Base de datos completa con patrones de financiación y ciclos predictivos.",
      highlight: "200+ organizaciones"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">GrantInsight</h1>
            </div>
            <Button onClick={() => navigate("/dashboard")}>
              Acceder al Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
        <div className="absolute inset-0 opacity-10">
          <img 
            src={heroImage} 
            alt="Financial Dashboard" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Inteligencia Artificial para Financiación
            </Badge>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Dashboard de Oportunidades de{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Financiación
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Centraliza y analiza oportunidades de financiación con inteligencia artificial. 
              Desde predicción de convocatorias hasta análisis competitivo de ganadores.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate("/dashboard")}
                className="bg-gradient-primary hover:opacity-90"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Explorar Dashboard
              </Button>
              <Button variant="outline" size="lg">
                Ver Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Cuatro Módulos Integrados
            </h2>
            <p className="text-lg text-muted-foreground">
              Una plataforma completa para maximizar tus oportunidades de financiación
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-hover transition-all duration-300 bg-card border-border"
                >
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-card-foreground">
                      {feature.title}
                    </CardTitle>
                    <Badge variant="secondary" className="w-fit">
                      {feature.highlight}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Comienza a Maximizar tus Oportunidades
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Accede al dashboard completo y descubre cómo la IA puede transformar 
            tu estrategia de financiación.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/dashboard")}
            className="bg-gradient-primary hover:opacity-90"
          >
            Acceder al Dashboard
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
