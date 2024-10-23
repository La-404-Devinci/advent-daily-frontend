export default function Header(
    { title }
) {
  return (
    <header className="w-full p-4 text-left text-white bg-gray-900">
        <p className="font-bold">{title}</p>
    </header>
  )}