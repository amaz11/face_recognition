import { ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type DashboardCharts = {
  attendanceBreakdown: { name: string; value: number }[];
  examProgress: {
    examLogId: number;
    exam: string;
    enrolled: number;
    seated: number;
    attended: number;
  }[];
  registrationTrend: { date: string; registrations: number }[];
};

const COLORS = {
  indigo: "#6366f1",
  emerald: "#10b981",
  amber: "#f59e0b",
  rose: "#f43f5e",
  sky: "#0ea5e9",
  slate: "#cbd5e1",
};

const DONUT_COLORS = [COLORS.emerald, COLORS.rose, COLORS.amber, COLORS.slate];

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid #e2e8f0",
  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
  fontSize: 13,
};

const ChartCard = ({
  eyebrow,
  title,
  className = "",
  children,
}: {
  eyebrow: string;
  title: string;
  className?: string;
  children: ReactNode;
}) => (
  <div
    className={`p-6 bg-white border shadow-lg rounded-3xl border-slate-100 shadow-slate-200/50 ${className}`}
  >
    <p className="text-xs tracking-wide uppercase text-slate-400">{eyebrow}</p>
    <h3 className="mb-4 text-xl text-slate-900">{title}</h3>
    {children}
  </div>
);

const EmptyState = ({ text }: { text: string }) => (
  <div className="flex items-center justify-center h-64 text-sm text-slate-400">
    {text}
  </div>
);

const AttendanceDonut = ({ data }: { data: DashboardCharts["attendanceBreakdown"] }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  if (total === 0) return <EmptyState text="No student records yet" />;

  return (
    <div className="relative h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="58%"
            outerRadius="82%"
            paddingAngle={3}
            cornerRadius={6}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={DONUT_COLORS[index % DONUT_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-x-0 pointer-events-none top-[38%] text-center">
        <p className="text-3xl font-bold leading-none text-slate-900">{total}</p>
        <p className="text-xs text-slate-400">student records</p>
      </div>
    </div>
  );
};

const SeatCoverageGauge = ({ percentage }: { percentage: number }) => (
  <div className="relative h-72">
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart
        data={[{ name: "Coverage", value: percentage }]}
        innerRadius="70%"
        outerRadius="95%"
        startAngle={210}
        endAngle={-30}
      >
        <defs>
          <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={COLORS.sky} />
            <stop offset="100%" stopColor={COLORS.indigo} />
          </linearGradient>
        </defs>
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar
          dataKey="value"
          cornerRadius={20}
          fill="url(#gaugeGradient)"
          background={{ fill: "#eef2ff" }}
        />
      </RadialBarChart>
    </ResponsiveContainer>
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <p className="text-4xl font-bold text-slate-900">{percentage}%</p>
      <p className="text-xs text-slate-400">of students seated</p>
    </div>
  </div>
);

const ExamProgressBars = ({ data }: { data: DashboardCharts["examProgress"] }) => {
  if (data.length === 0) return <EmptyState text="No exam enrollments yet" />;

  // Several exam logs can share one exam name, so the axis is keyed by the unique
  // exam-log id and the name is only used for display.
  const nameById = new Map(data.map((row) => [row.examLogId, row.exam]));
  const nameOf = (id: number | string) => nameById.get(Number(id)) ?? String(id);

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barGap={4} margin={{ left: -16, right: 8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis
            dataKey="examLogId"
            tick={{ fontSize: 12, fill: "#64748b" }}
            tickLine={false}
            axisLine={false}
            interval={0}
            tickFormatter={(id: number) => {
              const name = nameOf(id);
              return name.length > 12 ? `${name.slice(0, 11)}…` : name;
            }}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12, fill: "#64748b" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            cursor={{ fill: "#f1f5f9" }}
            labelFormatter={(id) => nameOf(id as number)}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="enrolled" name="Enrolled" fill={COLORS.indigo} radius={[6, 6, 0, 0]} />
          <Bar dataKey="seated" name="Seated" fill={COLORS.sky} radius={[6, 6, 0, 0]} />
          <Bar dataKey="attended" name="Attended" fill={COLORS.emerald} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const RegistrationTrend = ({ data }: { data: DashboardCharts["registrationTrend"] }) => (
  <div className="h-72">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ left: -16, right: 8 }}>
        <defs>
          <linearGradient id="regGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.indigo} stopOpacity={0.35} />
            <stop offset="100%" stopColor={COLORS.indigo} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: "#64748b" }}
          tickLine={false}
          axisLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 12, fill: "#64748b" }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip contentStyle={tooltipStyle} />
        <Area
          type="monotone"
          dataKey="registrations"
          name="New students"
          stroke={COLORS.indigo}
          strokeWidth={3}
          fill="url(#regGradient)"
          dot={false}
          activeDot={{ r: 5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

const DashboardChartsSection = ({
  charts,
  seatCoverage,
}: {
  charts: DashboardCharts;
  seatCoverage: number;
}) => (
  <section className="grid gap-6 lg:grid-cols-3">
    <ChartCard eyebrow="Exam day" title="Attendance status" className="lg:col-span-1">
      <AttendanceDonut data={charts.attendanceBreakdown} />
    </ChartCard>
    <ChartCard eyebrow="Pipeline" title="Enrollment by exam" className="lg:col-span-2">
      <ExamProgressBars data={charts.examProgress} />
    </ChartCard>
    <ChartCard eyebrow="Last 14 days" title="New student sign-ups" className="lg:col-span-2">
      <RegistrationTrend data={charts.registrationTrend} />
    </ChartCard>
    <ChartCard eyebrow="Readiness" title="Seat plan coverage" className="lg:col-span-1">
      <SeatCoverageGauge percentage={seatCoverage} />
    </ChartCard>
  </section>
);

export default DashboardChartsSection;
