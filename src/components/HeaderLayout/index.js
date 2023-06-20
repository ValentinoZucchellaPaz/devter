import Link from 'next/link'
import Image from 'next/image'
import logoBig from './assets/devter-high-resolution-logo-color-on-transparent-background.png'

export default function Header ({ children: title, links = [] }) {
  return (
    <header className="flex flex-col items-center gap-3 w-fit m-auto">
      <Link className="cursor-pointer" href="/">
        <Image className=" w-56" src={logoBig} alt="logo" />
      </Link>
      <h2 className="text-xl text-center text-[#1c5488] mx-10">
        {/* {title && `${title}`} */}
        {title}
      </h2>

      {links.length > 0 && (
        <nav className="flex flex-row gap-2 justify-center text-[#1c5488]">
          {links.map((link) => {
            return (
              <Link
                key={link.name}
                className="text-xl font-semibold hover:text-sky-600 border-b-2 border-transparent hover:border-sky-600 transition-all"
                href={link.url}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
