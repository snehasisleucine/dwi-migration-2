import React, { useState, useEffect } from 'react';
import { ComparedEntity, ComparisonResult, Bundle, EntityType } from '../types';
import { generateComparisonResults } from '../utils/mockData';
import { AlertCircle, CheckCircle, Loader2, Info, XCircle } from 'lucide-react';

interface ConflictResolutionProps {
  bundle: Bundle;
  onComplete: (comparedEntities: ComparedEntity[]) => void;
  onBack: () => void;
}

const ConflictResolution: React.FC<ConflictResolutionProps> = ({ 
  bundle, 
  onComplete,
  onBack 
}) => {
  const [comparedEntities, setComparedEntities] = useState<ComparedEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ComparisonResult | 'all'>('all');
  const [entityTypeFilter, setEntityTypeFilter] = useState<EntityType | 'all'>('all');

  useEffect(() => {
    // Simulate the comparison process
    const timer = setTimeout(() => {
      const results = generateComparisonResults(bundle.entities);
      setComparedEntities(results);
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [bundle]);

  const handleToggleEntity = (uuid: string) => {
    setComparedEntities(
      comparedEntities.map((entity) =>
        entity.uuid === uuid ? { ...entity, selected: !entity.selected } : entity
      )
    );
  };

  const handleSelectAll = (comparisonResult: ComparisonResult) => {
    setComparedEntities(
      comparedEntities.map((entity) =>
        entity.comparisonResult === comparisonResult ? { ...entity, selected: true } : entity
      )
    );
  };

  const handleDeselectAll = (comparisonResult: ComparisonResult) => {
    setComparedEntities(
      comparedEntities.map((entity) =>
        entity.comparisonResult === comparisonResult ? { ...entity, selected: false } : entity
      )
    );
  };

  const handleContinue = () => {
    onComplete(comparedEntities);
  };

  const filteredEntities = comparedEntities.filter(
    (entity) => 
      (filter === 'all' || entity.comparisonResult === filter) &&
      (entityTypeFilter === 'all' || entity.type === entityTypeFilter)
  );

  const getBadgeColor = (comparisonResult: ComparisonResult) => {
    switch (comparisonResult) {
      case ComparisonResult.Missing:
        return 'bg-blue-100 text-blue-800';
      case ComparisonResult.LabelMatch:
        return 'bg-green-100 text-green-800';
      case ComparisonResult.Conflict:
        return 'bg-red-100 text-red-800';
      case ComparisonResult.Match:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getComparisonIcon = (comparisonResult: ComparisonResult) => {
    switch (comparisonResult) {
      case ComparisonResult.Missing:
        return <Info className="w-4 h-4 text-blue-600" />;
      case ComparisonResult.LabelMatch:
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case ComparisonResult.Conflict:
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case ComparisonResult.Match:
        return <XCircle className="w-4 h-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getComparisonDescription = (comparisonResult: ComparisonResult) => {
    switch (comparisonResult) {
      case ComparisonResult.Missing:
        return 'UUID + Label absent → Missing → will be added';
      case ComparisonResult.LabelMatch:
        return 'UUID absent, Label present → Label-match → added with source UUID';
      case ComparisonResult.Conflict:
        return 'UUID present, Label different → Conflict → skipped unless overridden';
      case ComparisonResult.Match:
        return 'UUID + Label present → Match → skipped (already exists)';
      default:
        return '';
    }
  };

  const comparisonCounts = {
    [ComparisonResult.Missing]: comparedEntities.filter(e => e.comparisonResult === ComparisonResult.Missing).length,
    [ComparisonResult.LabelMatch]: comparedEntities.filter(e => e.comparisonResult === ComparisonResult.LabelMatch).length,
    [ComparisonResult.Conflict]: comparedEntities.filter(e => e.comparisonResult === ComparisonResult.Conflict).length,
    [ComparisonResult.Match]: comparedEntities.filter(e => e.comparisonResult === ComparisonResult.Match).length,
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Additions & Conflicts</h2>
      <p className="text-gray-600 mb-6">
        Review the differences between the source and target environments. Select the entities you wish to import.
      </p>

      {loading ? (
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">Comparing Entities</h3>
          <p className="text-gray-500 text-center">
            Analyzing the differences between the source and target environments...
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start">
              <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <p className="text-blue-800 font-medium">Missing ({comparisonCounts[ComparisonResult.Missing]})</p>
                <p className="text-blue-700 text-sm">{getComparisonDescription(ComparisonResult.Missing)}</p>
                <div className="flex mt-2 gap-2">
                  <button 
                    className="text-xs bg-blue-200 hover:bg-blue-300 text-blue-800 px-2 py-1 rounded transition-colors"
                    onClick={() => handleSelectAll(ComparisonResult.Missing)}
                  >
                    Select All
                  </button>
                  <button 
                    className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded transition-colors"
                    onClick={() => handleDeselectAll(ComparisonResult.Missing)}
                  >
                    Deselect All
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <p className="text-green-800 font-medium">Label Match ({comparisonCounts[ComparisonResult.LabelMatch]})</p>
                <p className="text-green-700 text-sm">{getComparisonDescription(ComparisonResult.LabelMatch)}</p>
                <div className="flex mt-2 gap-2">
                  <button 
                    className="text-xs bg-green-200 hover:bg-green-300 text-green-800 px-2 py-1 rounded transition-colors"
                    onClick={() => handleSelectAll(ComparisonResult.LabelMatch)}
                  >
                    Select All
                  </button>
                  <button 
                    className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded transition-colors"
                    onClick={() => handleDeselectAll(ComparisonResult.LabelMatch)}
                  >
                    Deselect All
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
              <div>
                <p className="text-red-800 font-medium">Conflicts ({comparisonCounts[ComparisonResult.Conflict]})</p>
                <p className="text-red-700 text-sm">{getComparisonDescription(ComparisonResult.Conflict)}</p>
                <div className="flex mt-2 gap-2">
                  <button 
                    className="text-xs bg-red-200 hover:bg-red-300 text-red-800 px-2 py-1 rounded transition-colors"
                    onClick={() => handleSelectAll(ComparisonResult.Conflict)}
                  >
                    Select All
                  </button>
                  <button 
                    className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded transition-colors"
                    onClick={() => handleDeselectAll(ComparisonResult.Conflict)}
                  >
                    Deselect All
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-start">
              <XCircle className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="text-gray-800 font-medium">Matches ({comparisonCounts[ComparisonResult.Match]})</p>
                <p className="text-gray-600 text-sm">{getComparisonDescription(ComparisonResult.Match)}</p>
              </div>
            </div>
          </div>

          <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-sm font-medium border border-gray-200 rounded-l-lg ${
                  filter === 'all' ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter(ComparisonResult.Missing)}
                className={`px-4 py-2 text-sm font-medium border-t border-b border-r border-gray-200 ${
                  filter === ComparisonResult.Missing ? 'bg-blue-100 text-blue-900' : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                Missing
              </button>
              <button
                onClick={() => setFilter(ComparisonResult.LabelMatch)}
                className={`px-4 py-2 text-sm font-medium border-t border-b border-r border-gray-200 ${
                  filter === ComparisonResult.LabelMatch ? 'bg-green-100 text-green-900' : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                Label Match
              </button>
              <button
                onClick={() => setFilter(ComparisonResult.Conflict)}
                className={`px-4 py-2 text-sm font-medium border-t border-b border-r border-gray-200 ${
                  filter === ComparisonResult.Conflict ? 'bg-red-100 text-red-900' : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                Conflicts
              </button>
              <button
                onClick={() => setFilter(ComparisonResult.Match)}
                className={`px-4 py-2 text-sm font-medium border-t border-b border-r border-gray-200 rounded-r-lg ${
                  filter === ComparisonResult.Match ? 'bg-gray-200 text-gray-900' : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                Matches
              </button>
            </div>
            
            <select
              className="px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={entityTypeFilter}
              onChange={(e) => setEntityTypeFilter(e.target.value as EntityType | 'all')}
            >
              <option value="all">All Entity Types</option>
              {Object.values(EntityType).map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}s
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Select
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Label
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    UUID
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEntities.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No entities match the current filters
                    </td>
                  </tr>
                ) : (
                  filteredEntities.map((entity) => (
                    <tr key={entity.uuid} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={entity.selected}
                          onChange={() => handleToggleEntity(entity.uuid)}
                          disabled={entity.comparisonResult === ComparisonResult.Match}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getComparisonIcon(entity.comparisonResult)}
                          <span 
                            className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(
                              entity.comparisonResult
                            )}`}
                          >
                            {entity.comparisonResult}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                        {entity.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {entity.label}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                        {entity.uuid.substring(0, 8)}...
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-amber-500 mr-2" />
                <span className="text-amber-800 font-medium">All-or-Nothing Transaction</span>
              </div>
              <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                Safety Feature
              </span>
            </div>
            <p className="text-amber-700 text-sm">
              Import will run as an all-or-nothing transaction. If any item fails, no changes are made.
            </p>
            <p className="text-amber-700 text-sm mt-1">
              Selected entities: <span className="font-medium">{comparedEntities.filter(e => e.selected).length}</span> of {comparedEntities.length} total
            </p>
          </div>

          <div className="flex justify-between">
            <button
              onClick={onBack}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-5 rounded-md font-medium transition-colors duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Back
            </button>
            <button
              onClick={handleContinue}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium transition-colors duration-300 flex items-center"
            >
              Continue
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ConflictResolution;
