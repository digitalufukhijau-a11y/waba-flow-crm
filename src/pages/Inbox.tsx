import AppLayout from "@/components/AppLayout";
import { useState } from "react";
import { Search, Paperclip, Send, MoreVertical, Phone, Video, Smile } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const conversations = [
  { id: 1, name: "Ahmad Fauzi", phone: "+62 812-3456-7890", lastMsg: "Halo, saya mau tanya promo...", time: "2m", unread: 3, status: "open" as const },
  { id: 2, name: "Siti Rahayu", phone: "+62 813-9876-5432", lastMsg: "Baik, saya tunggu infonya", time: "15m", unread: 0, status: "pending" as const },
  { id: 3, name: "Budi Santoso", phone: "+62 857-1234-5678", lastMsg: "Terima kasih, sudah diterima", time: "1h", unread: 0, status: "closed" as const },
  { id: 4, name: "Dewi Lestari", phone: "+62 821-5678-1234", lastMsg: "Apakah masih available?", time: "2h", unread: 1, status: "open" as const },
  { id: 5, name: "Rudi Hermawan", phone: "+62 878-4321-8765", lastMsg: "Oke siap, saya order ya", time: "3h", unread: 0, status: "open" as const },
];

const messages = [
  { id: 1, sender: "customer", content: "Halo, saya mau tanya promo bulan ini ada apa aja ya?", time: "10:30 AM" },
  { id: 2, sender: "agent", content: "Halo Pak Ahmad! Terima kasih sudah menghubungi kami. Untuk bulan ini kami punya promo diskon 30% untuk semua produk elektronik.", time: "10:32 AM" },
  { id: 3, sender: "customer", content: "Wah menarik! Kalau untuk laptop apa aja yang masuk promo?", time: "10:33 AM" },
  { id: 4, sender: "agent", content: "Untuk laptop, kami punya beberapa pilihan:\n\n1. ASUS VivoBook - Rp 7.5jt (diskon jadi Rp 5.25jt)\n2. Lenovo IdeaPad - Rp 8jt (diskon jadi Rp 5.6jt)\n3. HP Pavilion - Rp 9jt (diskon jadi Rp 6.3jt)\n\nMau yang mana Pak?", time: "10:35 AM" },
  { id: 5, sender: "customer", content: "Yang ASUS VivoBook boleh. Bisa COD ga?", time: "10:38 AM" },
];

const Inbox = () => {
  const [activeConv, setActiveConv] = useState(1);
  const [message, setMessage] = useState("");

  return (
    <AppLayout>
      <div className="flex h-screen">
        {/* Conversation list */}
        <div className="w-[340px] border-r border-border flex flex-col bg-card">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-card-foreground mb-3">Inbox</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9 h-9 text-sm" placeholder="Search conversations..." />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConv(conv.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-border/50",
                  activeConv === conv.id ? "bg-accent" : "hover:bg-muted/50"
                )}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                  {conv.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm text-card-foreground">{conv.name}</span>
                    <span className="text-[10px] text-muted-foreground">{conv.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.lastMsg}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="h-16 border-b border-border flex items-center justify-between px-4 bg-card">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">AF</div>
              <div>
                <p className="font-medium text-sm text-card-foreground">Ahmad Fauzi</p>
                <p className="text-xs text-muted-foreground">+62 812-3456-7890 · Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8"><Phone className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><Video className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex",
                  msg.sender === "agent" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[65%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    msg.sender === "agent"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-card text-card-foreground border border-border rounded-bl-md"
                  )}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <p className={cn(
                    "text-[10px] mt-1",
                    msg.sender === "agent" ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message input */}
          <div className="border-t border-border p-3 bg-card flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0"><Smile className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0"><Paperclip className="h-5 w-5" /></Button>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 h-9"
            />
            <Button size="icon" className="h-9 w-9 shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Contact info panel */}
        <div className="w-[280px] border-l border-border bg-card p-4 space-y-4 hidden xl:block">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl">AF</div>
            <p className="font-semibold text-card-foreground mt-3">Ahmad Fauzi</p>
            <p className="text-xs text-muted-foreground">+62 812-3456-7890</p>
          </div>
          <div className="space-y-3 pt-2">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Tags</p>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {["VIP", "Electronics", "Repeat"].map(tag => (
                  <span key={tag} className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium text-accent-foreground">{tag}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Source</p>
              <p className="text-sm text-card-foreground mt-1">Facebook Ads</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Assigned Agent</p>
              <p className="text-sm text-card-foreground mt-1">Sarah Admin</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Notes</p>
              <p className="text-xs text-muted-foreground mt-1">Interested in laptop promo. Follow up tomorrow.</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Inbox;
