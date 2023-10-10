import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="shadow-md p-6 bg-lime-300">
      
      <div className="branding text-4xl font-extrabold text-center mb-6 text-indigo-500">
        My App
      </div>

      <div className="text-center text-lg font-light mb-4 text-gray-600">
        Become better !!!
      </div>

      <nav>
        <ul className="flex justify-center space-x-6">
          <li className="transform hover:scale-110 transition duration-200">
            <Link className="text-lg font-semibold text-green-500 hover:text-orange-500" to="/">Home</Link>
          </li>
          <li className="transform hover:scale-110 transition duration-200">
            <Link className="text-lg font-semibold text-green-500 hover:text-orange-500" to="/new">Discover</Link>
          </li>
        </ul>
      </nav>
      
    </header>
  );
}

export default Header;
