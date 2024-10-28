const styles = {
  primary:
    "bg-blue-700 hover:bg-blue-900 text-white py-2 px-10 rounded-md leading-6 font-sm transition-all duration-300",
  secondary:
    "border text-[#8BA8FA] py-2 px-4 rounded border-[#8BA8FA] hover:bg-[#8BA8FA] hover:text-black transition-all duration-300",
};

export function Button({
  children,
  styleType,
  type,
  className,
  onClick,
  disabled,
}) {
  return (
    <button
      className={`${styles[styleType]} ${className}`}
      type={type}
      onClick={onClick ? onClick : null}
      disabled={disabled ? disabled : null}
    >
      {children}
    </button>
  );
}
