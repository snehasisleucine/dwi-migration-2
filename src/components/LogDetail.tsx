import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Clock, Server, Database } from 'lucide-react';
import { LogEntry } from './LogsTable';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  details: string;
}

interface LogDetailProps {
  log: LogEntry;
  auditLogs: AuditLogEntry[];
  onBack: () => void;
}

const LogDetail: React.FC<LogDetailProps> = ({ log, auditLogs, onBack }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'audit'>('details');

  // Function to render status icon
  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'failed':
        return <XCircle className="h-6 w-6 text-red-500" />;
      case 'cancelled':
        return <AlertCircle className="h-6 w-6 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden w-full">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <button 
            onClick={onBack}
            className="mr-4 p-1 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </button>
          <h3 className="text-lg font-medium leading-6 text-gray-900">Migration Details</h3>
        </div>
        <div className="flex items-center">
          {renderStatusIcon(log.status)}
          <span className="ml-2 text-sm font-medium text-gray-900 capitalize">{log.status}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-4 px-6 text-sm font-medium border-b-2 ${
              activeTab === 'details'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`py-4 px-6 text-sm font-medium border-b-2 ${
              activeTab === 'audit'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Audit Logs
          </button>
        </nav>
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === 'details' ? (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Migration Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Timestamp</p>
                    <p className="text-sm text-gray-500">{log.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Duration</p>
                    <p className="text-sm text-gray-500">{log.duration}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Server className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Source Instance</p>
                    <p className="text-sm text-gray-500">{log.sourceInstance}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Server className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Target Instance</p>
                    <p className="text-sm text-gray-500">{log.targetInstance}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Database className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Entities Migrated</p>
                    <p className="text-sm text-gray-500">{log.entityCount}</p>
                  </div>
                </div>
              </div>
            </div>

            {log.status === 'failed' && (
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <h4 className="text-sm font-medium text-red-800 mb-2">Error Details</h4>
                <p className="text-sm text-red-700">
                  Transaction aborted due to conflict with existing entities. All changes have been rolled back.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Audit Trail (UTC)</h4>
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Timestamp</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Action</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {auditLogs.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-4 pl-4 pr-3 text-sm text-gray-500 text-center">
                        No audit logs available
                      </td>
                    </tr>
                  ) : (
                    auditLogs.map((entry) => (
                      <tr key={entry.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">{entry.timestamp}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{entry.action}</td>
                        <td className="px-3 py-4 text-sm text-gray-500">{entry.details}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogDetail;
