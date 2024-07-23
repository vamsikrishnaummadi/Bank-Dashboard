import { Sector, SectorProps } from "recharts";

const CustomSector = (props: SectorProps) => {
  const { fill, height, width, x, y } = props;
  return (
    <Sector
      fill={fill}
      width={width}
      height={height}
      x={x}
      y={y}
      startAngle={10}
      endAngle={10}
    />
  );
};

export default CustomSector;
