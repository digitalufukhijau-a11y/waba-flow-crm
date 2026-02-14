import AppLayout from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Filter, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const contacts = [
  { id: 1, name: "Ahmad Fauzi", phone: "+62 812-3456-7890", email: "ahmad@email.com", tags: ["VIP", "Electronics"], source: "Facebook Ads", lastInteraction: "2 hours ago" },
  { id: 2, name: "Siti Rahayu", phone: "+62 813-9876-5432", email: "siti@email.com", tags: ["New"], source: "Organic", lastInteraction: "1 day ago" },
  { id: 3, name: "Budi Santoso", phone: "+62 857-1234-5678", email: "budi@email.com", tags: ["Repeat", "Fashion"], source: "Instagram Ads", lastInteraction: "3 days ago" },
  { id: 4, name: "Dewi Lestari", phone: "+62 821-5678-1234", email: "dewi@email.com", tags: ["Lead"], source: "Google Ads", lastInteraction: "5 hours ago" },
  { id: 5, name: "Rudi Hermawan", phone: "+62 878-4321-8765", email: "rudi@email.com", tags: ["VIP", "Wholesale"], source: "Referral", lastInteraction: "1 hour ago" },
  { id: 6, name: "Rina Wati", phone: "+62 856-7890-1234", email: "rina@email.com", tags: ["New"], source: "WhatsApp", lastInteraction: "30 min ago" },
];

const Contacts = () => {
  return (
    <AppLayout>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Contacts</h1>
            <p className="text-sm text-muted-foreground mt-1">{contacts.length} total customers</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Contact
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9 h-9" placeholder="Search contacts..." />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </Button>
        </div>

        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Tags</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Source</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Interaction</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs">
                        {contact.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-card-foreground">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">{contact.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{contact.phone}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {contact.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0">{tag}</Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{contact.source}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{contact.lastInteraction}</td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default Contacts;
