import Table from "../Components/table/Table";
import {
  LuCalendarClock,
  LuClipboardCheck,
  LuClock9,
  LuActivity,
} from "react-icons/lu";
import { useGetDataQuery } from "../service/endpoint";
import Loader from "../Components/loader/Loader";

const fallbackDashboardPayload = {
  highlights: {
    scheduledExams: { total: 12, thisWeek: 3 },
    verifiedStudents: { total: 4284, today: 82 },
    invigilatorsOnDuty: { total: 128, pending: 18 },
    seatPlanCoverage: {
      percentage: 92,
      assigned: 450,
      total: 490,
      uncheckedHalls: 3,
    },
    operations: {
      activeHalls: { total: 18, newlyActivated: 4 },
      faceMatchAccuracy: { value: 99.3, trend: "stable" },
      alerts: { total: 3, pendingReview: 3 },
      lastSync: { since: "8s", status: "All cameras online" },
    },
  },
  upcomingSchedules: [
    {
      examLogId: 1,
      exam: "BCS Preliminary",
      displayDate: "12 Dec 2023",
      location: "Dhaka College",
      invigilators: 24,
      students: 450,
    },
  ],
  liveActivity: [
    {
      title: "Seat plan updated",
      description: "PSC Recruitment • Room 201",
      meta: "Sylhet Govt. College",
      relativeTime: "5m ago",
    },
  ],
};

type DashboardPayload = typeof fallbackDashboardPayload;
type Highlights = DashboardPayload["highlights"];
type UpcomingSchedule = DashboardPayload["upcomingSchedules"][number];
type LiveActivity = DashboardPayload["liveActivity"][number];

const formatNumber = (value?: number) =>
  typeof value === "number"
    ? value.toLocaleString("en-US", {
        maximumFractionDigits: value % 1 === 0 ? 0 : 1,
      })
    : "--";

const formatDelta = (
  value?: number,
  {
    prefix = "+",
    suffix = "",
    fallback = "Awaiting data",
  }: { prefix?: string; suffix?: string; fallback?: string } = {}
) => {
  if (typeof value === "number") {
    return `${prefix}${formatNumber(value)}${suffix}`;
  }
  return fallback;
};

