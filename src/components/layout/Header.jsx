export default function Header(
    { title }
) {
  return (
    <header className="fixed top-0 left-0 z-10 w-full text-left text-white bg-gray-900 ">
      <div className="w-full max-w-[30rem] mx-auto px-6 py-4">
        <p className="font-bold">{title}</p>
      </div>
    </header>
  )}