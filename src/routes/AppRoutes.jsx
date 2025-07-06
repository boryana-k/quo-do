import { Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Welcome from '../pages/Welcome';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';


function AppRoutes() {
    const { currentUser } = useAuth();

    return (
        <Routes>
            <Route 
                path="/" 
                element={currentUser ? <Navigate to="/dashboard" /> : <Welcome />} 
            />
            <Route 
                path="/welcome" 
                element={currentUser ? <Navigate to="/dashboard" /> : <Welcome />} 
            />
            <Route 
                path="/dashboard" 
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } 
            />
        </Routes>
    );
};

export default AppRoutes;