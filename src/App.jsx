// import React from "react";
// import ReactDOM from "react-dom/client";

// function App() {
//   const user = { name: "Nouar", age: 60 };
//   return <Dashboard user={user} />;
// }

// function Dashboard({ user }) {
//   return <Sidebar user={user} />;
// }

// function Sidebar({ user }) {
//   return <Profile user={user} />;
// }

// function Profile({ user }) {
//   return (
//     <div>
//       <h2>Welcome, {user.name}!</h2>
//       <p>Age: {user.age}</p>
//     </div>
//   );
// }
// export default App;

import "./App.css";

import React, { useState, useEffect, createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

// Create User Context
const UserContext = createContext();

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
      <HashRouter>
        <nav style={{ marginBottom: 20 }}>
          <Link to="/">User List</Link> | <Link to="/profile">Profile</Link>
        </nav>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </HashRouter>
    </UserContext.Provider>
  );
}

function UserList() {
  const [users, setUsers] = useState([]);
  const { setSelectedUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);

  function handleSelect(user) {
    setSelectedUser(user);
    navigate("/profile");
  }

  return (
    <div>
      <h1>User List</h1>
      {users.length === 0 ? (
        <p>Loading users...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => handleSelect(user)}
              style={{
                cursor: "pointer",
                padding: "8px",
                borderBottom: "1px solid #ccc",
              }}
            >
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function UserProfile() {
  const { selectedUser } = useContext(UserContext);

  if (!selectedUser) {
    return <p>No user selected. Please go back and pick a user.</p>;
  }

  return (
    <div>
      <h1>{selectedUser.name}</h1>
      <p>
        <strong>Email:</strong> {selectedUser.email}
      </p>
      <p>
        <strong>Phone:</strong> {selectedUser.phone}
      </p>
      <p>
        <strong>Website:</strong> {selectedUser.website}
      </p>
    </div>
  );
}

// Render your app into the root element
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
npm run build
