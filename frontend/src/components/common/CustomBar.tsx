import { Rectangle, RectangleProps } from "recharts";

const CustomBar = (props: RectangleProps) => {
  const { fill, x, y, width, height } = props;
  const radius = 9999;

  return (
    <Rectangle
      x={typeof x === "string" ? parseInt(x) : x}
      y={typeof y === "string" ? parseInt(y) : y}
      fill={fill}
      width={width}
      height={height}
      radius={radius}
    />
  );
};

export default CustomBar;
