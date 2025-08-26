"use client";

import dynamic from "next/dynamic";
import type { ChartPoint } from "@/components/data/BlogChart";

const Inner = dynamic(() => import("@/components/data/BlogChart").then(m => m.BlogChart), {
  ssr: false,
});

export function BlogChartClient(props: { title?: string; data: ChartPoint[] }) {
  return <Inner {...props} />;
}

