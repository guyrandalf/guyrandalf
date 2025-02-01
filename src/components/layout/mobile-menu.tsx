export default function MobileMenu() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-500 dark:text-gray-400"
      >
        {isOpen ? (
          <XIcon className="h-5 w-5" />
        ) : (
          <MenuIcon className="h-5 w-5" />
        )}
        <span className="sr-only">Toggle menu</span>
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-90 z-50">
          <div className="flex flex-col items-center justify-center h-full">
            <nav>
              <ul className="space-y-4">
                <li>
                  <Link href="/">
                    <a className="text-2xl font-bold">Home</a>
                  </Link>
                </li>
                <li>
                  <Link href="/projects">
                    <a className="text-2xl font-bold">Projects</a>
                  </Link>
                </li>
                <li>
                  <Link href="/about">
                    <a className="text-2xl font-bold">About</a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
