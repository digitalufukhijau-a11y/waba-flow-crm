import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Send, Users, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const chartData = [
  { date: "Jan", sent: 1200, delivered: 1150, read: 980 },
  { date: "Feb", sent: 1800, delivered: 1720, read: 1400 },
  { date: "Mar", sent: 2200, delivered: 2100, read: 1800 },
  { date: "Apr", sent: 1900, delivered: 1850, read: 1600 },
  { date: "May", sent: 2800, delivered: 2700, read: 2300 },
  { date: "Jun", sent: 3200, delivered: 3050, read: 2700 },
  { date: "Jul", sent: 2900, delivered: 2800, read: 2500 },
];

const conversationData = [
  { date: "Mon", marketing: 45, utility: 32, authentication: 12 },
  { date: "Tue", marketing: 52, utility: 28, authentication: 18 },
  { date: "Wed", marketing: 38, utility: 41, authentication: 15 },
  { date: "Thu", marketing: 60, utility: 35, authentication: 20 },
  { date: "Fri", marketing: 48, utility: 38, authentication: 10 },
  { date: "Sat", marketing: 30, utility: 20, authentication: 8 },
  { date: "Sun", marketing: 22, utility: 15, authentication: 5 },
];

const stats = [
  { label: "Messages Sent", value: "12,847", change: "+12.5%", up: true, icon: Send, color: "text-primary" },
  { label: "Delivery Rate", value: "96.2%", change: "+0.8%", up: true, icon: TrendingUp, color: "text-info" },
  { label: "Total Conversations", value: "1,284", change: "-3.2%", up: false, icon: MessageSquare, color: "text-warning" },
  { label: "Estimated Cost", value: "$234.50", change: "+8.1%", up: true, icon: DollarSign, color: "text-destructive" },
];

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Overview of your WhatsApp Business performance</p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="animate-scale-in">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                    <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                  </div>
                  <div className={`rounded-xl p-3 bg-muted ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs font-medium">
                  {stat.up ? (
                    <ArrowUpRight className="h-3.5 w-3.5 text-success" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5 text-destructive" />
                  )}
                  <span className={stat.up ? "text-success" : "text-destructive"}>{stat.change}</span>
                  <span className="text-muted-foreground">vs last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Messages Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="sentGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(152, 69%, 49%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(152, 69%, 49%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="deliveredGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(210, 100%, 52%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(210, 100%, 52%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(215, 14%, 50%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 14%, 50%)" />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(214, 20%, 90%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area type="monotone" dataKey="sent" stroke="hsl(152, 69%, 49%)" fillOpacity={1} fill="url(#sentGrad)" strokeWidth={2} />
                  <Area type="monotone" dataKey="delivered" stroke="hsl(210, 100%, 52%)" fillOpacity={1} fill="url(#deliveredGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Conversations by Type</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={conversationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 50%)" />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(214, 20%, 90%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="marketing" fill="hsl(152, 69%, 49%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="utility" fill="hsl(210, 100%, 52%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="authentication" fill="hsl(38, 92%, 55%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Recent Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Ahmad Fauzi", phone: "+62 812-3456-7890", status: "open", lastMsg: "Halo, saya mau tanya promo...", time: "2 min ago" },
                { name: "Siti Rahayu", phone: "+62 813-9876-5432", status: "pending", lastMsg: "Baik, saya tunggu infonya", time: "15 min ago" },
                { name: "Budi Santoso", phone: "+62 857-1234-5678", status: "closed", lastMsg: "Terima kasih, sudah diterima", time: "1 hour ago" },
                { name: "Dewi Lestari", phone: "+62 821-5678-1234", status: "open", lastMsg: "Apakah masih available?", time: "2 hours ago" },
              ].map((conv) => (
                <div key={conv.phone} className="flex items-center gap-4 rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {conv.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-card-foreground">{conv.name}</span>
                      <span className="text-xs text-muted-foreground">{conv.phone}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.lastMsg}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] text-muted-foreground">{conv.time}</span>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      conv.status === "open" ? "bg-success/10 text-success" :
                      conv.status === "pending" ? "bg-warning/10 text-warning" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {conv.status}
                    </span>
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

export default Dashboard;
