import { ArrowLeft } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const urlThatCanBack = [
  "/me/edit",
  "/admin/profile"
]

const urlRedirect = {
  "/admin/profile": "/admin/scan",
  "/me/edit": "/me"
}

export default function Header({ title }) {
  const pathname = useLocation().pathname
  let redirectUrl = "/me";

  for (const url of urlThatCanBack) {
    if (pathname.includes(url)) {
      redirectUrl = urlRedirect[url];
      break;
    }
  }
  
  return (
    <header className="fixed top-0 left-0 z-10 w-full text-gray-200 bg-gray-950">
      <div className="w-full max-w-[30rem] mx-auto px-6 py-3">
        {urlThatCanBack.some(url => pathname.includes(url)) ? (
            <Link to={redirectUrl} className="inline-flex items-center gap-2">
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