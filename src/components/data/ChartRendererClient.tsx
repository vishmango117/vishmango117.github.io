"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartType, MarkdownDataPoint } from "@/lib/content";

const COLORS = [
  "#06b6d4",
  "#22d3ee",
  "#818cf8",
  "#34d399",
  "#f472b6",
  "#f59e0b",
  "#ef4444",
];

export function ChartRendererClient({
  title = "Chart",
  chartType = "line",
  data,
}: {
  title?: string;
  chartType?: ChartType;
  data: MarkdownDataPoint[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          {(() => {
            let chartEl: React.ReactElement = <div />;
            if (chartType === "line") {
              const series: { label: string; value: number }[] = data
                .filter((p): p is Required<Pick<typeof p, "label" | "value">> & MarkdownDataPoint => typeof p.label === "string" && typeof p.value === "number")
                .map((p) => ({ label: p.label as string, value: p.value as number }));
              chartEl = (
                <LineChart data={series} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                  <XAxis dataKey="label" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--color-popover)", color: "var(--color-popover-foreground)", border: "1px solid var(--color-border)", borderRadius: "var(--radius)" }} />
                  <Line type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2} dot={{ r: 2 }} />
                </LineChart>
              );
            } else if (chartType === "bar") {
              const series: { label: string; value: number }[] = data
                .filter((p): p is Required<Pick<typeof p, "label" | "value">> & MarkdownDataPoint => typeof p.label === "string" && typeof p.value === "number")
                .map((p) => ({ label: p.label as string, value: p.value as number }));
              chartEl = (
                <BarChart data={series} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                  <XAxis dataKey="label" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--color-popover)", color: "var(--color-popover-foreground)", border: "1px solid var(--color-border)", borderRadius: "var(--radius)" }} />
                  <Bar dataKey="value" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              );
            } else if (chartType === "area") {
              const series: { label: string; value: number }[] = data
                .filter((p): p is Required<Pick<typeof p, "label" | "value">> & MarkdownDataPoint => typeof p.label === "string" && typeof p.value === "number")
                .map((p) => ({ label: p.label as string, value: p.value as number }));
              chartEl = (
                <AreaChart data={series} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                  <defs>
                    <linearGradient id="fillArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                  <XAxis dataKey="label" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--color-popover)", color: "var(--color-popover-foreground)", border: "1px solid var(--color-border)", borderRadius: "var(--radius)" }} />
                  <Area type="monotone" dataKey="value" stroke="var(--color-primary)" fillOpacity={1} fill="url(#fillArea)" />
                </AreaChart>
              );
            } else if (chartType === "pie") {
              const series: { label: string; value: number }[] = data
                .filter((p): p is Required<Pick<typeof p, "label" | "value">> & MarkdownDataPoint => typeof p.label === "string" && typeof p.value === "number")
                .map((p) => ({ label: p.label as string, value: p.value as number }));
              chartEl = (
                <PieChart>
                  <Tooltip contentStyle={{ background: "var(--color-popover)", color: "var(--color-popover-foreground)", border: "1px solid var(--color-border)", borderRadius: "var(--radius)" }} />
                  <Pie data={series} dataKey="value" nameKey="label" innerRadius={60} outerRadius={100} paddingAngle={2}>
                    {series.map((_, i) => (
                      <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              );
            } else if (chartType === "scatter") {
              const points: { x: number; y: number }[] = data
                .filter((p): p is Required<Pick<typeof p, "x" | "y">> & MarkdownDataPoint => typeof p.x === "number" && typeof p.y === "number")
                .map((p) => ({ x: p.x as number, y: p.y as number }));
              chartEl = (
                <ScatterChart margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="x" name="x" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis type="number" dataKey="y" name="y" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <ZAxis range={[60, 60]} />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} contentStyle={{ background: "var(--color-popover)", color: "var(--color-popover-foreground)", border: "1px solid var(--color-border)", borderRadius: "var(--radius)" }} />
                  <Scatter data={points} fill="var(--color-primary)" />
                </ScatterChart>
              );
            } else if (chartType === "radar") {
              const series: { label: string; value: number }[] = data
                .filter((p): p is Required<Pick<typeof p, "label" | "value">> & MarkdownDataPoint => typeof p.label === "string" && typeof p.value === "number")
                .map((p) => ({ label: p.label as string, value: p.value as number }));
              chartEl = (
                <RadarChart data={series} outerRadius={100}>
                  <PolarGrid stroke="var(--color-border)" />
                  <PolarAngleAxis dataKey="label" stroke="var(--color-muted-foreground)" />
                  <PolarRadiusAxis stroke="var(--color-muted-foreground)" />
                  <Radar name="Series" dataKey="value" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.3} />
                  <Tooltip contentStyle={{ background: "var(--color-popover)", color: "var(--color-popover-foreground)", border: "1px solid var(--color-border)", borderRadius: "var(--radius)" }} />
                </RadarChart>
              );
            }
            return chartEl;
          })()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

