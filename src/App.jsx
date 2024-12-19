import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
// import Dashboard from './components/Dashboard'
import Tenders from './components/Tenders'
import Settings from './components/Setting'
import HelpSupport from './components/Help'
import GovAwarded from './components/GovAwarded'
import Calculator from './components/Calculator'
import GeBiz from './components/GeBiz'
import Pest from './components/Pest'


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Calculator />} />
                    <Route path='wog_bct' element={<Tenders />} />
                    <Route path='gov_awarded' element={<GovAwarded />} />
                    <Route path='gebiz' element={<GeBiz />} />
                    <Route path='pulse_cost_calculator' element={<Calculator />} />
                    <Route path='pest_cost_calculator' element={<Pest />} />
                    <Route path='settings' element={<Settings />} />
                    <Route path='help' element={<HelpSupport />} />
                </Route>
            </Routes>
        </Router>
    )
}
export default App;
