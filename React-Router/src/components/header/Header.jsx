import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-white text-2xl font-semibold">React Router Example</h1>
        <nav>
          <ul className="flex space-x-6 text-white font-semibold">
            <li>
              <Link to="/">
              Home
              </Link>
            </li>
            <li>
              <Link to="/aboutus">
              About
              </Link>
            </li>
            <li>
              <Link to="/contactus/123">
              Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
