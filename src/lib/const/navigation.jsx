import { HiOutlineQuestionMarkCircle } 
from 'react-icons/hi'

import { IoHomeOutline } 
from "react-icons/io5";

import { FaRegBuilding, FaGlobeAsia } 
from "react-icons/fa";

import { FaDatabase, FaCalculator, FaCubes, FaCube, FaBook } 
from "react-icons/fa";

import { FcLineChart } 
from "react-icons/fc";

export const DASHBOARD_SIDEBAR_LINKS = [

	{
	key: 'Home',
	label: 'Home',
	icon: <IoHomeOutline/>,
	children: [
		{
			key: 'FM Pulse',
			label: 'FM Pulse',
			path: '/home',
			icon: <FcLineChart/>
		}

		,{
			key: 'About',
			label: 'About',
			icon: <FaBook/>,
			children : [
				{
					key: 'AboutRepository',
					label: 'Repository',
					path: '/about_repo'
				
				},
				{
					key: 'AboutCalculator',
					label: 'Calculator',
					path: '/about_cal'
				
				}
			]
		}
	]
}
,
	{
        key: 'Repositories',
        label: 'Repositories',
		icon: <FaDatabase/>,
        children: [
		{
			key: 'GeBiz',
			label: 'WOG Data',
			path: '/gebiz',
			icon: <FaCubes />
		},

		{
			key: 'WOG BCT',
			label: 'JTC Cost Norms',
			path: '/wog_bct',
			icon: <FaCube />
		}	
	]	
},
	{
        key: 'Cost Calculators',
        label: 'Cost Calculators',
		icon: <FaCalculator/>,
        children: [
            {
                key: 'Pest Calculator',
                label: 'WOG Cost Calculator',
                path: '/wog_cost_calculator',
                icon: <FaGlobeAsia />
            },
            {
                key: 'Cost Calculator',
                label: 'JTC Cost Calculator',
                path: '/pulse_cost_calculator',
                icon: <FaRegBuilding />
            }
        ]
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'support',
		label: 'Help & Support',
		path: '/help',
		icon: <HiOutlineQuestionMarkCircle />
	}
]