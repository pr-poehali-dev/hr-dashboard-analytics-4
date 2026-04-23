import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Icon from "@/components/ui/icon";

const monthlyData = [
  { month: "Янв", headcount: 338, turnover: 5.1, vacancies: 18, fillTime: 28 },
  { month: "Фев", headcount: 341, turnover: 4.8, vacancies: 20, fillTime: 30 },
  { month: "Мар", headcount: 345, turnover: 5.9, vacancies: 22, fillTime: 31 },
  { month: "Апр", headcount: 348, turnover: 6.2, vacancies: 19, fillTime: 33 },
  { month: "Май", headcount: 352, turnover: 6.8, vacancies: 21, fillTime: 32 },
  { month: "Июн", headcount: 349, turnover: 7.1, vacancies: 24, fillTime: 35 },
  { month: "Июл", headcount: 346, turnover: 7.5, vacancies: 25, fillTime: 36 },
  { month: "Авг", headcount: 343, turnover: 7.9, vacancies: 23, fillTime: 34 },
  { month: "Сен", headcount: 350, turnover: 8.2, vacancies: 23, fillTime: 34 },
];

const departments = [
  {
    name: "Продажи",
    fill: 94,
    headcount: 94,
    total: 100,
    openVacancies: 3,
    turnover: 6.1,
    avgSalary: "85 000 ₽",
    color: "#2563EB",
  },
  {
    name: "Разработка",
    fill: 78,
    headcount: 70,
    total: 90,
    openVacancies: 12,
    turnover: 11.2,
    avgSalary: "210 000 ₽",
    color: "#7C3AED",
  },
  {
    name: "Операции",
    fill: 91,
    headcount: 91,
    total: 100,
    openVacancies: 6,
    turnover: 5.4,
    avgSalary: "72 000 ₽",
    color: "#0891B2",
  },
  {
    name: "HR",
    fill: 100,
    headcount: 8,
    total: 8,
    openVacancies: 0,
    turnover: 2.1,
    avgSalary: "95 000 ₽",
    color: "#059669",
  },
];

const metrics = [
  {
    title: "Численность",
    value: "350",
    unit: "чел",
    sub: "план: 380 чел",
    subColor: "text-slate-500",
    icon: "Users",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    delta: "-7,9%",
    deltaColor: "text-amber-600",
    deltaBg: "bg-amber-50",
  },
  {
    title: "Текучесть за квартал",
    value: "8,2",
    unit: "%",
    sub: "норма: 5%",
    subColor: "text-red-500",
    icon: "TrendingUp",
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
    delta: "+3,2%",
    deltaColor: "text-red-600",
    deltaBg: "bg-red-50",
    alert: true,
  },
  {
    title: "Открытые вакансии",
    value: "23",
    unit: "",
    sub: "из них горящих: 7",
    subColor: "text-orange-500",
    icon: "Briefcase",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    delta: "7 срочных",
    deltaColor: "text-orange-600",
    deltaBg: "bg-orange-50",
  },
  {
    title: "Среднее время найма",
    value: "34",
    unit: "дня",
    sub: "с начала квартала",
    subColor: "text-slate-500",
    icon: "Clock",
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    delta: "+2 дня",
    deltaColor: "text-slate-500",
    deltaBg: "bg-slate-100",
  },
];

const hiringData = [
  { month: "Октябрь", applied: 47, interviewed: 18, offered: 8, hired: 6 },
  { month: "Ноябрь",  applied: 52, interviewed: 21, offered: 9, hired: 8 },
  { month: "Декабрь", applied: 31, interviewed: 12, offered: 5, hired: 4 },
  { month: "Январь",  applied: 28, interviewed: 10, offered: 4, hired: 3 },
  { month: "Февраль", applied: 61, interviewed: 24, offered: 11, hired: 9 },
  { month: "Март",    applied: 74, interviewed: 29, offered: 14, hired: 12 },
].map((r) => ({
  ...r,
  conversion: parseFloat(((r.hired / r.applied) * 100).toFixed(1)),
}));

const bestConversion = Math.max(...hiringData.map((r) => r.conversion));
const worstConversion = Math.min(...hiringData.map((r) => r.conversion));

