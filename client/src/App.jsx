import "./App.css";
import { useState, useRef, useEffect } from "react";
import { UploadFile } from "./services/api";
import backGround from "./assets/background.jpg";

function App() {
  const inputFileRef = useRef();
  const [file, setFile] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileUpload = () => {
    inputFileRef.current.click();
  };

  useEffect(() => {
    const getFileUrl = async () => {
      setError(false);
      if (file) {
        try {
          const fileName = file.name;
          const data = new FormData();
          data.append("name", fileName);
          data.append("file", file);
          let response = await UploadFile(data);
          setResponse("https://sharebox.onrender.com" + response.path);
        } catch (err) {
          setErrorMessage("Something went wrong. Try again later. ");
          setError(true);
        }
      }
    };

    getFileUrl();
  }, [file]);
  return (
    <div className="container">
      <img src={backGround} alt="Banner" />
      <div className="wrapper">
        <h1>ShareBox+</h1>
        <p>Upload and share download link.</p>
        <button onClick={handleFileUpload}>Upload</button>
        <input
          type="file"
          ref={inputFileRef}
          style={{ display: "none" }}
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <a href={response} style={{ marginBottom: "1rem" }}>
          {response}
        </a>
        {error && (
          <p style={{ color: "red", fontWeight: "700" }}>{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

export default App;
