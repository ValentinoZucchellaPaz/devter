export default function Button ({ children, handleClick, disabled, classes = 'bg-black text-white', title }) {
  return (
    <button
    disabled={disabled}
      onClick={handleClick}
      className={`rounded-full font-bold px-4 py-1 w-fit h-fit ${classes} cursor-pointer hover:opacity-80 active:translate-y-[2px] flex flex-row gap-3 transition-all disabled:opacity-20 disabled:active:transform-none disabled:hover:cursor-default select-none`}
      title={title && title}
    >
      {children}
    </button>
  )
}
