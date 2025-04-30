import React from 'react';
import { Workflow, ClipboardList } from 'lucide-react';

interface SidebarProps {
  activeTab: 'workflow' | 'logs';
  onTabChange: (tab: 'workflow' | 'logs') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white shadow-sm w-64 min-h-screen">
      <div className="py-6 px-4">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => onTabChange('workflow')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                activeTab === 'workflow'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Workflow className="mr-3 h-5 w-5" />
              <span>Workflow</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => onTabChange('logs')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                activeTab === 'logs'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <ClipboardList className="mr-3 h-5 w-5" />
              <span>Logs</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
