type Segment = {
  color: string;
  value: number; // percentage
};

type Props = {
  segments: Segment[];
  size?: number;
  strokeWidth?: number;
};

const MultiSegmentCircle = ({
  segments,
  size = 150,
  strokeWidth = 42,
}: Props) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedOffset = 0;

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      {segments.map((segment, index) => {
        const segmentLength = (segment.value / 100) * circumference;
        const circle = (
          <circle
            key={index}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={segment.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
            strokeDashoffset={-accumulatedOffset}
            strokeLinecap="butt"
          />
        );

        accumulatedOffset += segmentLength;
        return circle;
      })}
    </svg>
  );
};

export default MultiSegmentCircle;
