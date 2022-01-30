import UserTableScreen from './screens/UserTableScreen';
import UserDetails from './screens/UserDetails';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
   
    return (
        <>
            <Router>
                <Routes>
                    
                    <Route path="/" element={<UserTableScreen />} />
                    <Route
                        path="/users/:id"
                        element={<UserDetails />}
                    />
                </Routes>
            </Router>
        </>
    );
}

export default App;
