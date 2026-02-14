import AppLayout from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Copy, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

const templates = [
  { id: 1, name: "Welcome Message", category: "Marketing", status: "approved", content: "Halo {{1}}! Selamat datang di {{2}}. Kami senang Anda bergabung...", lastUpdated: "2 days ago" },
  { id: 2, name: "Order Confirmation", category: "Utility", status: "approved", content: "Pesanan Anda #{{1}} telah dikonfirmasi. Estimasi pengiriman {{2}}...", lastUpdated: "5 days ago" },
  { id: 3, name: "Promo Bulanan", category: "Marketing", status: "pending", content: "Hi {{1}}! Promo spesial bulan ini: diskon hingga {{2}}% untuk semua produk...", lastUpdated: "1 day ago" },
  { id: 4, name: "OTP Verification", category: "Authentication", status: "approved", content: "Kode verifikasi Anda: {{1}}. Berlaku selama 5 menit. Jangan bagikan kode ini.", lastUpdated: "1 week ago" },
  { id: 5, name: "Follow Up Lead", category: "Marketing", status: "rejected", content: "Hi {{1}}, terima kasih sudah menghubungi kami. Apakah ada yang bisa kami bantu?", lastUpdated: "3 days ago" },
  { id: 6, name: "Shipping Update", category: "Utility", status: "approved", content: "Pesanan #{{1}} sedang dalam perjalanan. Track: {{2}}", lastUpdated: "4 days ago" },
];

const statusColors: Record<string, string> = {
  approved: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  rejected: "bg-destructive/10 text-destructive",
};

const categoryColors: Record<string, string> = {
  Marketing: "bg-primary/10 text-primary",
  Utility: "bg-info/10 text-info",
  Authentication: "bg-warning/10 text-warning",
};

const Templates = () => {
  return (
    <AppLayout>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Templates</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your WhatsApp message templates</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Template
          </Button>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9 h-9" placeholder="Search templates..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((tmpl) => (
            <Card key={tmpl.id} className="hover:shadow-md transition-shadow animate-scale-in">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-sm text-card-foreground">{tmpl.name}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${categoryColors[tmpl.category]}`}>
                        {tmpl.category}
                      </span>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColors[tmpl.status]}`}>
                        {tmpl.status}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{tmpl.content}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-muted-foreground">{tmpl.lastUpdated}</span>
                  <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs">
                    <Copy className="h-3 w-3" />
                    Duplicate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Templates;
