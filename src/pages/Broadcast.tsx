import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Send, Clock, CheckCircle2, XCircle, Calendar } from "lucide-react";

const broadcasts = [
  { id: 1, name: "Promo Akhir Tahun", template: "Promo Bulanan", total: 1250, delivered: 1198, failed: 52, status: "completed", date: "2026-02-10" },
  { id: 2, name: "Valentine Special", template: "Welcome Message", total: 890, delivered: 0, failed: 0, status: "scheduled", date: "2026-02-14" },
  { id: 3, name: "Flash Sale Alert", template: "Follow Up Lead", total: 2100, delivered: 2045, failed: 55, status: "completed", date: "2026-02-08" },
  { id: 4, name: "New Product Launch", template: "Welcome Message", total: 500, delivered: 320, failed: 12, status: "in_progress", date: "2026-02-14" },
];

const statusIcons: Record<string, { icon: typeof Send; className: string; label: string }> = {
  completed: { icon: CheckCircle2, className: "text-success", label: "Completed" },
  scheduled: { icon: Clock, className: "text-warning", label: "Scheduled" },
  in_progress: { icon: Send, className: "text-info", label: "In Progress" },
  failed: { icon: XCircle, className: "text-destructive", label: "Failed" },
};

const Broadcast = () => {
  return (
    <AppLayout>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Broadcast</h1>
            <p className="text-sm text-muted-foreground mt-1">Send messages to multiple contacts at once</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Broadcast
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-xl p-3 bg-primary/10">
                <Send className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">4,740</p>
                <p className="text-xs text-muted-foreground">Total Sent</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-xl p-3 bg-success/10">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">96.8%</p>
                <p className="text-xs text-muted-foreground">Delivery Rate</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-xl p-3 bg-warning/10">
                <Calendar className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">1</p>
                <p className="text-xs text-muted-foreground">Scheduled</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Broadcasts list */}
        <div className="space-y-3">
          {broadcasts.map((bc) => {
            const st = statusIcons[bc.status];
            const deliveryRate = bc.total > 0 && bc.delivered > 0 ? ((bc.delivered / bc.total) * 100).toFixed(1) : "—";
            return (
              <Card key={bc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`rounded-xl p-3 bg-muted ${st.className}`}>
                    <st.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm text-card-foreground">{bc.name}</p>
                      <Badge variant="secondary" className="text-[10px]">{bc.template}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{bc.date}</p>
                  </div>
                  <div className="text-right space-y-0.5">
                    <p className="text-sm font-semibold text-card-foreground">{bc.total.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground">recipients</p>
                  </div>
                  <div className="text-right space-y-0.5 w-20">
                    <p className="text-sm font-semibold text-card-foreground">{deliveryRate}%</p>
                    <p className="text-[10px] text-muted-foreground">delivered</p>
                  </div>
                  <div className="w-20 text-right">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                      bc.status === "completed" ? "bg-success/10 text-success" :
                      bc.status === "scheduled" ? "bg-warning/10 text-warning" :
                      bc.status === "in_progress" ? "bg-info/10 text-info" :
                      "bg-destructive/10 text-destructive"
                    }`}>
                      {st.label}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Broadcast;
