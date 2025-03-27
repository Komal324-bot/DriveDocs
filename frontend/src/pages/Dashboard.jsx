import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Dashboard = () => {
  const [text, setText] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false); 
  // Fetch logged-in user details
  useEffect(() => {
    fetch("https://drivedocs.onrender.com/auth/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Save draft locally
  const handleSaveDraft = () => {
    localStorage.setItem("draft", text);
    alert("Draft saved!");
  };

  // Upload letter to Google Drive
  const handleUpload = async () => {
    if (!text.trim()) {
      alert("Cannot upload an empty letter.");
      return;
    }

    setUploading(true);

    try {
        const response = await fetch("https://drivedocs.onrender.com/drive/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
          credentials: "include",
        });
  
        const data = await response.json();
        if (data.fileId) {
          alert("Letter uploaded to Google Drive!");
        } else {
          alert("Error uploading file: " + (data.error || "Unknown error"));
        }
      } catch (error) {
        alert("Upload failed. Please try again.");
      } finally {
        setUploading(false); // Hide Uploading popup
      }
    };

  // Logout function
  const handleLogout = () => {
    window.location.href = "http://localhost:3000/"; 
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>DriveDocs - Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <>
          <h2>Welcome, {user.profile.displayName}!</h2>
          <p>Email: {user.profile.emails[0].value}</p>

          <ReactQuill value={text} onChange={setText} style={{ height: "500px", width:"800px", marginBottom: "20px" }} />
<br></br>
          <div>
            <button onClick={handleSaveDraft} style={{ margin: "10px", padding: "10px" }}>Save Draft</button>
            <button onClick={handleUpload} style={{ margin: "10px", padding: "10px" }}>Upload to Drive</button>
          </div>

          <button onClick={handleLogout} style={{ marginTop: "20px", backgroundColor: "red", color: "white" }}>Logout</button>
        </>
      ) : (
        <p>Please log in to access the dashboard.</p>
      )}
      {uploading && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "20px",
            borderRadius: "8px",
            zIndex: 1000,
            fontSize: "1.2rem",
          }}
        >
          Uploading...
        </div>
      )}
    </div>
  );
};

export default Dashboard;
