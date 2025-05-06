import React, { useState } from 'react';
import { Workflow, ClipboardList, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  activeTab: 'workflow' | 'logs';
  onTabChange: (tab: 'workflow' | 'logs') => void;
  onCollapsedChange?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  onTabChange,
  onCollapsedChange 
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    if (onCollapsedChange) {
      onCollapsedChange(newCollapsedState);
    }
  };

  return (
    <div 
      className={`bg-white shadow-md border-r border-gray-200 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-16' : 'w-64'
      } min-h-screen relative`}
    >
      <button 
        onClick={toggleCollapsed}
        className="absolute -right-3 top-20 bg-white rounded-full p-1 shadow-md border border-gray-200 hover:bg-gray-50 focus:outline-none z-10"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
      
      <div className="py-6 px-2">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => onTabChange('workflow')}
              className={`w-full flex items-center ${collapsed ? 'justify-center' : 'px-4'} py-3 text-sm font-medium rounded-md ${
                activeTab === 'workflow'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              title="Workflow"
            >
              <Workflow className={`${collapsed ? '' : 'mr-3'} h-5 w-5`} />
              {!collapsed && <span>Workflow</span>}
            </button>
          </li>
          <li>
            <button
              onClick={() => onTabChange('logs')}
              className={`w-full flex items-center ${collapsed ? 'justify-center' : 'px-4'} py-3 text-sm font-medium rounded-md ${
                activeTab === 'logs'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              title="Logs"
            >
              <ClipboardList className={`${collapsed ? '' : 'mr-3'} h-5 w-5`} />
              {!collapsed && <span>Logs</span>}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
