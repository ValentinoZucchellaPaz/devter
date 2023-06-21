export default function MobileWrapper ({ children, headerText = null }) {
  return (
    <main className="grid place-content-center w-screen h-screen bg-gradient-to-r from-indigo-200">
      <div className='flex flex-col justify-center bg-white shadow-xl font-sans w-screen h-screen sm:w-[500px] sm:h-[90vh] sm:rounded-lg relative'>
      <header className="w-full flex flex-row justify-start items-center h-14 border-b-[1px] border-solid border-gray-300 sticky top-0 bg-white bg-opacity-20">
        {headerText && <strong className="ml-2">{headerText}</strong>}
      </header>
        {children}
      </div>
    </main>
  )
}
