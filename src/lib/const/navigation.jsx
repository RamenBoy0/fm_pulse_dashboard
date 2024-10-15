import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
	HiBriefcase,
	HiCalculator
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'FM Companies',
		label: 'FM Companies',
		path: '/',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'Gov Awarded Tenders',
		label: 'Gov Awarded Tenders',
		path: '/gov_awarded',
		icon: <HiBriefcase />
	},
	{
		key: 'WOG BCT',
		label: 'WOG BCT',
		path: '/wog_bct',
		icon: <HiOutlineCube />
	},
	{
		key: 'calculator',
		label: 'calculator',
		path: '/calculator',
		icon: <HiCalculator />
	}
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