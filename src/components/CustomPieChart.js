// import React from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// const data = [
//     { name: 'Group A', value: 400 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//         <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//             {`${(percent * 100).toFixed(0)}%`}
//         </text>
//     );
// };

// const PieChart = () => {
//     return (
//         <ResponsiveContainer width="100%" height={400}>
//             <PieChart>
//                 <Pie
//                     data={data}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={renderCustomizedLabel}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                 >
//                     {data.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                 </Pie>
//             </PieChart>
//         </ResponsiveContainer>
//     );
// };

// export default PieChart;

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const CustomPieChart = ({ data, colors = ['#10B981', '#EF4444'], size = 'md' }) => {
  // Size variants
  const sizeVariants = {
    sm: { height: 300, radius: 60 },
    md: { height: 400, radius: 80 },
    lg: { height: 500, radius: 100 }
  };

  const { height, radius } = sizeVariants[size] || sizeVariants.md;

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ 
    cx, 
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    percent, 
    index 
  }) => {
    const labelRadius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
    const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4">
      <div className="h-[300px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={radius}
              innerRadius={radius * 0.6}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index % colors.length]} 
                  stroke="#FFF"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip 
              content={({ payload }) => (
                <div className="bg-white p-2 rounded-md shadow-md border border-gray-200">
                  <p className="font-medium text-gray-900">{payload?.[0]?.name}</p>
                  <p className="text-sm text-gray-600">
                    {payload?.[0]?.value} ({((payload?.[0]?.payload.percent || 0) * 100)}%)
                  </p>
                </div>
              )}
            />
            <Legend 
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value, entry, index) => (
                <span className="text-sm text-gray-600">
                  {value}: {data[index]?.value} ({(data[index]?.percent * 100).toFixed(1)}%)
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomPieChart;