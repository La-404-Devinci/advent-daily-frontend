export default function Light({ size, top, left, color }) {
    return (
      <div
        className={`absolute rounded-full blur-3xl -z-10`}
        style={{
          top: `${top}%`, // Use percentage for top positioning
          left: `${left}%`, // Use percentage for left positioning
          width: `${size}rem`, // consider keeping it in rem for consistent sizing
          height: `${size}rem`, // consider keeping it in rem for consistent sizing
          backgroundColor: `#${color}`
        }}
      ></div>
    );
  }