import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found flex flex-col gap-5 items-center mt-10">
      <h1 className="text-5xl">ERROR 404</h1>
      <img
        src="https://media.tenor.com/9ud1r4sc-QQAAAAM/confused-john-travolta.gif"
        alt="img-error-404"
      />
      <Link
        to="/"
        className="bg-black hover:bg-white hover:text-black hover:border-black text-white font-bold py-2 px-4 rounded-lg border-2 border-black transition-colors duration-300"
            >
        Retour à la page d'accueil
      </Link>
    </div>
  );
}

export default NotFound;
