import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const Button = ({ children, disabled, to, type, onClick }) => {
  const base =
    "text-sm inline-block rounded-full bg-yellow-400  font-semibold uppercase  tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring-1 focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed ";

  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " py-2 md:px-5 md:py-2.5 text-xs",
    round: base + " px-2.5 py-1 md:px-3.5 md:py-2",
    secondary:
      "text-sm inline-block rounded-full border-2 border-stone-300 bg-transparent px-4 py-2.5  font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed md:px-6 md:py-3.5",
  };

  return (
    <>
      {to ? (
        <Link to={to} className={styles[type]}>
          {children}
        </Link>
      ) : onClick ? (
        <button onClick={onClick} disabled={disabled} className={styles[type]}>
          {children}
        </button>
      ) : (
        <button disabled={disabled} className={styles[type]}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
