// Manage the routes and components 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Layout from './components/shared/Layout'
import Tenders from './components/Tenders'
import HelpSupport from './components/Help'
import Calculator from './components/Calculator'
import GeBiz from './components/GeBiz'
import WOG from './components/WOG'
import AboutRepository from './components/AboutRepository'
import AboutCalculator from './components/AboutCalculator'
import ManualCalculator from './components/ManualCalculator'
import ManualRepository from './components/ManualRepository'


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='home' element={<Home />} />
                    <Route path='wog_bct' element={<Tenders />} />
                    <Route path='gebiz' element={<GeBiz />} />
                    <Route path='pulse_cost_calculator' element={<Calculator />} />
                    <Route path='wog_cost_calculator' element={<WOG />} />
                    <Route path='help' element={<HelpSupport />} />
                    <Route path='about_cal'element={<AboutCalculator />} />
                    <Route path='about_repo'element={<AboutRepository />} />
                    <Route path='manual_cal'element={<ManualCalculator/>} />
                    <Route path='manual_repo'element={<ManualRepository/>} />
                </Route>
            </Routes>
        </Router>
    )
}
export default App;
