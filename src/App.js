import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Results from './result';
import SongDetails from './details';
import React from 'react';
import { AuthContext, AuthProvider } from './AuthContext';
import Navbar from './navbar';
import Home from './home';
import AccountPage from './users/accountpage';
import Account from './users/account';
import Users from "./users";
import Dashboard from './dashboard';
import EditPlaylistPage from './playlists/edit';

// ProtectedRoute component to handle the redirection based on authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, userId } = React.useContext(AuthContext);

  if (!isAuthenticated) {
    // Redirect them to the /signin page if they are not authenticated
    return <Navigate to="/signin" />;
  }

  // If the user is authenticated, render the "children" components
  return children;
};

function App() {
  console.log(process.env.REACT_APP_BASE_API_URL);

  return (
    <AuthProvider>
      {/* <Router> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Results />} />
        <Route path="/details/:id" element={<SongDetails />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        } />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/*" element={<Users />} />
        <Route path="/profile/:userId" element={<AccountPage />} />
        <Route path="/edit-playlist/:playlistId" element={<EditPlaylistPage />} />

      </Routes>
      {/* </Router> */}
    </AuthProvider>
  );
}

export default App;
