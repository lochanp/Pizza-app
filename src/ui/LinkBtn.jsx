import { Link, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const LinkBtn = ({ children, to }) => {
  const navigate = useNavigate();

  return (
    <>
      {to === -1 ? (
        <button
          className="text-sm text-blue-500 hover:text-blue-600"
          onClick={() => navigate(-1)}
        >
          {children}
        </button>
      ) : (
        <Link to={to} className="text-sm text-blue-500 hover:text-blue-600">
          {children}
        </Link>
      )}
    </>
  );
};

export default LinkBtn;
