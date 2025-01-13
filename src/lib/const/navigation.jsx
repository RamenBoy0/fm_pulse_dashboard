import {
	// HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
	HiCalculator,
	HiDatabase
	// HiBeaker,
	// HiOfficeBuilding,
	// HiLightBulb,
	// HiHand
} from 'react-icons/hi'

import { FaBiohazard } from "react-icons/fa";

export const DASHBOARD_SIDEBAR_LINKS = [
	// {
	// 	key: 'FM Companies',
	// 	label: 'FM Companies',
	// 	path: '/',
	// 	icon: <HiOutlineViewGrid />
	// },
	// {
	// 	key: 'Gov Awarded Tenders',
	// 	label: 'Gov Awarded Tenders',
	// 	path: '/gov_awarded',
	// 	icon: <HiBriefcase />
	// },
	{
		key: 'WOG BCT',
		label: 'WOG BCT',
		path: '/wog_bct',
		icon: <HiOutlineCube />
	},
	{
		key: 'GeBiz',
		label: 'GeBiz',
		path: '/gebiz',
		icon: <HiDatabase  />
	},
	{
		key: 'Cost Calculator',
		label: 'Cost Calculator',
		path: '/pulse_cost_calculator',
		icon: <HiCalculator />
	},
	{
		key: 'Pest Calculator',
		label: 'Pest Calculator',
		path: '/pest_cost_calculator',
		icon: <FaBiohazard/>
	}
	// },

	// {
	// 	key: 'Cleaning & Waste Calculator',
	// 	label: 'Cleaning & Waste Calculator',
	// 	path: '/',
	// 	icon: <HiBeaker/>
	// }
	// ,

	// {
	// 	key: 'Landscape and Maintenance Calculator',
	// 	label: 'Landscape and Maintenance Calculator',
	// 	path: '/',
	// 	icon: <HiOfficeBuilding/>
	// },
	// {
	// 	key: 'Mechanical and Electrical Calculator',
	// 	label: 'Mechanical and Electrical Calculator',
	// 	path: '/',
	// 	icon: <HiLightBulb/>
	// }
	// ,
	// {
	// 	key: 'Sani',
	// 	label: 'Mechanical and Electrical Calculator',
	// 	path: '/',
	// 	icon: <HiHand/>
	// }

]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/help',
		icon: <HiOutlineQuestionMarkCircle />
	}
]