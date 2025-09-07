import emailjs from '@emailjs/browser';

// EmailJS конфигурация
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID_CONTACT = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT!;
const EMAILJS_TEMPLATE_ID_BRIEF = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_BRIEF!;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

// Инициализация EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface BriefFormData {
  projectType: string;
  projectGoals: string;
  targetAudience: string;
  designPreferences: string;
  technicalRequirements: string;
  contentAssets: string;
  budget: string;
  timeline: string;
  successMetrics: string;
  email: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: 'acroneprod@gmail.com',
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_CONTACT,
      templateParams
    );

    console.log('Contact email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return false;
  }
};

export const sendBriefEmail = async (formData: BriefFormData): Promise<boolean> => {
  try {
    const templateParams = {
      project_type: formData.projectType,
      project_goals: formData.projectGoals,
      target_audience: formData.targetAudience,
      design_preferences: formData.designPreferences,
      technical_requirements: formData.technicalRequirements,
      content_assets: formData.contentAssets,
      budget: formData.budget,
      timeline: formData.timeline,
      success_metrics: formData.successMetrics,
      from_email: formData.email,
      to_email: 'acroneprod@gmail.com',
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_BRIEF,
      templateParams
    );

    console.log('Brief email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Failed to send brief email:', error);
    return false;
  }
};
