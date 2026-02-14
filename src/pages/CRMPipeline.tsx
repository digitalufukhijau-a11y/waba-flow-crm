import AppLayout from "@/components/AppLayout";
import { useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Plus, User, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Lead {
  id: string;
  name: string;
  phone: string;
  value: number;
  source: string;
  agent: string;
  score: number;
}

interface Column {
  id: string;
  title: string;
  color: string;
  leads: Lead[];
}

const initialColumns: Column[] = [
  {
    id: "new-lead",
    title: "New Lead",
    color: "hsl(210, 100%, 52%)",
    leads: [
      { id: "l1", name: "Ahmad Fauzi", phone: "+62 812-xxx", value: 5250000, source: "Facebook Ads", agent: "Sarah", score: 75 },
      { id: "l2", name: "Dewi Lestari", phone: "+62 821-xxx", value: 3200000, source: "Google Ads", agent: "Budi", score: 60 },
      { id: "l3", name: "Rina Wati", phone: "+62 856-xxx", value: 1500000, source: "Organic", agent: "Sarah", score: 40 },
    ],
  },
  {
    id: "contacted",
    title: "Contacted",
    color: "hsl(38, 92%, 55%)",
    leads: [
      { id: "l4", name: "Budi Santoso", phone: "+62 857-xxx", value: 8000000, source: "Instagram", agent: "Admin", score: 80 },
      { id: "l5", name: "Rudi Hermawan", phone: "+62 878-xxx", value: 12000000, source: "Referral", agent: "Sarah", score: 90 },
    ],
  },
  {
    id: "follow-up",
    title: "Follow Up",
    color: "hsl(280, 65%, 60%)",
    leads: [
      { id: "l6", name: "Siti Rahayu", phone: "+62 813-xxx", value: 4500000, source: "WhatsApp", agent: "Budi", score: 65 },
    ],
  },
  {
    id: "won",
    title: "Won",
    color: "hsl(152, 69%, 49%)",
    leads: [
      { id: "l7", name: "Joko Widodo", phone: "+62 811-xxx", value: 15000000, source: "Referral", agent: "Admin", score: 100 },
    ],
  },
  {
    id: "lost",
    title: "Lost",
    color: "hsl(0, 72%, 55%)",
    leads: [],
  },
];

const formatRupiah = (value: number) => `Rp ${(value / 1000000).toFixed(1)}jt`;

const LeadCard = ({ lead, isDragging }: { lead: Lead; isDragging?: boolean }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: lead.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "rounded-lg border border-border bg-card p-3 cursor-grab active:cursor-grabbing transition-shadow",
        isDragging && "shadow-lg opacity-50"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold">
            {lead.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <p className="text-sm font-medium text-card-foreground leading-tight">{lead.name}</p>
            <p className="text-[11px] text-muted-foreground">{lead.phone}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <DollarSign className="h-3 w-3" />
          <span className="font-medium text-card-foreground">{formatRupiah(lead.value)}</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <User className="h-3 w-3" />
          {lead.agent}
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{lead.source}</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="h-1.5 w-12 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-primary" style={{ width: `${lead.score}%` }} />
          </div>
          <span className="text-[10px] text-muted-foreground">{lead.score}</span>
        </div>
      </div>
    </div>
  );
};

const CRMPipeline = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const activeLeadId = active.id as string;
    const overColumnId = over.id as string;

    // Find source column
    const sourceCol = columns.find(col => col.leads.some(l => l.id === activeLeadId));
    if (!sourceCol) return;

    // Find target column (could be a lead id or column id)
    let targetCol = columns.find(col => col.id === overColumnId);
    if (!targetCol) {
      targetCol = columns.find(col => col.leads.some(l => l.id === overColumnId));
    }
    if (!targetCol || sourceCol.id === targetCol.id) return;

    const lead = sourceCol.leads.find(l => l.id === activeLeadId)!;
    setColumns(columns.map(col => {
      if (col.id === sourceCol.id) return { ...col, leads: col.leads.filter(l => l.id !== activeLeadId) };
      if (col.id === targetCol!.id) return { ...col, leads: [...col.leads, lead] };
      return col;
    }));
  };

  const activeLead = activeId ? columns.flatMap(c => c.leads).find(l => l.id === activeId) : null;

  return (
    <AppLayout>
      <div className="p-6 space-y-4 h-screen flex flex-col">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">CRM Pipeline</h1>
            <p className="text-sm text-muted-foreground mt-1">Drag leads between stages to update their status</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Lead
          </Button>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex-1 flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
            {columns.map((col) => {
              const totalValue = col.leads.reduce((s, l) => s + l.value, 0);
              return (
                <div key={col.id} className="w-[280px] shrink-0 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ background: col.color }} />
                    <span className="text-sm font-semibold text-foreground">{col.title}</span>
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-1.5 text-[10px] font-bold text-muted-foreground">
                      {col.leads.length}
                    </span>
                    <span className="ml-auto text-[11px] font-medium text-muted-foreground">{formatRupiah(totalValue)}</span>
                  </div>
                  <SortableContext id={col.id} items={col.leads.map(l => l.id)} strategy={verticalListSortingStrategy}>
                    <div className="flex-1 space-y-2 rounded-lg bg-muted/40 p-2 min-h-[200px]" id={col.id}>
                      {col.leads.map((lead) => (
                        <LeadCard key={lead.id} lead={lead} isDragging={lead.id === activeId} />
                      ))}
                      {col.leads.length === 0 && (
                        <div className="flex items-center justify-center h-20 text-xs text-muted-foreground border-2 border-dashed border-border rounded-lg">
                          Drop leads here
                        </div>
                      )}
                    </div>
                  </SortableContext>
                </div>
              );
            })}
          </div>
          <DragOverlay>
            {activeLead ? <LeadCard lead={activeLead} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </AppLayout>
  );
};

export default CRMPipeline;
