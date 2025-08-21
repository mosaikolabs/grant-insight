import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart3, 
  Calendar, 
  Database, 
  Search, 
  TrendingUp,
  Target,
  Users,
  Bell,
  Settings,
  FileText
} from "lucide-react";

interface DashboardSidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const sidebarModules = [
  {
    id: "overview",
    label: "Vista General",
    icon: BarChart3,
    description: "Dashboard principal"
  },
  {
    id: "radar",
    label: "Radar Futuras",
    icon: Target,
    description: "Oportunidades previstas"
  },
  {
    id: "active",
    label: "Activas",
    icon: Calendar,
    description: "Convocatorias abiertas"
  },
  {
    id: "winners",
    label: "Ganadores",
    icon: TrendingUp,
    description: "Análisis competitivo"
  },
  {
    id: "organizations",
    label: "Organizaciones",
    icon: Users,
    description: "Perfiles financiadores"
  }
];

const sidebarTools = [
  {
    id: "search",
    label: "Búsqueda",
    icon: Search
  },
  {
    id: "alerts",
    label: "Alertas",
    icon: Bell
  },
  {
    id: "reports",
    label: "Reportes",
    icon: FileText
  },
  {
    id: "settings",
    label: "Configuración",
    icon: Settings
  }
];

export const DashboardSidebar = ({ activeModule, onModuleChange }: DashboardSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "bg-sidebar border-r border-sidebar-border h-screen flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Database className="w-4 h-4 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-bold text-sidebar-foreground">GrantInsight</h2>
              <p className="text-xs text-sidebar-foreground/70">Intelligence Platform</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Modules */}
      <div className="flex-1 p-4 space-y-2">
        <div className="mb-4">
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-2">
              Módulos
            </h3>
          )}
          {sidebarModules.map((module) => {
            const Icon = module.icon;
            const isActive = activeModule === module.id;
            
            return (
              <Button
                key={module.id}
                variant={isActive ? "default" : "ghost"}
                size={isCollapsed ? "icon" : "default"}
                className={cn(
                  "w-full justify-start transition-all duration-200",
                  isActive 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
                onClick={() => onModuleChange(module.id)}
              >
                <Icon className={cn("w-4 h-4", !isCollapsed && "mr-3")} />
                {!isCollapsed && (
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{module.label}</span>
                    <span className="text-xs opacity-70">{module.description}</span>
                  </div>
                )}
              </Button>
            );
          })}
        </div>

        <Separator className="bg-sidebar-border" />

        {/* Tools Section */}
        <div className="space-y-2">
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-2">
              Herramientas
            </h3>
          )}
          {sidebarTools.map((tool) => {
            const Icon = tool.icon;
            
            return (
              <Button
                key={tool.id}
                variant="ghost"
                size={isCollapsed ? "icon" : "default"}
                className={cn(
                  "w-full justify-start text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/30"
                )}
              >
                <Icon className={cn("w-4 h-4", !isCollapsed && "mr-3")} />
                {!isCollapsed && tool.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full text-sidebar-foreground/70 hover:text-sidebar-foreground"
        >
          {isCollapsed ? "→" : "←"}
        </Button>
      </div>
    </div>
  );
};