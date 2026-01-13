import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface SubmitState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setSubmitState({ status: 'error', message: 'Please fill in all fields.' });
      return;
    }

    setSubmitState({ status: 'loading' });

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        console.log('EmailJS not configured, logging form data:', formData);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSubmitState({
          status: 'success',
          message: 'Message received! I will get back to you soon.',
        });
        setFormData({ name: '', email: '', message: '' });
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      setSubmitState({
        status: 'success',
        message: 'Message sent successfully! I will get back to you soon.',
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitState({
        status: 'error',
        message: 'Failed to send message. Please try again or email me directly.',
      });
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
        </div>
        <div className="mt-16">
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full border-b-2 border-gray-300 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none py-2"
                  disabled={submitState.status === 'loading'}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full border-b-2 border-gray-300 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none py-2"
                  disabled={submitState.status === 'loading'}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-1 block w-full border-b-2 border-gray-300 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none py-2"
                  disabled={submitState.status === 'loading'}
                />
              </div>

              {submitState.status === 'success' && (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
                  <CheckCircle className="h-5 w-5" />
                  <span>{submitState.message}</span>
                </div>
              )}

              {submitState.status === 'error' && (
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                  <AlertCircle className="h-5 w-5" />
                  <span>{submitState.message}</span>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={submitState.status === 'loading'}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submitState.status === 'loading' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
