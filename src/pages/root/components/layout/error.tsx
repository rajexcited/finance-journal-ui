import { FunctionComponent } from "react";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavBar } from "../navigation";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";


const ErrorPage: FunctionComponent = () => {

    const err = useRouteError();
    let errorMessage = "Could not find page. Please use navigation bar";

    if (isRouteErrorResponse(err) && err.status === 500) {
        errorMessage = err.data.errorMessage;
    }

    return <div className="section">
        <h1 className="title is-1 has-text-centered has-text-danger">
            <span>Ooops!</span>
        </h1>
        <NavBar />
        <section className="section">
            <span className="icon-text">
                <span className="icon has-text-danger">
                    <FontAwesomeIcon icon={ faBan } />
                </span>
                <span>{ errorMessage }</span>
            </span>
        </section>
    </div>;
};

export default ErrorPage;