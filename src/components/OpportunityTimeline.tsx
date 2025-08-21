import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  id: string;
  title: string;
  organization: string;
  date: string;
  type: "opening" | "deadline" | "result";
  amount: string;
  region: string;
  confidence: "alta" | "media" | "baja";
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    title: "Horizonte Europa - Cluster Digital",
    organization: "Comisión Europea",
    date: "2024-03-15",
    type: "opening",
    amount: "€150M",
    region: "UE",
    confidence: "alta"
  },
  {
    id: "2", 
    title: "Innovation Fund - Clean Tech",
    organization: "EIT Climate-KIC",
    date: "2024-03-20",
    type: "deadline",
    amount: "€50M",
    region: "Europa",
    confidence: "alta"
  },
  {
    id: "3",
    title: "Global Innovation Challenge",
    organization: "USAID",
    date: "2024-04-01",
    type: "opening",
    amount: "$75M",
    region: "Global",
    confidence: "media"
  },
  {
    id: "4",
    title: "Results: Green Transition Fund",
    organization: "BEI",
    date: "2024-04-10",
    type: "result",
    amount: "€200M",
    region: "UE",
    confidence: "alta"
  }
];

const getEventTypeConfig = (type: TimelineEvent["type"]) => {
  switch (type) {
    case "opening":
      return {
        color: "bg-secondary",
        textColor: "text-secondary-foreground",
        label: "Apertura",
        dotColor: "bg-secondary"
      };
    case "deadline":
      return {
        color: "bg-warning", 
        textColor: "text-warning-foreground",
        label: "Cierre",
        dotColor: "bg-warning"
      };
    case "result":
      return {
        color: "bg-primary",
        textColor: "text-primary-foreground", 
        label: "Resultados",
        dotColor: "bg-primary"
      };
  }
};

const getConfidenceColor = (confidence: TimelineEvent["confidence"]) => {
  switch (confidence) {
    case "alta":
      return "text-secondary border-secondary";
    case "media":
      return "text-warning border-warning";
    case "baja":
      return "text-muted-foreground border-muted-foreground";
  }
};

export const OpportunityTimeline = () => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <Calendar className="w-5 h-5 text-primary" />
          Timeline de Oportunidades
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {timelineEvents.map((event, index) => {
            const typeConfig = getEventTypeConfig(event.type);
            const isLast = index === timelineEvents.length - 1;
            
            return (
              <div key={event.id} className="relative">
                {/* Timeline Line */}
                {!isLast && (
                  <div className="absolute left-4 top-8 w-0.5 h-16 bg-border"></div>
                )}
                
                {/* Timeline Dot */}
                <div className={cn(
                  "absolute left-2 top-2 w-4 h-4 rounded-full border-2 border-background",
                  typeConfig.dotColor
                )}></div>
                
                {/* Content */}
                <div className="ml-10 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-card-foreground">
                        {event.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {event.organization}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        className={cn(typeConfig.color, typeConfig.textColor)}
                      >
                        {typeConfig.label}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={cn("text-xs", getConfidenceColor(event.confidence))}
                      >
                        {event.confidence}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(event.date).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {event.region}
                    </div>
                    <div className="font-medium text-card-foreground">
                      {event.amount}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};