import { Bar, BarChart, CartesianGrid, ErrorBar, Tooltip, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer } from "../ui/chart";

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
  
  const SampleChart = () => (
    <ChartContainer config={chartConfig} className="min-h-[520px] w-full">
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
  
  export default SampleChart;