import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default class BarChartExample extends PureComponent {
  constructor(props) {
    //현재 클래스형 컴포넌트가 상속받고 있는
    //리액트의 Component 클래스가 지닌 생성자 함수를 호출해 준다.
    super(props);
    this.state = {
      activeIndex: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.setActiveIndex = this.props.setActiveIndex.bind(this);
  }

  handleClick(data, index) {
    this.setState({
      activeIndex: index,
    });
    this.setActiveIndex(index);
    console.log(data);
    console.log(index);
  }

  render() {
    const data = this.props.data;
    const { activeIndex } = this.state;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="bar" onClick={this.handleClick}>
            {data.map((entry, index) => (
              <Cell
                cursor="pointer"
                fill={index === activeIndex ? "#82ca9d" : "#8884d8"}
                key={`cell-${index}`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
