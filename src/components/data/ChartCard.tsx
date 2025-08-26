"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartProps } from "@/components/data/Chart";
import { Chart } from "@/components/data/Chart";

export type ChartCardProps = ChartProps & { title?: string };

export function ChartCard({ title = "Chart", ...chartProps }: ChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Chart {...chartProps} />
      </CardContent>
    </Card>
  );
}

