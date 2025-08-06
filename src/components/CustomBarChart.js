import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

const CustomBarChart = ({ chartData, dataKey, title, className = "" }) => {
  // Generate a consistent color palette based on data length
  const colorPalette = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', 
    '#EC4899', '#14B8A6', '#F97316', '#64748B', '#A855F7'
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;
    const isAttendance = dataKey === "attendancePercentage";

    return (
      <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
        <h3 className="font-bold text-gray-900">
          {isAttendance ? data.subject : data.subName?.subName}
        </h3>
        <div className="mt-1 space-y-1">
          {isAttendance ? (
            <>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Attended:</span> {data.attendedClasses}/{data.totalClasses}
              </p>
              <p className="text-sm font-medium text-gray-900">
                {data.attendancePercentage}%
              </p>
            </>
          ) : (
            <p className="text-sm font-medium text-gray-900">
              <span className="font-normal text-gray-600">Marks:</span> {data.marksObtained}
            </p>
          )}
        </div>
      </div>
    );
  };

  // Custom legend formatter
  const renderLegend = (value) => {
    return (
      <span className="text-sm text-gray-600">
        {value}
      </span>
    );
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm p-4 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {title}
        </h3>
      )}
      
      <div className="h-80 sm:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            layout="vertical"
          >
            <XAxis 
              type="number" 
              domain={[0, 100]} 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis 
              dataKey={dataKey === "marksObtained" ? "subName.subName" : "subject"} 
              type="category" 
              width={100}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend formatter={renderLegend} />
            <Bar 
              dataKey={dataKey} 
              name={dataKey === "marksObtained" ? "Marks" : "Attendance"}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colorPalette[index % colorPalette.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomBarChart;