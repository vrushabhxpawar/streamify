import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../src/pages/HomePage.jsx";
import SignupPage from "../src/pages/SignupPage.jsx";
import LoginPage from "../src/pages/LoginPage.jsx";
import OnboardingPage from "../src/pages/OnboardingPage.jsx";
import ChatPage from "../src/pages/ChatPage.jsx";
import CallPage from "../src/pages/CallPage.jsx";
import NotificationPage from "../src/pages/NotificationPage.jsx";
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";
import useAuthuser from "../hooks/useAuthuser.js";
import Layout from "../src/components/Layout.jsx";
import Friends from "../src/pages/Friends.jsx"
import { useThemeStore } from "../src/store/useThemeStore.js";

export default function App() {
  const { isLoading, authUser } = useAuthuser();
  const { theme } = useThemeStore();

  if (isLoading) {
    return <PageLoader />;
  }

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  return (
    <div className="h-screen text-5xl" data-theme={theme}>
      <div className="text-base text-center">
        <Toaster />
      </div>

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/signup" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignupPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/onboarding"
          element={
            !isAuthenticated ? (
              <SignupPage />
            ) : isAuthenticated && !isOnboarded ? (
              <OnboardingPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar>
                <NotificationPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/friends"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar>
                <Friends />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
      </Routes>
    </div>
  );
}
