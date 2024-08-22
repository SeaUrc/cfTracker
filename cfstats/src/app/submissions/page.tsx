'use client'

import NavBar from "~/components/navbar/navbar"

import { Bar, BarChart, CartesianGrid, ErrorBar, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "~/components/ui/chart"

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]


let data = {
  "Newbie": [100, 200],
  "Pupil": [150, 230],
  "Apprentice": [170, 300],
  "Specialist": [300, 400],
  "Expert": [300, 500],
  "Candidate Master": [350, 700],
  "Master": [600, 1200],
  "International Master": [610, 2100],
  "Grandmaster": [723, 3000],
  "International Grandmaster": [827, 4000],
  "Legendary Grandmaster": [2000, 7000]
}

const chartData = Object.keys(data).map((key) => {
  const [min, max] = data[key as keyof typeof data];
  if (min && max) {
    const mean = (min + max) / 2;
    return {
      "name": key,
      "mean": mean,
      "errorY": [mean-min, max-mean]
    };
  }
});

const chartConfig = {
  "Newbie": {
    label: "Newbie",
    color: "#2563eb",
  },
  "Pupil": {
    label: "Pupil",
    color: "#60a5fa",
  },
  "Apprentice": {
    label: "Apprentice",
    color: "#60a5fa",
  },
  "Specialist": {
    label: "Specialist",
    color: "#60a5fa",
  },
  "Expert": {
    label: "Expert",
    color: "#60a5fa",
  },
  "Candidate Master": {
    label: "Candidate Master",
    color: "#60a5fa",
  },
  "Master": {
    label: "Master",
    color: "#60a5fa",
  },
  "International Master": {
    label: "International Master",
    color: "#60a5fa",
  },
  "Grandmaster": {
    label: "Grandmaster",
    color: "#60a5fa",
  },
  "International Grandmaster": {
    label: "International Grandmaster",
    color: "#60a5fa",
  },
  "Legendary Grandmaster": {
    label: "Legendary Grandmaster",
    color: "#60a5fa",
  },
} satisfies ChartConfig

const ConfidenceBarChart = () => (
  <ChartContainer config={chartConfig} className="min-h-[520px] w-1/2">
  <BarChart
    width={800}
    height={520}
    data={chartData}
    margin={{ top: 20, right: 30, left: 20, bottom: 120 }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" angle={-45} textAnchor={'end'} interval={0}/>
    <YAxis />
    <Tooltip />
    <Bar dataKey="mean" fill="#8884d8">
      <ErrorBar dataKey="errorY" width={4} strokeWidth={2} stroke="red" direction="y" 
        // data={chartData.map(entry => ({ x: entry?.name, y: entry?.mean, value: [entry?.min, entry?.max] }))} 
      />
    </Bar>
  </BarChart>
  </ChartContainer>
);





export default function SubmissionPage() {

  return (
    <div>
      <NavBar page="submissions" />
      <div className="">
        {/* <ChartContainer config={chartConfig} className="min-h-[100px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer> */}
        <ConfidenceBarChart/>
      </div>
    </div>
  )
}

