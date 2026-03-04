// csls/src/app/admin/users/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrash, FaPlus, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string | null;
  status: string | null;
}

const UserManagementPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState("student");
  const [createUserError, setCreateUserError] = useState<string | null>(null);
  const [creatingUser, setCreatingUser] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data: User[] = await response.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user?.role !== "admin") {
      router.push("/signin");
      return;
    }
    fetchUsers();
  }, [session, status, router]);

  const handleRoleChange = async (userId: string, newRole: string) => {
    if (!confirm(`Are you sure you want to change the role of this user to ${newRole}?`)) {
      return;
    }
    setUpdatingUserId(userId);
    try {
      const response = await fetch(`/api/admin/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: newRole }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user role");
      }

      const updatedData = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: updatedData.user.role } : user
        )
      );
      alert("User role updated successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to update user role.");
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleStatusChange = async (userId: string, newStatus: "active" | "suspended") => {
    if (!confirm(`Are you sure you want to ${newStatus === "active" ? "activate" : "suspend"} this user?`)) {
      return;
    }
    setUpdatingUserId(userId);
    try {
      const response = await fetch(`/api/admin/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user status");
      }

      const updatedData = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: updatedData.user.status } : user
        )
      );
      alert("User status updated successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to update user status.");
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (session?.user?.id === userId) {
      alert("You cannot delete your own admin account.");
      return;
    }

    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }
    setUpdatingUserId(userId);
    try {
      const response = await fetch(`/api/admin/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      alert("User deleted successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to delete user.");
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateUserError(null);
    setCreatingUser(true);

    if (newUserPassword.length < 6) {
      setCreateUserError("Password must be at least 6 characters long.");
      setCreatingUser(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newUserName,
          email: newUserEmail,
          password: newUserPassword,
          role: newUserRole,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        fetchUsers(); // Refresh the user list
        setShowCreateUserModal(false);
        setNewUserName("");
        setNewUserEmail("");
        setNewUserPassword("");
        setNewUserRole("student");
      } else {
        setCreateUserError(data.message || "Failed to create user.");
      }
    } catch (err: any) {
      console.error("Create user error:", err);
      setCreateUserError("An unexpected error occurred.");
    } finally {
      setCreatingUser(false);
    }
  };

  if (status === "loading" || loading) {
    return <div className="flex justify-center items-center h-full text-lg text-gray-700">Loading users...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center text-lg font-semibold">Error: {error}</div>;
  }

  if (!session || session.user?.role !== "admin") {
    return <div className="text-red-600 text-center text-lg font-semibold">Access Denied: You must be an administrator to view this page.</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <button
          onClick={() => setShowCreateUserModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 transition duration-300 ease-in-out shadow-md transform hover:-translate-y-0.5"
        >
          <FaPlus />
          <span>Create New User</span>
        </button>
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">Name</th>
              <th scope="col" className="py-3 px-6">Email</th>
              <th scope="col" className="py-3 px-6">Role</th>
              <th scope="col" className="py-3 px-6">Status</th>
              <th scope="col" className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td colSpan={5} className="py-4 px-6 text-center text-gray-500">No users found.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name || "N/A"}</th>
                  <td className="py-4 px-6">{user.email}</td>
                  <td className="py-4 px-6">
                    <select
                      value={user.role || "student"}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      disabled={updatingUserId === user.id}
                    >
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {user.status || "N/A"}
                    </span>
                  </td>
                  <td className="py-4 px-6 space-x-2 flex items-center">
                    <button
                      onClick={() => handleStatusChange(user.id, user.status === "active" ? "suspended" : "active")}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline disabled:opacity-50"
                      disabled={updatingUserId === user.id}
                      title={user.status === "active" ? "Suspend User" : "Activate User"}
                    >
                      {user.status === "active" ? <FaTimesCircle className="inline-block mr-1" /> : <FaCheckCircle className="inline-block mr-1" />}
                      {updatingUserId === user.id ? "Updating..." : (user.status === "active" ? "Suspend" : "Activate")}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline disabled:opacity-50"
                      disabled={updatingUserId === user.id}
                      title="Delete User"
                    >
                      <FaTrash className="inline-block mr-1" />
                      {updatingUserId === user.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create User Modal */}
      {showCreateUserModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create New User</h2>
            <form onSubmit={handleCreateUser} className="space-y-4">
              {createUserError && <p className="text-red-600 text-sm mb-4">{createUserError}</p>}
              <div>
                <label htmlFor="newUserName" className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  id="newUserName"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="newUserEmail" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  id="newUserEmail"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="newUserPassword" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                <input
                  type="password"
                  id="newUserPassword"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="newUserRole" className="block text-gray-700 text-sm font-semibold mb-2">Role</label>
                <select
                  id="newUserRole"
                  className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition duration-200"
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateUserModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
                  disabled={creatingUser}
                >
                  {creatingUser ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
