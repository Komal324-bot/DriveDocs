import React, { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/auth/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  return (
    <div>
      <h1>Welcome to DriveDocs</h1>
      <p>
          Create, edit, and save your documents seamlessly to Google Drive.
          Access them anytime, anywhere, securely.
        </p>
        <p style={{ fontSize: "1.2rem", color: "#999", marginBottom: "15px" }}>
        🚀 <b>DriveDocs</b> is a simple yet powerful online text editor that allows you to 
        <b> create, edit, and save documents directly to your Google Drive</b><br></br> with just a click.
        No more worrying about losing drafts or manually uploading files—everything is stored securely in your Google account!
      </p>

      <h3>✨ Why Use DriveDocs?</h3>
      <ul>
        <li>✅ <b>Easy & Secure Google Login</b> – Sign in with Google and access your documents instantly.</li>
        <li>✅ <b>Auto-Save & Upload</b> – Write, edit, and save drafts before uploading them directly to Google Drive.</li>
        <li>✅ <b>Access Anywhere, Anytime</b> – View your letters and notes from any device.</li>
        <li>✅ <b>Minimal & Distraction-Free Editor</b> – Focus on your writing with a clean, intuitive interface.</li>
      </ul>

      <p>
        🔒 <b>Your privacy matters!</b> DriveDocs only requests necessary permissions to store and retrieve your files—nothing more.
      </p>

      <h3>📌 Get Started Now!</h3>
      <p>Click the button below to log in and start writing!</p>
     
        <a href="http://localhost:5000/auth/google"><button>Login with Google</button></a>
    </div>
  );
};

export default Home;
