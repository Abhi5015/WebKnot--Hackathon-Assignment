
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/authContext';
import EventManagement from './pages/EventManagement';
import AttendeeManagement from './pages/AttendeeManagement';
import TaskTracker from './pages/TaskTracker';
import CalendarView from './pages/CalenderView'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import Navbar from './components/Navbar';

/**
 * PrivateRoute Component
 * Ensures only authenticated users can access protected routes.
 */
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/welcome" replace />;
  }

  return (
    <>
      <Navbar /> {/* Navbar renders once for all protected routes */}
      <div className="p-4">{children}</div>
    </>
  );
};

/**
 * PublicRoute Component
 * Prevents authenticated users from accessing public pages like Login or Signup.
 */
const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? <Navigate to="/" replace /> : children;
};

/**
 * Main App Component
 */
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/welcome"
            element={
              <PublicRoute>
                <Welcome />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <EventManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/attendees"
            element={
              <PrivateRoute>
                <AttendeeManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <TaskTracker />
              </PrivateRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <PrivateRoute>
                <CalendarView />
              </PrivateRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/welcome" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
