import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Dashboard from './components/Dashboard'
import Tenders from './components/Tenders'
import Settings from './components/Setting'
import HelpSupport from './components/Help'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path='tenders' element={<Tenders />} />
                    <Route path='settings' element={<Settings />} />
                    <Route path='help' element={<HelpSupport />} />
                </Route>
            </Routes>
        </Router>
    )
}
export default App;
