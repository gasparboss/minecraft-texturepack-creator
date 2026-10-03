export default function NotFoundPage() {
  return (
    <div className="h-screen w-screen flex items-center relative" id="not-found-page">
      <div className="w-full h-[30vh] bg-black/60 flex flex-col justify-center items-center text-white text-shadow-2xl">
        <h1 className="text-7xl">404</h1>
        <h1 className="text-5xl ">Page not found!</h1>
      </div>
    </div>
  );
}
