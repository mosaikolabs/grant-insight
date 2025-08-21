import { useState } from "react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { MetricsCards } from "@/components/MetricsCards";
import { ActiveOpportunities } from "@/components/ActiveOpportunities";
import { OpportunityTimeline } from "@/components/OpportunityTimeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Users, Calendar, Target, Download } from "lucide-react";
import heroImage from "@/assets/dashboard-hero.jpg";

const OverviewModule = () => (
  <div className="space-y-6">
    {/* Hero Section */}
    <div className="relative overflow-hidden rounded-lg bg-gradient-primary p-8 text-primary-foreground">
      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-2">GrantInsight Dashboard</h1>
        <p className="text-lg opacity-90 mb-4">
          Centraliza oportunidades de financiación con inteligencia artificial
        </p>
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="lg">
            <Download className="w-4 h-4 mr-2" />
            Exportar Reporte
          </Button>
          <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
            127 oportunidades activas
          </Badge>
        </div>
      </div>
      <div className="absolute inset-0 opacity-20">
        <img 
          src={heroImage} 
          alt="Dashboard Analytics" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* Metrics */}
    <MetricsCards />

    {/* Main Content Grid */}
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <ActiveOpportunities />
      </div>
      <div className="space-y-6">
        <OpportunityTimeline />
        
        {/* Quick Actions */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Target className="w-4 h-4 mr-2" />
              Nueva Búsqueda IA
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="w-4 h-4 mr-2" />
              Analizar Competidores
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Programar Alertas
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="w-4 h-4 mr-2" />
              Generar Insights
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

const RadarModule = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-foreground">Radar de Oportunidades Futuras</h2>
      <Badge variant="outline">Próximos 6 meses</Badge>
    </div>
    <Card className="bg-card border-border min-h-[400px]">
      <CardContent className="p-8 flex items-center justify-center">
        <div className="text-center">
          <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            Análisis Predictivo en Desarrollo
          </h3>
          <p className="text-muted-foreground">
            Funcionalidad de predicción de convocatorias basada en IA próximamente disponible.
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
);

const WinnersModule = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-foreground">Base de Datos de Ganadores</h2>
      <Badge variant="outline">Análisis Competitivo</Badge>
    </div>
    <Card className="bg-card border-border min-h-[400px]">
      <CardContent className="p-8 flex items-center justify-center">
        <div className="text-center">
          <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            Análisis de Ganadores
          </h3>
          <p className="text-muted-foreground">
            Módulo de inteligencia competitiva y análisis de proyectos financiados.
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
);

const OrganizationsModule = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-foreground">Perfil de Organizaciones</h2>
      <Badge variant="outline">Inteligencia de Entidades</Badge>
    </div>
    <Card className="bg-card border-border min-h-[400px]">
      <CardContent className="p-8 flex items-center justify-center">
        <div className="text-center">
          <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            Perfiles de Financiadores
          </h3>
          <p className="text-muted-foreground">
            Información detallada sobre organizaciones financiadoras y sus patrones.
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
);

const Dashboard = () => {
  const [activeModule, setActiveModule] = useState("overview");

  const renderModule = () => {
    switch (activeModule) {
      case "overview":
        return <OverviewModule />;
      case "radar":
        return <RadarModule />;
      case "active":
        return <ActiveOpportunities />;
      case "winners":
        return <WinnersModule />;
      case "organizations":
        return <OrganizationsModule />;
      default:
        return <OverviewModule />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar 
        activeModule={activeModule} 
        onModuleChange={setActiveModule} 
      />
      <main className="flex-1 p-6">
        {renderModule()}
      </main>
    </div>
  );
};

export default Dashboard;