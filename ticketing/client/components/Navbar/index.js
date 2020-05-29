import Link from "next/link";

const Navbar = ({ currentUser }) => {
  const links = [
    !currentUser && { href: "/auth/signin", label: "Sign In" },
    !currentUser && { href: "/auth/signup", label: "Sign Up" },
    currentUser && { href: "/auth/signout", label: "Sign Out" },
  ]
    .filter((link) => link)
    .map(({ href, label }) => (
      <li className="nav-item" key={href}>
        <Link href={href}>
          <a className="nav-link">{label}</a>
        </Link>
      </li>
    ));

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">GitTik</a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex flex-row">{links}</ul>
      </div>
    </nav>
  );
};

export default Navbar;
