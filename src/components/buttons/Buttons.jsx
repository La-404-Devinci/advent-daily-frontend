const styles = {
  "primary": "bg-blue-700 hover:bg-blue-900 text-white py-2 px-4 rounded-md transition-colors",
  "secondary": "bg-gray-700 hover:bg-gray-900 text-white py-2 px-4 rounded transition-colors",
  "danger": "border border-red-700 bg-red-700/30 hover:bg-red-900 text-white py-2 px-4 rounded-md transition-colors",
}

export function Button({ children, styleType, type="button", className, onClick=null }) {
  return (
    <button 
      className={`${styles[styleType]} ${className}`} 
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}