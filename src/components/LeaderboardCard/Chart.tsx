import { Line, Area, AreaChart, ResponsiveContainer } from "recharts";

const data = Array.from({ length: 10 }, (_, i) => ({
  name: `День ${i + 1}`,
  value: Math.floor(Math.sin(i / 5) * 50 + Math.random() * 20), // Смягчённые колебания
}));

const Chart = () => (
    <ResponsiveContainer width={134} height={53}>
        <AreaChart data={data}>
            <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(85, 231, 121, 1)" stopOpacity={0.4} />
                    <stop offset="75%" stopColor="rgba(85, 231, 121, 1)" stopOpacity={0} />
                </linearGradient>
            </defs>
            <Area dataKey="value" stroke="rgba(85, 231, 121, 1)" fill="url(#color)" />
            <Line type="basis" dataKey="value" stroke="rgba(85, 231, 121, 1)" strokeWidth={2} dot={false} />
        </AreaChart>
    </ResponsiveContainer>
);

export default Chart;
