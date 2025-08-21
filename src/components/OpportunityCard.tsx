import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, DollarSign, MapPin, ExternalLink, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface OpportunityCardProps {
  id: string;
  title: string;
  organization: string;
  amount: string;
  deadline: string;
  region: string;
  category: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "nueva" | "evaluando" | "preparando" | "presentada";
  description: string;
  tags: string[];
}

const priorityConfig = {
  low: {
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    icon: Clock
  },
  medium: {
    color: "text-warning-foreground",
    bgColor: "bg-warning",
    icon: Clock
  },
  high: {
    color: "text-secondary-foreground",
    bgColor: "bg-secondary",
    icon: AlertTriangle
  },
  urgent: {
    color: "text-danger-foreground",
    bgColor: "bg-danger",
    icon: AlertTriangle
  }
};

const statusConfig = {
  nueva: {
    color: "bg-primary text-primary-foreground",
    label: "Nueva"
  },
  evaluando: {
    color: "bg-warning text-warning-foreground",
    label: "En Evaluación"
  },
  preparando: {
    color: "bg-secondary text-secondary-foreground",
    label: "Preparando"
  },
  presentada: {
    color: "bg-muted text-muted-foreground",
    label: "Presentada"
  }
};

export const OpportunityCard = ({
  title,
  organization,
  amount,
  deadline,
  region,
  category,
  priority,
  status,
  description,
  tags
}: OpportunityCardProps) => {
  const PriorityIcon = priorityConfig[priority].icon;
  const priorityColors = priorityConfig[priority];
  const statusStyles = statusConfig[status];

  const isUrgent = priority === "urgent";
  const daysLeft = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className={cn(
      "group hover:shadow-hover transition-all duration-300 bg-card border-border",
      isUrgent && "ring-2 ring-danger/50 shadow-lg shadow-danger/20"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{organization}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={statusStyles.color}>
              {statusStyles.label}
            </Badge>
            <div className={cn(
              "w-2 h-2 rounded-full",
              priorityColors.bgColor
            )} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Priority & Deadline Alert */}
        {(isUrgent || daysLeft <= 7) && (
          <div className={cn(
            "flex items-center gap-2 p-2 rounded-md",
            isUrgent ? "bg-danger/10 text-danger" : "bg-warning/10 text-warning"
          )}>
            <PriorityIcon className="w-4 h-4" />
            <span className="text-sm font-medium">
              {isUrgent ? "¡Fecha límite urgente!" : `Solo ${daysLeft} días restantes`}
            </span>
          </div>
        )}

        {/* Key Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-card-foreground">
            <DollarSign className="w-4 h-4 text-secondary" />
            <span className="font-medium">{amount}</span>
          </div>
          <div className="flex items-center gap-2 text-card-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{new Date(deadline).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{region}</span>
          </div>
          <div className="text-muted-foreground">
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs px-2 py-1"
            >
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-1">
              +{tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <div className="flex w-full gap-2">
          <Button 
            size="sm" 
            className="flex-1"
            variant={status === "nueva" ? "default" : "outline"}
          >
            {status === "nueva" ? "Evaluar" : "Ver Detalles"}
          </Button>
          <Button size="sm" variant="outline">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};