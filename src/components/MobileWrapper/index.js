export default function MobileWrapper({ children }) {
  return (
    <main className="grid place-content-center w-screen h-screen bg-gradient-to-r from-indigo-200 ...">
      <div className=" bg-white shadow-xl font-sans w-screen h-screen sm:w-[500px] sm:h-[90vh] sm:rounded-lg relative ">
        {children}
      </div>
    </main>
  );
}
