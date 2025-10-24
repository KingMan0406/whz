import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import SplashScreen from './components/SplashScreen';
import OnboardingScreen from './components/OnboardingScreen';
import LoginScreen from './components/LoginScreen';
import StudentDashboard from './components/StudentDashboard';
import PixiChat from './components/PixiChat';
import EventsList from './components/EventsList';
import EventDetails from './components/EventDetails';
import SocialWall from './components/SocialWall';
import MensaTimetable from './components/MensaTimetable';
import NotificationsScreen from './components/NotificationsScreen';
import ProfileScreen from './components/ProfileScreen';
import BottomNav from './components/BottomNav';
import { Toaster } from './components/ui/sonner';

type AppFlow = 'splash' | 'onboarding' | 'login' | 'app';
type Screen = 'dashboard' | 'events' | 'event-details' | 'social' | 'pixi' | 'mensa-timetable' | 'notifications' | 'profile';

export default function App() {
  const [flow, setFlow] = useState<AppFlow>('splash');
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<'student' | 'admin' | 'pixi'>('student');

  useEffect(() => {
    // Auto-advance from splash after 2 seconds
    if (flow === 'splash') {
      const timer = setTimeout(() => {
        setFlow('onboarding');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [flow]);

  const handleSplashComplete = () => {
    setFlow('onboarding');
  };

  const handleOnboardingComplete = () => {
    setFlow('login');
  };

  const handleLogin = (role: 'student' | 'admin' | 'pixi') => {
    setUserRole(role);
    setFlow('app');
  };

  const handleLogout = () => {
    setFlow('splash');
    setCurrentScreen('dashboard');
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleSelectEvent = (eventId: number) => {
    setSelectedEventId(eventId);
    setCurrentScreen('event-details');
  };

  const handleBackFromEventDetails = () => {
    setCurrentScreen('events');
  };

  // Render flow-based screens
  if (flow === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (flow === 'onboarding') {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  if (flow === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Main app with bottom navigation
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Container */}
      <div className="max-w-md mx-auto relative bg-white min-h-screen shadow-xl">
        <AnimatePresence mode="wait">
          {currentScreen === 'dashboard' && (
            <StudentDashboard key="dashboard" onNavigate={handleNavigate} />
          )}
          
          {currentScreen === 'events' && (
            <EventsList key="events" onSelectEvent={handleSelectEvent} />
          )}
          
          {currentScreen === 'event-details' && selectedEventId && (
            <EventDetails
              key="event-details"
              eventId={selectedEventId}
              onBack={handleBackFromEventDetails}
            />
          )}
          
          {currentScreen === 'social' && (
            <SocialWall key="social" />
          )}
          
          {currentScreen === 'pixi' && (
            <PixiChat key="pixi" />
          )}
          
          {currentScreen === 'mensa-timetable' && (
            <MensaTimetable key="mensa-timetable" />
          )}
          
          {currentScreen === 'notifications' && (
            <NotificationsScreen key="notifications" />
          )}
          
          {currentScreen === 'profile' && (
            <ProfileScreen key="profile" onLogout={handleLogout} />
          )}
        </AnimatePresence>

        {/* Bottom Navigation - Hide on event details */}
        {currentScreen !== 'event-details' && (
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            notificationCount={3}
          />
        )}
      </div>

      <Toaster />
    </div>
  );
}
