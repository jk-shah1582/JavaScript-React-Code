import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';

function Header() {
  const userStatus = useSelector((state)=>state.auth.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("User status in Header.jsx:", userStatus);

   const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <header className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-white text-2xl font-semibold">Auth Demo</h1>
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
              {
              userStatus ? (
                <button 
                  onClick={handleLogout}
                  className="hover:text-gray-200 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login">
                Login
                </Link>
              )
              }
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
