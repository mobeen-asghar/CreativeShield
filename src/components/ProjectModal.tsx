import React, { useState } from 'react';
import { X, Calendar, Users, Flag } from 'lucide-react';
import FloatingButton from './FloatingButton';
import FormInput from './FormInput';

interface ProjectModalProps {
  onClose: () => void;
  onSave: (project: any) => void;
  project?: any;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ onClose, onSave, project }) => {
  const [name, setName] = useState(project?.name || '');
  const [dueDate, setDueDate] = useState(project?.dueDate?.split('T')[0] || '');
  const [priority, setPriority] = useState(project?.priority || 'medium');
  const [team, setTeam] = useState(project?.team?.join(', ') || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onSave({
      name: name.trim(),
      dueDate: dueDate ? new Date(dueDate).toISOString() : new Date().toISOString(),
      priority,
      team: team.split(',').map(t => t.trim()).filter(Boolean),
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto transform animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-light text-gray-900">
            {project ? 'Edit Project' : 'Create New Project'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Project Name"
            value={name}
            onChange={setName}
            placeholder="Enter project name"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-black focus:outline-none transition-all duration-300"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <div className="flex space-x-2">
              {['low', 'medium', 'high'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex-1 px-4 py-3 rounded-2xl border-2 transition-all duration-300 ${
                    priority === p
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Flag className="w-4 h-4" />
                    <span className="capitalize">{p}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <FormInput
            label="Team Members"
            value={team}
            onChange={setTeam}
            placeholder="Enter team member names (comma separated)"
          />

          {/* Actions */}
          <div className="flex space-x-4 pt-4">
            <FloatingButton
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </FloatingButton>
            <FloatingButton
              type="submit"
              variant="primary"
              disabled={isSubmitting || !name.trim()}
              className="flex-1"
            >
              {isSubmitting ? 'Saving...' : project ? 'Update' : 'Create'}
            </FloatingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;