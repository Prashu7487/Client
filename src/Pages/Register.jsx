import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { useGlobalData } from "../GlobalContext";

export default function Register() {
  const { GlobalData, setGlobalData } = useGlobalData();
  const clientIDRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();

  const handleRegistration = (event) => {
    event.preventDefault();
    if (GlobalData.ConnectionObject) {
      console.log("Already registered..");
      return;
    }
    let eventSource = null;
    console.log("SSE connection Request Sent");
    try {
      const stream_url = "http://localhost:8000/events";
      eventSource = new EventSource(stream_url);
    } catch (err) {
      console.log("The error occured while SSE connection is:", err);
    }

    setGlobalData({
      ...GlobalData,
      Client: {
        ...GlobalData.Client,
        ClientID: clientIDRef.current.value,
        Name: nameRef.current.value,
        Email: emailRef.current.value,
      },
      ConnectionObject: eventSource,
    });
    const postData = async () => {
      try {
        const res = await fetch("http://localhost:8000/sign-in", {
          method: "POST",
          body: JSON.stringify(GlobalData.Client),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const result = await res.json();
      } catch (err) {
        console.log("Erro in sending Client Reg Data:", err);
      }
    };

    postData();

    console.log("Log from register onsubmit completion");
  };

  const handleDeregistration = (event) => {
    event.preventDefault();
    if (GlobalData.ConnectionObject) GlobalData.ConnectionObject.close();
    setGlobalData({
      ...GlobalData,
      Client: {
        ...GlobalData.Client,
        ClientID: "",
        Name: "",
        Email: "",
      },
      ConnectionObject: null,
    });
    clientIDRef.current.value = "";
    nameRef.current.value = "";
    emailRef.current.value = "";
  };

  return (
    <form
      id="Registration-form"
      className="row g-3"
      onSubmit={handleRegistration}
    >
      <div className="col-12">
        <label className="form-label">Client ID:</label>
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
        <label className="form-label">Name:</label>
        <input
          type="text"
          className="form-control"
          id="inputName"
          placeholder="Enter Name"
          defaultValue={GlobalData.Client.Name}
          ref={nameRef}
        ></input>
      </div>
      <div className="col-12">
        <label className="form-label">Email:</label>
        <input
          type="email"
          className="form-control"
          id="inputEmail"
          placeholder="Enter email"
          defaultValue={GlobalData.Client.Email}
          ref={emailRef}
        ></input>
      </div>
      <div className="col-12">
        <button
          type="submit"
          className="btn btn-primary me-3"
          id="liveToastBtn"
        >
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