const HiringFunnelTable = () => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
    <div className="flex items-center gap-3 mb-6">
      <h2 className="text-base font-bold text-slate-800">Динамика найма</h2>
      <span className="text-xs text-slate-400">· последние 6 месяцев</span>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100">
            {["Месяц", "Подано", "Интервью", "Оффер", "Вышли", "Конверсия"].map((h) => (
              <th
                key={h}
                className="text-left text-xs font-semibold text-slate-400 pb-3 pr-4 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hiringData.map((row) => {
            const isBest = row.conversion === bestConversion;
            const isWorst = row.conversion === worstConversion;
            return (
              <tr
                key={row.month}
                className={`border-b border-slate-50 transition-colors hover:bg-slate-50 ${
                  isBest ? "bg-emerald-50/60" : isWorst ? "bg-red-50/60" : ""
                }`}
              >
                <td className="py-3 pr-4 font-semibold text-slate-700 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {isBest && (
                      <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded">
                        ↑ лучший
                      </span>
                    )}
                    {isWorst && (
                      <span className="text-xs bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded">
                        ↓ худший
                      </span>
                    )}
                    {row.month}
                  </div>
                </td>
                <td className="py-3 pr-4 text-slate-600">{row.applied}</td>
                <td className="py-3 pr-4 text-slate-600">
                  {row.interviewed}
                  <span className="text-xs text-slate-400 ml-1">
                    ({Math.round((row.interviewed / row.applied) * 100)}%)
                  </span>
                </td>
                <td className="py-3 pr-4 text-slate-600">
                  {row.offered}
                  <span className="text-xs text-slate-400 ml-1">
                    ({Math.round((row.offered / row.applied) * 100)}%)
                  </span>
                </td>
                <td className="py-3 pr-4 font-semibold text-slate-700">
                  {row.hired}
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          isBest
                            ? "bg-emerald-500"
                            : isWorst
                            ? "bg-red-400"
                            : "bg-blue-400"
                        }`}
                        style={{ width: `${(row.conversion / bestConversion) * 100}%` }}
                      />
                    </div>
                    <span
                      className={`text-xs font-bold ${
                        isBest
                          ? "text-emerald-600"
                          : isWorst
                          ? "text-red-500"
                          : "text-slate-600"
                      }`}
                    >
                      {row.conversion}%
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="bg-slate-50 rounded-b-xl">
            <td className="py-3 pr-4 text-xs font-bold text-slate-500 pl-1">Итого</td>
            <td className="py-3 pr-4 text-xs font-bold text-slate-700">
              {hiringData.reduce((s, r) => s + r.applied, 0)}
            </td>
            <td className="py-3 pr-4 text-xs font-bold text-slate-700">
              {hiringData.reduce((s, r) => s + r.interviewed, 0)}
            </td>
            <td className="py-3 pr-4 text-xs font-bold text-slate-700">
              {hiringData.reduce((s, r) => s + r.offered, 0)}
            </td>
            <td className="py-3 pr-4 text-xs font-bold text-slate-700">
              {hiringData.reduce((s, r) => s + r.hired, 0)}
            </td>
            <td className="py-3 text-xs font-bold text-blue-600">
              {(
                (hiringData.reduce((s, r) => s + r.hired, 0) /
                  hiringData.reduce((s, r) => s + r.applied, 0)) *
                100
              ).toFixed(1)}%
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
);

type Tab = "headcount" | "turnover" | "vacancies" | "fillTime";

const chartTabs: { key: Tab; label: string; color: string }[] = [
  { key: "headcount", label: "Численность", color: "#2563EB" },
  { key: "turnover", label: "Текучесть %", color: "#DC2626" },
  { key: "vacancies", label: "Вакансии", color: "#7C3AED" },
  { key: "fillTime", label: "Время найма", color: "#0891B2" },
];

interface TooltipProps {
  active?: boolean;
  payload?: { value: number; name: string }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-lg">
        <p className="text-xs font-semibold text-slate-500 mb-1">{label}</p>
        <p className="text-sm font-bold text-slate-800">
          {payload[0].value}
          {payload[0].name === "turnover" ? "%" : ""}
          {payload[0].name === "fillTime" ? " дн." : ""}
        </p>
      </div>
    );
  }
  return null;
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("headcount");
  const [selectedDept, setSelectedDept] = useState<number | null>(null);

  const activeChart = chartTabs.find((t) => t.key === activeTab)!;

  return (
    <div className="min-h-screen bg-[#F4F6FB] font-ibm">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Icon name="BarChart2" size={16} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-800 leading-none">
                HR Аналитика
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Корпоративный дашборд
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Icon name="Calendar" size={14} className="text-slate-400" />
            <span>Q3 2025 · обновлено сегодня</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {metrics.map((m) => (
            <div
              key={m.title}
              className={`bg-white rounded-2xl p-5 border shadow-sm transition-all duration-200 hover:shadow-md ${
                m.alert ? "border-red-200 ring-1 ring-red-100" : "border-slate-100"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${m.iconBg}`}
                >
                  <Icon name={m.icon} size={20} className={m.iconColor} />
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${m.deltaBg} ${m.deltaColor}`}
                >
                  {m.delta}
                </span>
              </div>
              <div className="flex items-end gap-1 mb-1">
                <span
                  className={`text-3xl font-bold leading-none ${
                    m.alert ? "text-red-600" : "text-slate-800"
                  }`}
                >
                  {m.value}
                </span>
                {m.unit && (
                  <span className="text-sm text-slate-400 mb-0.5">{m.unit}</span>
                )}
              </div>
              <p className="text-xs font-semibold text-slate-600 mb-0.5">
                {m.title}
              </p>
              <p className={`text-xs ${m.subColor}`}>{m.sub}</p>
            </div>
          ))}
        </div>

        {/* Department Details */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-slate-800">
              Укомплектованность по отделам
            </h2>
            <span className="text-xs text-slate-400">
              нажмите на отдел для деталей
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {departments.map((dept, i) => (
              <div
                key={dept.name}
                onClick={() =>
                  setSelectedDept(selectedDept === i ? null : i)
                }
                className={`rounded-xl border p-4 cursor-pointer transition-all duration-200 ${
                  selectedDept === i
                    ? "border-blue-200 bg-blue-50/50 shadow-sm"
                    : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: dept.color }}
                    />
                    <span className="text-sm font-semibold text-slate-700">
                      {dept.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-lg font-bold ${
                        dept.fill === 100
                          ? "text-emerald-600"
                          : dept.fill < 85
                          ? "text-orange-500"
                          : "text-slate-800"
                      }`}
                    >
                      {dept.fill}%
                    </span>
                    <Icon
                      name={selectedDept === i ? "ChevronUp" : "ChevronDown"}
                      size={16}
                      className="text-slate-400"
                    />
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-1">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${dept.fill}%`,
                      backgroundColor: dept.color,
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>
                    {dept.headcount} из {dept.total} чел
                  </span>
                  <span>
                    {dept.openVacancies > 0
                      ? `${dept.openVacancies} вакансий`
                      : "укомплектован"}
                  </span>
                </div>

                {/* Expanded details */}
                {selectedDept === i && (
                  <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-3 gap-3 animate-fade-in">
                    <div className="text-center">
                      <p className="text-xs text-slate-500 mb-1">Текучесть</p>
                      <p
                        className={`text-sm font-bold ${
                          dept.turnover > 8
                            ? "text-red-600"
                            : dept.turnover > 5
                            ? "text-amber-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {dept.turnover}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-500 mb-1">Вакансии</p>
                      <p className="text-sm font-bold text-slate-700">
                        {dept.openVacancies}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-500 mb-1">Ср. зарплата</p>
                      <p className="text-sm font-bold text-slate-700">
                        {dept.avgSalary}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h2 className="text-base font-bold text-slate-800">
              Динамика показателей
            </h2>
            <div className="flex gap-2 flex-wrap">
              {chartTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-150 ${
                    activeTab === tab.key
                      ? "text-white border-transparent shadow-sm"
                      : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                  }`}
                  style={
                    activeTab === tab.key
                      ? { backgroundColor: tab.color, borderColor: tab.color }
                      : {}
                  }
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart
              data={monthlyData}
              margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#F1F5F9"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={activeTab}
                stroke={activeChart.color}
                strokeWidth={2.5}
                dot={{ r: 4, fill: activeChart.color, strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              {/* Норма для текучести */}
              {activeTab === "turnover" && (
                <Line
                  type="monotone"
                  dataKey={() => 5}
                  stroke="#94A3B8"
                  strokeWidth={1.5}
                  strokeDasharray="5 5"
                  dot={false}
                  name="норма"
                />
              )}
            </LineChart>
          </ResponsiveContainer>

          {activeTab === "turnover" && (
            <p className="text-xs text-slate-400 text-center mt-2">
              — — норма 5% · текучесть стабильно превышает норму с мая
            </p>
          )}
        </div>

        {/* Hiring Funnel Table */}
        <HiringFunnelTable />

        {/* Footer note */}
        <div className="flex items-center gap-2 text-xs text-slate-400 pb-4">
          <Icon name="Info" size={13} className="text-slate-300" />
          <span>
            Данные за Q3 2025 · Источник: внутренние системы учёта персонала
          </span>
        </div>
      </main>
    </div>
  );
};

export default Index;