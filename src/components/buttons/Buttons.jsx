const styles = {
  "primary": "bg-blue-700 hover:bg-blue-900 text-white py-2 px-4 rounded-md",
  "secondary": "bg-gray-700 hover:bg-gray-900 text-white py-2 px-4 rounded"
}

export function Button({ children, styleType, type, className }) {
  return (
    <button className={`${styles[styleType]} ${className}`} type={type}>
      {children}
    </button>
  )
}