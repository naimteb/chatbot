import { useEffect, useRef, useState } from "react";
import "./App.css";
import "./SideNav.css";
import SideNav from "./SideNav";

export default function App() {
  const [value, setvalue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const [currentChat, setCurrentChat] = useState("1");
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  useEffect(() => {});
  // const [chatLog2, setChatLog2] = useState(() => {

  //   const stored = localStorage.getItem("entry2");

  //   return stored ? JSON.parse(stored) : [];

  // });

  const [chatLog, setChatLog] = useState(() => {
    const stored = localStorage.getItem("entry");
    return stored ? JSON.parse(stored) : {};
  });

  // const blockCounter = useRef(chatLog.length > 0 ? chatLog.length + 1 : 1);

  // useEffect(() => {
  //   blockCounter.current += 1;
  // }, [chatLog]);

  const chatContainerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const match = systemData.find((entry) => entry.requestIs === value);

    const response = match ? match.responseIs : "I don't understand";

    setChatLog((prevLog) => {
      const newLog = { ...prevLog };

      if (!newLog[currentChat]) {
        newLog[currentChat] = [{ request: value, response: response }]; // Create a new block at this index
      } else {
        // Append to existing block
        newLog[currentChat] = [
          ...newLog[currentChat],
          { request: value, response: response },
        ];
      }
      return newLog;
    });

    // case "2":
    //   setChatLog2((prevLog) => [
    //     ...prevLog /*spread */,
    //     { request: value, response: response },
    //   ]);
    //   break;

    setvalue("");
  };

  useEffect(() => {
    localStorage.setItem("entry", JSON.stringify(chatLog));
  }, [chatLog]);

  useEffect(() => {
    if (chatContainerRef.current) {
      /*is like querySelector (".chatcontent") */ chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatLog]);
  const systemData = [
    { requestIs: "how are you", responseIs: "Fine and you" },
    { requestIs: "Fine", responseIs: "great!" },
    { requestIs: "hello", responseIs: "Hi there!" },
    { requestIs: "hi", responseIs: "Hello!" },
    { requestIs: "what is your name", responseIs: "I'm a chatbot!" },
    { requestIs: "who made you", responseIs: "A kind developer built me." },
    { requestIs: "what can you do", responseIs: "I can chat with you!" },
    {
      requestIs: "tell me a joke",
      responseIs:
        "Why don’t scientists trust atoms? Because they make up everything!",
    },
    { requestIs: "bye", responseIs: "Goodbye! Have a great day!" },
    { requestIs: "thanks", responseIs: "You're welcome!" },
    { requestIs: "thank you", responseIs: "Glad to help!" },
    {
      requestIs: "what is the weather",
      responseIs: "I can't check weather right now, but I hope it's sunny!",
    },
    { requestIs: "do you like music", responseIs: "Yes! Music is wonderful." },
    {
      requestIs: "can you help me",
      responseIs: "Sure! What do you need help with?",
    },
    {
      requestIs: "i'm bored",
      responseIs: "Maybe try reading, drawing, or going for a walk!",
    },
  ];

  return (
    <>
      <div id="main">
        <SideNav
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          setCurrentChat={setCurrentChat}
        />
        <div className="fullscreen">
          <div className="chatbody">
            <div className="chatcontent" ref={chatContainerRef}>
              {chatLog[currentChat]?.length > 0 ? (
                chatLog[currentChat].map((entry, index) => (
                  <div key={index}>
                    <div className="requestContainer">
                      <p className="response">{entry.request}</p>
                    </div>
                    <div className="responseContainer">
                      <p className="response">{entry.response}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty-chat-message">
                  This chat is empty. Start a conversation!
                </p>
              )}
            </div>
            <div className="formcontainer">
              <form onSubmit={handleSubmit}>
                <div className="inputwrapper">
                  <input
                    className="inputfield"
                    type="text"
                    name="datafromuser"
                    id="request"
                    value={value}
                    onChange={(e) => setvalue(e.target.value)}
                    autoComplete={false}
                    ref={inputRef}
                  />
                  <button
                    type="submit"
                    className="submitbtn"
                    disabled={value.trim() === ""}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      width="20"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M4 21v-7l12-2-12-2V3l18 9z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
