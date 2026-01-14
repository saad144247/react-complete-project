import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="p-6 flex justify-between items-center px-39">
      <h1 className="text-xl font-bold text-white-600">My passion</h1>
      <div className="flex gap-9 items-center">
        <Link to="/" className="">Home</Link>
        <Link to="/todo" className="">Todo</Link>
        <Link to="/students" className="">Students</Link>
      </div>
    </nav>
  );
};

export default Navbar;