const Home = () => {
  const {
    data: dashboardResponse,
    isLoading: isDashboardLoading,
    isFetching: isDashboardFetching,
    isError,
  } = useGetDataQuery({
    endpoint: "/admin/dashboard/overview",
    tags: ["dashboard"],
  });

  const dashboardPayload =
    (dashboardResponse?.data as DashboardPayload) ||
    (dashboardResponse as DashboardPayload) ||
    fallbackDashboardPayload;
  const highlights: Highlights =
    dashboardPayload?.highlights ?? fallbackDashboardPayload.highlights;
  const operations =
    highlights.operations ?? fallbackDashboardPayload.highlights.operations;
  const upcomingExams: UpcomingSchedule[] =
    dashboardPayload?.upcomingSchedules ??
    fallbackDashboardPayload.upcomingSchedules;
  const activityTimeline: LiveActivity[] =
    dashboardPayload?.liveActivity ?? fallbackDashboardPayload.liveActivity;

  const metricCards = [
    {
      title: "Scheduled Exams",
      value: formatNumber(highlights?.scheduledExams?.total),
      badge: formatDelta(highlights?.scheduledExams?.thisWeek, {
        suffix: " this week",
      }),
      tone: "from-indigo-500/90 to-purple-500/90",
    },
    {
      title: "Verified Students",
      value: formatNumber(highlights?.verifiedStudents?.total),
      badge: formatDelta(highlights?.verifiedStudents?.today, {
        suffix: " today",
      }),
      tone: "from-emerald-500/90 to-teal-500/90",
    },
    {
      title: "Invigilators On Duty",
      value: formatNumber(highlights?.invigilatorsOnDuty?.total),
      badge: formatDelta(highlights?.invigilatorsOnDuty?.pending, {
        prefix: "",
        suffix: " pending",
      }),
      tone: "from-sky-500/90 to-blue-500/90",
    },
    {
      title: "Seat Plan Coverage",
      value: `${formatNumber(highlights?.seatPlanCoverage?.percentage)}%`,
      badge: `${formatNumber(
        highlights?.seatPlanCoverage?.assigned
      )}/${formatNumber(highlights?.seatPlanCoverage?.total)} seats • ${
        highlights?.seatPlanCoverage?.uncheckedHalls ?? 0
      } halls unchecked`,
      tone: "from-amber-500/90 to-orange-500/90",
    },
  ];

  const columns = [
    { field: "candidate", headerName: "Candidate" },
    { field: "exam", headerName: "Exam" },
    { field: "hall", headerName: "Hall & Seat" },
    { field: "status", headerName: "Status" },
    { field: "time", headerName: "Entry Time" },
  ];

  const rows = [
    {
      id: 1,
      candidate: "Aisha Rahman",
      exam: "BCS Preliminary",
      hall: "Hall A · Seat 21",
      status: "Verified",
      time: "08:32 AM",
    },
    {
      id: 2,
      candidate: "Mehedi Hasan",
      exam: "PSC Recruitment",
      hall: "Hall C · Seat 17",
      status: "Pending",
      time: "--",
    },
    {
      id: 3,
      candidate: "Anika Chowdhury",
      exam: "Bankers Selection",
      hall: "Hall B · Seat 05",
      status: "Verified",
      time: "08:18 AM",
    },
    {
      id: 4,
      candidate: "Tanvir Islam",
      exam: "University Viva",
      hall: "Hall D · Seat 40",
      status: "Escalated",
      time: "--",
    },
  ];

  return (
    <div className="relative space-y-8">
      <section className="overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-r from-[#3424ff] via-[#3b82f6] to-[#1d4ed8] p-8 text-white shadow-lg shadow-indigo-500/30">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.45em] text-white/80">
              Live monitoring
            </p>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">
              Seamless face recognition for every exam hall
            </h2>
            <p className="max-w-2xl text-sm text-white/80 md:text-base">
              Track attendance, invigilators, and hall readiness from a single
              command center. Intelligent alerts keep your team synced before,
              during, and after every exam session.
            </p>
            {isError && (
              <p className="text-xs font-semibold tracking-wide uppercase text-amber-100">
                Live sync unavailable — showing cached snapshot.
              </p>
            )}
            <div className="flex flex-wrap gap-3">
              <button className="px-5 py-2 text-sm font-semibold transition rounded-full shadow-lg bg-white/95 text-slate-900 shadow-indigo-500/30 hover:bg-white">
                Launch monitoring
              </button>
              <button className="px-5 py-2 text-sm font-semibold border rounded-full border-white/40 text-white/90 hover:bg-white/10">
                Download reports
              </button>
            </div>
          </div>
          <div className="grid w-full max-w-md grid-cols-2 gap-4">
            <div className="p-4 border rounded-2xl border-white/20 bg-white/10">
              <p className="text-xs uppercase text-white/70">Active halls</p>
              <p className="mt-2 text-3xl font-bold">
                {formatNumber(operations?.activeHalls?.total)}
              </p>
              <p className="text-xs text-emerald-200">
                {formatDelta(operations?.activeHalls?.newlyActivated, {
                  suffix: " since 8 AM",
                })}
              </p>
            </div>
            <div className="p-4 border rounded-2xl border-white/20 bg-white/10">
              <p className="text-xs uppercase text-white/70">
                Face match accuracy
              </p>
              <p className="mt-2 text-3xl font-bold">
                {formatNumber(operations?.faceMatchAccuracy?.value)}%
              </p>
              <p className="text-xs capitalize text-emerald-200">
                {operations?.faceMatchAccuracy?.trend ?? "stable"}
              </p>
            </div>
            <div className="p-4 border rounded-2xl border-white/20 bg-white/10">
              <p className="text-xs uppercase text-white/70">Alerts</p>
              <p className="mt-2 text-3xl font-bold">
                {formatNumber(operations?.alerts?.total)}
              </p>
              <p className="text-xs text-amber-200">
                {formatDelta(operations?.alerts?.pendingReview, {
                  prefix: "",
                  suffix: " pending review",
                })}
              </p>
            </div>
            <div className="p-4 border rounded-2xl border-white/20 bg-white/10">
              <p className="text-xs uppercase text-white/70">Last sync</p>
              <p className="mt-2 text-3xl font-bold">
                {operations?.lastSync?.since ?? "--"}
              </p>
              <p className="text-xs text-white/80">
                {operations?.lastSync?.status ?? "Syncing"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricCards.map(({ title, value, badge, tone }) => (
          <div
            key={title}
            className={`rounded-3xl border border-white/40 bg-gradient-to-br ${tone} p-4 text-white shadow-lg shadow-slate-900/20`}
          >
            <p className="text-sm uppercase text-white/80">{title}</p>
            <p className="mt-3 text-3xl font-bold">{value}</p>
            <p className="text-sm text-white/80">{badge}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="p-6 bg-white border shadow-lg lg:col-span-2 rounded-3xl border-slate-100 shadow-slate-200/50">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm tracking-wide uppercase text-slate-400">
                Upcoming schedules
              </p>
              <h3 className="text-2xl text-slate-900">Exam readiness</h3>
            </div>
            <button className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
              View calendar
            </button>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-xs tracking-wide text-left uppercase text-slate-400">
                  <th className="pb-3 font-medium">Exam</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Location</th>
                  <th className="pb-3 font-medium">Invigilators</th>
                  <th className="pb-3 font-medium text-right">Students</th>
                </tr>
              </thead>
              <tbody>
                {upcomingExams.map((exam: UpcomingSchedule) => (
                  <tr
                    key={exam.examLogId ?? exam.exam}
                    className="border-b border-slate-100/80 last:border-b-0"
                  >
                    <td className="py-4 font-semibold text-slate-800">
                      {exam.exam}
                    </td>
                    <td className="py-4 text-slate-500">{exam.displayDate}</td>
                    <td className="py-4 text-slate-500">{exam.location}</td>
                    <td className="py-4 text-slate-500">{exam.invigilators}</td>
                    <td className="py-4 font-semibold text-right text-slate-800">
                      {exam.students}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-6 bg-white border shadow-lg rounded-3xl border-slate-100 shadow-slate-200/50">
          <div className="flex items-center gap-2 text-sm tracking-wide uppercase text-slate-400">
            <LuActivity size={16} />
            Live activity
          </div>
          <div className="mt-6 space-y-5">
            {activityTimeline.map((event: LiveActivity, index: number) => (
              <div key={`${event.title}-${index}`} className="flex gap-3">
                <div className="mt-1">
                  <span className="block h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {event.title}
                  </p>
                  <p className="text-sm text-slate-500">{event.description}</p>
                  <p className="text-xs text-slate-400">
                    {event.meta} • {event.relativeTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="p-6 bg-white border shadow-lg rounded-3xl border-slate-100 shadow-slate-200/50">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm tracking-wide uppercase text-slate-400">
              Face recognition stream
            </p>
            <h3 className="text-2xl text-slate-900">Recent hall scans</h3>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-2 px-3 py-1 border rounded-full border-slate-200">
              <LuCalendarClock />
              Today
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 border rounded-full border-slate-200">
              <LuClock9 />
              08:00 - 14:00
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 border rounded-full border-slate-200">
              <LuClipboardCheck />
              Auto verified
            </span>
          </div>
        </div>
        <div className="p-4 mt-6 border rounded-2xl border-slate-100 bg-slate-50/60">
          <Table columns={columns} rows={rows} />
        </div>
      </section>
      {(isDashboardLoading || isDashboardFetching) && <Loader />}
    </div>
  );
};

export default Home;
