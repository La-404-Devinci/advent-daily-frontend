import { ArrowLeft } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const urlThatCanBack = [
  "/me/edit"
]

export default function Header(
    { title }
) {

  const pathname = useLocation().pathname

  return (
    <header className="fixed top-0 left-0 z-10 w-full text-left text-gray-200 bg-background-color">
      <div className="w-full max-w-[30rem] mx-auto px-6 py-4">
        {urlThatCanBack.includes(pathname) ? (
            <Link to="/me" className="inline-flex items-center gap-2">
              <ArrowLeft className="w-6 h-6 inline-block" />
              <p className="font-semibold text-lg">{title}</p>
            </Link>
          ) : (
            <p className="font-semibold text-lg">{title}</p>
          )
        }
      </div>
    </header>
  )}