export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white p-4 mt-auto">
      <div className="container mx-auto">
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} Boston Latin Academy</p>
          <p>205 Townsend Street, Boston, MA, United States</p>
        </div>
      </div>
    </footer>
  );
}