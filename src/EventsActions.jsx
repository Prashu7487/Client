import { useGlobalData } from "./GlobalContext";

export default function EventsAction() {
  const { GlobalData, setGlobalData } = useGlobalData();
  if (GlobalData.ConnectionObject) {
    let eventSource = GlobalData.ConnectionObject;

    eventSource.onopen = function (event) {
      console.log("Connection established.");
    };

    eventSource.onmessage = function (event) {
      console.log("Received message:", event.data);
      //   alert("Received message: " + event.data);

      eventSource.onerror = function (event) {
        console.error("EventSource failed:", event);
      };
    };
  }
}
