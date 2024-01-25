import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import FormikTextArea from "../../Formik/FormikTextArea";
import { hitApi } from "../../services/hitapi";

const BotController = () => {
  let [message, setMessage] = useState("");
  let [botResponse, setBotResponse] = useState("");
  let socket = io();

  let sendMessage = async () => {
    try {
      let output = await hitApi({
        method: "GET",
        url: "/bots",
      });
      socket.emit("control-message", message);
      console.log(output);
      setBotResponse(`Bot: You said "${message}"`);
      setMessage();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    sendMessage();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Interactive Bot Form</h1>
        <div className="mb-4">
          <FormikTextArea
            name="messageInput"
            type="text"
            label="Text here : "
          ></FormikTextArea>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={sendMessage}
        >
          Send Message
        </button>
        {botResponse && (
          <div className="mt-4 text-gray-700">
            <p>{botResponse}</p>
          </div>
        )}
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.1.2/socket.io.js"></script>
    </div>
  );
};

export default BotController;
