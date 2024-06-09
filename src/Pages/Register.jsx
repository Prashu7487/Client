import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { useGlobalData } from "../GlobalContext";

export default function Register() {
  const { GlobalData, setGlobalData } = useGlobalData();
  const clientIDRef = useRef();
  const routeRef = useRef();

  const handleRegistration = (event) => {
    event.preventDefault();
    setGlobalData({
      ...GlobalData,
      Client: {
        ...GlobalData.Client,
        ClientID: clientIDRef.current.value,
        route: routeRef.current.value,
      },
    });
  };

  const handleDeregistration = (event) => {
    event.preventDefault();
    setGlobalData({
      ...GlobalData,
      Client: {
        ...GlobalData.Client,
        ClientID: "",
        route: "",
      },
    });
    clientIDRef.current.value = "";
    routeRef.current.value = "";
  };

  return (
    <form
      id="Registration-form"
      className="row g-3"
      onSubmit={handleRegistration}
    >
      <div className="col-12">
        <label htmlFor="inputClientID" className="form-label">
          Client ID:
        </label>
        <input
          type="text"
          className="form-control"
          id="inputClientID"
          placeholder="e.g. client1, client2.."
          defaultValue={GlobalData.Client.ClientID}
          ref={clientIDRef}
        ></input>
      </div>
      <div className="col-12">
        <label htmlFor="inputRoute" className="form-label">
          Listening Route:
        </label>
        <input
          type="text"
          className="form-control"
          id="inputRoute"
          placeholder="e.g. localhost:8080"
          defaultValue={GlobalData.Client.route}
          ref={routeRef}
        ></input>
        <small id="routeHelp" className="form-text text-muted">
          Route where client will listen for upcoming participation requests
        </small>
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary me-3">
          Register
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleDeregistration}
        >
          Deregister
        </button>
      </div>
    </form>
  );
}
