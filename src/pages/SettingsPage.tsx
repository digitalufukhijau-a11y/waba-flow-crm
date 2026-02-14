import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Phone, Wifi, WifiOff, Users, Shield, Plus } from "lucide-react";

const teamMembers = [
  { id: 1, name: "Sarah Admin", email: "sarah@company.com", role: "Owner", status: "active", conversations: 24 },
  { id: 2, name: "Budi Agent", email: "budi@company.com", role: "Agent", status: "active", conversations: 18 },
  { id: 3, name: "Rina Support", email: "rina@company.com", role: "Agent", status: "active", conversations: 12 },
  { id: 4, name: "Admin User", email: "admin@company.com", role: "Admin", status: "inactive", conversations: 0 },
];

const roleColors: Record<string, string> = {
  Owner: "bg-warning/10 text-warning",
  Admin: "bg-info/10 text-info",
  Agent: "bg-primary/10 text-primary",
};

const SettingsPage = () => {
  return (
    <AppLayout>
      <div className="p-6 space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your workspace and WhatsApp connection</p>
        </div>

        {/* WABA Connection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              WhatsApp Business API
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-success/5 border border-success/20">
              <Wifi className="h-5 w-5 text-success" />
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">Connected</p>
                <p className="text-xs text-muted-foreground">Phone: +62 21-1234-5678 · WABA ID: 1234567890</p>
              </div>
              <Button variant="outline" size="sm">Disconnect</Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">WABA ID</label>
                <Input value="1234567890" className="mt-1 h-9" readOnly />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Phone Number ID</label>
                <Input value="9876543210" className="mt-1 h-9" readOnly />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Team Members
            </CardTitle>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              Invite
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-card-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${roleColors[member.role]}`}>
                    {member.role}
                  </span>
                  <div className="text-right w-20">
                    <p className="text-sm font-semibold text-card-foreground">{member.conversations}</p>
                    <p className="text-[10px] text-muted-foreground">active chats</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
