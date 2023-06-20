export default function Button ({ children, handleClick }) {
  return (
    <button
      onClick={handleClick}
      className=" rounded-full font-bold px-5 py-2 w-fit m-auto bg-black text-white cursor-pointer hover:opacity-80 active:translate-y-[2px] transition-all"
    >
      {children}
    </button>
  )
}
