import '@/styles/globals.css'

export default function App ({ Component, pageProps }) {
  return (
    <main className="grid place-content-center w-screen h-screen bg-gradient-to-r from-indigo-200">
      <div className='flex flex-col bg-white shadow-xl font-poppins w-screen h-screen sm:w-[450px] sm:h-[90vh] sm:rounded-lg relative'>
        <Component {...pageProps} />
      </div>
    </main>
  )
}
