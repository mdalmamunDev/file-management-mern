import { Link } from "react-router-dom";

const BreadcrumbNavigation = ({ item }) => {
  return (
    <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <Link to={'/my_files'} className="breadcrumb-item active text-decoration-none" aria-current="page">Home</Link>
            <li className="breadcrumb-item active" aria-current="page">{item}</li>
          </ol>
        </nav>
  )
}

export default BreadcrumbNavigation;