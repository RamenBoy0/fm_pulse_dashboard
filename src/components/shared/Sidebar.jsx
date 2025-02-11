// Manage the Side bar
import React, {useState} from 'react'
import { FcLineChart } from "react-icons/fc";
import { Link, useLocation } from 'react-router-dom'
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from "../../lib/const/navigation"
import { FaChevronDown, FaChevronRight } from "react-icons/fa"; // Icons for expand/collapse
import classNames from 'classnames'

// CSS for sidebar
const linkClasses = 'flex items-center gap-2 px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

// Main function of side bar
export default function Sidebar() {
    return <div className='bg-neutral-900 w-60 p-3 flex flex-col text-white'>
        <div className='flex items-center gap-2 px-1 py-3'>

            {/*Icons and header*/}
            <FcLineChart fontSize={24} />
            <span className = 'text-neutral-100 text-lg'>FM Pulse</span>
        </div>
            {/*Map the items from DASHBOARD_SIDEBAR_LINKS*/}
        <div className='flex-1 py-8 flex flex-col gap-0.5'>
            {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                <SidebarLink key={item.key} item={item} />
            ))}
        </div>
        <div className='flex flex-col gap-0.5 pt-2 border-t border-neutral-700'>
            {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
                <SidebarLink key={item.key} item={item} />
            ))}
        </div>
    </div>
}


// Sidebar Link Component
function SidebarLink({ item }) {
    const { pathname } = useLocation();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            {item.children ? (
                <div>
                    {/* Parent menu item */}
                    <div 
                        className={classNames('flex justify-between items-center cursor-pointer', linkClasses)}
                        onClick={toggleExpand}
                    >
                        <div className="flex items-center gap-2">
                            <span className='text-xl'>{item.icon}</span>
                            {item.label}
                        </div>
                        <span>{isExpanded ? <FaChevronDown /> : <FaChevronRight />}</span>
                    </div>

                    {/* Nested child items */}
                    {isExpanded && (
                        <div className="ml-6">
                            {item.children.map((child) => (
                                <SidebarLink key={child.key} item={child} />
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <Link 
                    to={item.path} 
                    className={classNames(pathname === item.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClasses)}
                >
                    <span className='text-xl'>{item.icon}</span>
                    {item.label}
                </Link>
            )}
        </div>
    );
}