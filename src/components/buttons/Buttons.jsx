export function PrimaryButton({ children, className, type }) {
  return (
    <button className={`bg-blue-700 hover:bg-blue-900 text-white py-2 px-4 rounded-md ${className}`} type={type}>
      {children}
    </button>
  );
}

export function SecondaryButton({ children, className }) {
  return (
    <button className={`bg-gray-700 hover:bg-gray-900 text-white py-2 px-4 rounded ${className}`}>
      {children}
    </button>
  );
}