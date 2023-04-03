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
  LabelList,
} from "recharts";

export default class BarChartExample extends PureComponent {
  constructor(props) {
    //현재 클래스형 컴포넌트가 상속받고 있는
    //리액트의 Component 클래스가 지닌 생성자 함수를 호출해 준다.
    super(props);
    this.state = {
      activeIndex: 11,
      hovered: "",
    };

    this.handleClick = this.handleClick.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.customizedLabel = this.customizedLabel.bind(this);
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

  onMouseOver(data, index) {
    this.setState({ hovered: index });
  }
  onMouseOut() {
    this.setState({ hovered: "" });
  }

  customizedLabel(e) {
    return (
      <text
        x={e.x + 10}
        y={e.y}
        dy={-4}
        fill={
          e.index === this.state.activeIndex
            ? "#82ca9d"
            : e.index === this.state.hovered
            ? "#8884d8"
            : "gray"
        }
        fontSize={10}
        textAnchor="middle"
      >
        {e.value > 1000 ? `${e.value.toString().slice(0, -3)}k` : e.value}
      </text>
    );
  }

  render() {
    const data = this.props.data;
    const language = this.props.language;
    const { activeIndex, hovered } = this.state;

    return (
      <ResponsiveContainer width="100%" height="60%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tickLine={false}
            label={{
              value: language === "ko" ? "월" : "month",
              position: "insideBottom",
              offset: -8,
            }}
          />
          <YAxis tickLine={false} hide={true} />
          <Tooltip content={() => <></>} />

          <Bar
            dataKey="bar"
            background={false}
            label={this.customizedLabel}
            onClick={this.handleClick}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
          >
            {data.map((entry, index) => (
              <Cell
                cursor="pointer"
                fill={
                  index === activeIndex
                    ? "#82ca9d"
                    : index === hovered
                    ? "#a5a5a5"
                    : "#8884d8"
                }
                key={`cell-${index}`}
              ></Cell>
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
