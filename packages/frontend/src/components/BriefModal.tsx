"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

interface BriefModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  { id: 1, title: 'Project Type', question: 'What type of project are you looking for?' },
  { id: 2, title: 'Project Goals', question: 'What are your main objectives for this project?' },
  { id: 3, title: 'Target Audience', question: 'Who is your target audience?' },
  { id: 4, title: 'Design Preferences', question: 'Do you have any design preferences or style references?' },
  { id: 5, title: 'Technical Requirements', question: 'What are your technical requirements?' },
  { id: 6, title: 'Content & Assets', question: 'What content and assets do you have available?' },
  { id: 7, title: 'Budget', question: 'What\'s your budget range?' },
  { id: 8, title: 'Timeline', question: 'When do you need this completed?' },
  { id: 9, title: 'Success Metrics', question: 'How will you measure success?' },
  { id: 10, title: 'Contact', question: 'How can we reach you?' }
];

const PROJECT_TYPES = ['Web Design', 'Web3 Development', 'NFT Collection', 'Motion Design', 'Other'];
const BUDGET_RANGES = ['Under $5,000', '$5,000 - $15,000', '$15,000 - $50,000', 'Over $50,000'];
const TIMELINES = ['ASAP', '1-2 months', '3-6 months', '6+ months'];

const BriefModal = ({ isOpen, onClose }: BriefModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [formData, setFormData] = useState({
    projectType: '',
    projectGoals: '',
    targetAudience: '',
    designPreferences: '',
    technicalRequirements: '',
    contentAssets: '',
    budget: '',
    timeline: '',
    successMetrics: '',
    email: ''
  });

  const handleNext = () => {
    if (currentStep < 10) setCurrentStep(currentStep + 1);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      setScrollPosition(window.scrollY);
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position
      document.body.style.overflow = 'unset';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosition);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen, scrollPosition]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#111] rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10 mx-4 sm:mx-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4 sm:mb-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Project Brief</h3>
                <p className="text-white/70">Step {currentStep} of 10</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <FaTimes className="text-white" />
              </button>
            </div>

            <form name="brief" method="POST" data-netlify="true">
              <input type="hidden" name="form-name" value="brief" />
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-4">
                  {STEPS[currentStep - 1].question}
                </h4>

                {currentStep === 1 && (
                  <div className="grid grid-cols-2 gap-3">
                    {PROJECT_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({...formData, projectType: type})}
                        className={`p-3 rounded-lg border transition-colors ${
                          formData.projectType === type
                            ? 'border-white bg-white/10 text-white'
                            : 'border-white/20 text-white/70 hover:border-white/40'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}

                {currentStep === 2 && (
                  <textarea
                    value={formData.projectGoals}
                    onChange={(e) => setFormData({...formData, projectGoals: e.target.value})}
                    placeholder="Describe your main objectives, what you want to achieve, and the problems you're trying to solve..."
                    className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    rows={4}
                    required
                  />
                )}

                {currentStep === 3 && (
                  <textarea
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                    placeholder="Who is your target audience? Include demographics, interests, and user personas..."
                    className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    rows={4}
                    required
                  />
                )}

                {currentStep === 4 && (
                  <textarea
                    value={formData.designPreferences}
                    onChange={(e) => setFormData({...formData, designPreferences: e.target.value})}
                    placeholder="Describe your design preferences, style references, brand guidelines, colors, and any inspiration..."
                    className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    rows={4}
                    required
                  />
                )}

                {currentStep === 5 && (
                  <textarea
                    value={formData.technicalRequirements}
                    onChange={(e) => setFormData({...formData, technicalRequirements: e.target.value})}
                    placeholder="What are your technical requirements? Include platforms, integrations, performance needs, and any specific technologies..."
                    className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    rows={4}
                    required
                  />
                )}

                {currentStep === 6 && (
                  <textarea
                    value={formData.contentAssets}
                    onChange={(e) => setFormData({...formData, contentAssets: e.target.value})}
                    placeholder="What content and assets do you have? Include text, images, videos, logos, brand materials, and any existing content..."
                    className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    rows={4}
                    required
                  />
                )}

                {currentStep === 7 && (
                  <div className="space-y-3">
                    {BUDGET_RANGES.map((range) => (
                      <button
                        key={range}
                        type="button"
                        onClick={() => setFormData({...formData, budget: range})}
                        className={`w-full p-3 rounded-lg border transition-colors ${
                          formData.budget === range
                            ? 'border-white bg-white/10 text-white'
                            : 'border-white/20 text-white/70 hover:border-white/40'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                )}

                {currentStep === 8 && (
                  <div className="space-y-3">
                    {TIMELINES.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setFormData({...formData, timeline: time})}
                        className={`w-full p-3 rounded-lg border transition-colors ${
                          formData.timeline === time
                            ? 'border-white bg-white/10 text-white'
                            : 'border-white/20 text-white/70 hover:border-white/40'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}

                {currentStep === 9 && (
                  <textarea
                    value={formData.successMetrics}
                    onChange={(e) => setFormData({...formData, successMetrics: e.target.value})}
                    placeholder="How will you measure success? Include KPIs, metrics, goals, and how you'll track performance..."
                    className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    rows={4}
                    required
                  />
                )}

                {currentStep === 10 && (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your@email.com"
                    className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    required
                  />
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Back
                  </button>
                )}
                
                {currentStep < 10 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={
                      (currentStep === 1 && !formData.projectType) ||
                      (currentStep === 2 && !formData.projectGoals) ||
                      (currentStep === 3 && !formData.targetAudience) ||
                      (currentStep === 4 && !formData.designPreferences) ||
                      (currentStep === 5 && !formData.technicalRequirements) ||
                      (currentStep === 6 && !formData.contentAssets) ||
                      (currentStep === 7 && !formData.budget) ||
                      (currentStep === 8 && !formData.timeline) ||
                      (currentStep === 9 && !formData.successMetrics)
                    }
                    className="px-6 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-colors"
                  >
                    Send
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BriefModal;
