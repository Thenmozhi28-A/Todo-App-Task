import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import toast from "react-hot-toast";

function DashboardLayout({ children, currentUser }) {
  const navigate = useNavigate();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const handleLogout = () => {
    setIsLogoutOpen(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-700">MyApp</div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => navigate("home")}
            className="block w-full text-left px-2 py-1 rounded hover:bg-gray-700"
          >
            Home
          </button>
          <button
            onClick={() => navigate("profile")}
            className="block w-full text-left px-2 py-1 rounded hover:bg-gray-700"
          >
            Profile
          </button>
          <button
            onClick={() => navigate("settings")}
            className="block w-full text-left px-2 py-1 rounded hover:bg-gray-700"
          >
            Settings
          </button>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            Welcome, {currentUser?.username}
          </h1>
          <button
            onClick={() => setIsLogoutOpen(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </header>

        {/* Main Content Scrollable */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          {children}
        </main>

        {/* Logout Modal */}
        <Dialog
          open={isLogoutOpen}
          onClose={() => setIsLogoutOpen(false)}
          className="fixed z-10 inset-0 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Panel className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
              <Dialog.Title className="text-lg font-bold mb-4">
                Confirm Logout
              </Dialog.Title>
              <p className="mb-4">Are you sure you want to logout?</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsLogoutOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Logout
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default DashboardLayout;
