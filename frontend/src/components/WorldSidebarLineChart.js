import React, { PureComponent } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default class LineChartExample extends PureComponent {
  render() {
    const data = this.props.data;

    const gradientOffset = () => {
      const dataMax = Math.max(...data.map((i) => i.world_tone));
      const dataMin = Math.min(...data.map((i) => i.world_tone));

      if (dataMax <= 0) {
        return 0;
      }
      if (dataMin >= 0) {
        return 1;
      }

      return dataMax / (dataMax - dataMin);
    };

    const off = gradientOffset();
    return (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart width={500} height={400} data={data}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="name"
            label={{ value: "month", position: "insideBottomRight", offset: 0 }}
            scale="band"
          />
          <YAxis domain={[-100, 100]} />
          <Tooltip />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="green" stopOpacity={0.3} />
              <stop offset={off} stopColor="red" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <Legend />
          <ReferenceLine y={0} label="" stroke="red" />
          {/* <Area type="monotone" dataKey="world_tone" fill="#8884d8" stroke="#8884d8" /> */}
          <Area
            type="monotone"
            dataKey="world_tone"
            stroke="#000"
            fill="url(#splitColor)"
          />
          <Line type="monotone" dataKey="country_tone" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}
