export default function Home() {
  const currentYear = new Date().getFullYear();
  console.log(currentYear);
  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-100">
      <main className="flex-grow p-4 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        </div>
      </main>
      <footer className="bg-gray-800 border-t border-gray-700 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-sm text-gray-400">
            © {currentYear} Wallpaper App
          </div>
        </div>
      </footer>
    </div>
  );
}
