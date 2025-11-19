// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Stores from "./pages/Stores"; // we'll create next
import Profile from "./pages/Profile"; // can be stub
import ProtectedRoute from "./components/ProtectedRoute";
import Toast from "./components/Toast";

export default function App() {
  return (
    <div className="text-3xl text-red-600 font-bold p-4">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/stores" element={
            <ProtectedRoute roles={["user","admin","owner"]}>
              <Stores />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute roles={["user","admin","owner"]}>
              <Profile />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Toast />
    </div>
  );
}
