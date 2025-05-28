export default function SideNav({ setIsOpen, isOpen, setCurrentChat }) {
  return (
    <>
      <button
        className={`toggle-btn ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "X" : "☰"}
      </button>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="navlinks">
          <button className="chatlink" onClick={() => setCurrentChat("1")}>
            CHAT 1{" "}
          </button>
          <button className="chatlink" onClick={() => setCurrentChat("2")}>
            CHAT 2{" "}
          </button>
        </div>{" "}
      </div>
    </>
  );
}
