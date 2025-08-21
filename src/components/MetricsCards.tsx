import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Calendar, Target, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: "up" | "down" | "neutral";
}

const MetricCard = ({ title, value, change, changeLabel, icon: Icon, trend }: MetricCardProps) => {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-secondary";
      case "down":
        return "text-danger";
      default:
        return "text-muted-foreground";
    }
  };

  const getTrendIcon = () => {
    if (trend === "up") return TrendingUp;
    if (trend === "down") return TrendingDown;
    return null;
  };

  const TrendIcon = getTrendIcon();

  return (
    <Card className="hover:shadow-hover transition-all duration-300 bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-card-foreground">{value}</div>
        <div className="flex items-center space-x-1 text-xs">
          {TrendIcon && (
            <TrendIcon className={cn("h-3 w-3", getTrendColor())} />
          )}
          <span className={cn("font-medium", getTrendColor())}>
            {change > 0 ? "+" : ""}{change}%
          </span>
          <span className="text-muted-foreground">{changeLabel}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export const MetricsCards = () => {
  const metrics = [
    {
      title: "Oportunidades Activas",
      value: 127,
      change: 12,
      changeLabel: "vs mes anterior",
      icon: Target,
      trend: "up" as const
    },
    {
      title: "Monto Total Disponible",
      value: "€24.8M",
      change: 8,
      changeLabel: "vs mes anterior", 
      icon: DollarSign,
      trend: "up" as const
    },
    {
      title: "Próximos Cierres",
      value: 23,
      change: -5,
      changeLabel: "esta semana",
      icon: Calendar,
      trend: "neutral" as const
    },
    {
      title: "Nuevas Organizaciones",
      value: 14,
      change: 18,
      changeLabel: "este mes",
      icon: Users,
      trend: "up" as const
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};