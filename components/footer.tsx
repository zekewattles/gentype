export function Footer() {
  const currentYear = new Date().getFullYear()

  return <footer className="mt-12 py-1 text-xs text-gray-500">© {currentYear} Zeke Wattles and all students.</footer>
}

