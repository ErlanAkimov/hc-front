import { Line, Area, AreaChart, ResponsiveContainer } from "recharts";

const Chart = ({ width, height, chart }: { width: number; height: number; chart: { x: number; y: number }[] }) => {
    let data = chart.map(({ x, y }) => ({ name: x.toString(), value: y }));

    if (data.length === 1) {
        const [point] = data;
        data = [
            point,
            { ...point, name: (Number(point.name) + 1).toString() },
            { ...point, name: (Number(point.name) + 2).toString() },
        ];
    }

    return (
        <ResponsiveContainer width={width} height={height}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(85, 231, 121, 1)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="rgba(85, 231, 121, 1)" stopOpacity={0.02} />
                    </linearGradient>
                </defs>
                <Area dataKey="value" stroke="rgba(85, 231, 121, 1)" fill="url(#color)" />
                <Line type="basis" dataKey="value" stroke="rgba(85, 231, 121, 1)" strokeWidth={2} dot={false} />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default Chart;
