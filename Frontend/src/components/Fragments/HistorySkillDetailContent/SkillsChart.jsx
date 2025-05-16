import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#007BFF", "#1A2B5C", "#FF9F1C", "#E71D36", "#2ECC71", "#8E44AD"];

const SkillsChart = ({ skills }) => {

    const data = Object.entries(skills).map(([name, value]) => ({
        name,
        value
    }));

    return (
        <div className="skill-chart flex flex-col items-center">
            <p className="text-lg font-bold -mt-10">Skills Chart</p>
            <PieChart width={200} height={200}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </div>
    );
};

export default SkillsChart;