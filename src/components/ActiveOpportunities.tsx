import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OpportunityCard } from "./OpportunityCard";
import { Search, Filter, SortAsc } from "lucide-react";

const mockOpportunities = [
  {
    id: "1",
    title: "Horizonte Europa 2024 - Transformación Digital",
    organization: "Comisión Europea",
    amount: "€2.5M - €15M",
    deadline: "2024-04-15",
    region: "Unión Europea",
    category: "I+D+i",
    priority: "urgent" as const,
    status: "nueva" as const,
    description: "Financiación para proyectos de investigación e innovación en transformación digital, inteligencia artificial y tecnologías emergentes.",
    tags: ["IA", "Digital", "Innovación", "Colaborativo"]
  },
  {
    id: "2", 
    title: "EIT Climate-KIC Accelerator",
    organization: "European Institute of Innovation",
    amount: "€100K - €2M",
    deadline: "2024-05-01",
    region: "Europa",
    category: "Startups",
    priority: "high" as const,
    status: "evaluando" as const,
    description: "Programa de aceleración para startups del sector climático con financiación y mentoring especializado.",
    tags: ["ClimaTech", "Accelerator", "Sostenibilidad"]
  },
  {
    id: "3",
    title: "USAID Innovation Fund",
    organization: "USAID",
    amount: "$500K - $5M", 
    deadline: "2024-06-20",
    region: "Global",
    category: "Desarrollo",
    priority: "medium" as const,
    status: "preparando" as const,
    description: "Financiación para soluciones innovadoras que aborden desafíos de desarrollo global con impacto sostenible.",
    tags: ["Desarrollo", "Impacto Social", "Global", "Innovación"]
  },
  {
    id: "4",
    title: "Bill & Melinda Gates Foundation",
    organization: "Gates Foundation",
    amount: "$1M - $10M",
    deadline: "2024-07-15", 
    region: "Global",
    category: "Salud",
    priority: "low" as const,
    status: "presentada" as const,
    description: "Financiación para proyectos de salud global, reducción de la pobreza y equidad educativa.",
    tags: ["Salud Global", "Pobreza", "Educación"]
  }
];

export const ActiveOpportunities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("todas");

  const filteredOpportunities = mockOpportunities.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = selectedStatus === "todas" || opportunity.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: "todas", label: "Todas", count: mockOpportunities.length },
    { value: "nueva", label: "Nuevas", count: mockOpportunities.filter(o => o.status === "nueva").length },
    { value: "evaluando", label: "En Evaluación", count: mockOpportunities.filter(o => o.status === "evaluando").length },
    { value: "preparando", label: "Preparando", count: mockOpportunities.filter(o => o.status === "preparando").length },
    { value: "presentada", label: "Presentadas", count: mockOpportunities.filter(o => o.status === "presentada").length }
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-card-foreground">
            Convocatorias Activas
          </CardTitle>
          <Badge variant="outline" className="px-3 py-1">
            {filteredOpportunities.length} oportunidades
          </Badge>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar oportunidades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Status Filter */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline" size="sm">
              <SortAsc className="w-4 h-4 mr-2" />
              Ordenar
            </Button>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2 mt-4">
          {statusOptions.map((status) => (
            <Button
              key={status.value}
              variant={selectedStatus === status.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus(status.value)}
              className="h-8"
            >
              {status.label}
              <Badge 
                variant="secondary" 
                className="ml-2 text-xs px-1.5 py-0.5 min-w-[20px] h-5"
              >
                {status.count}
              </Badge>
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {filteredOpportunities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No se encontraron oportunidades que coincidan con los filtros seleccionados.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} {...opportunity} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};