// Client Component for Comment Form
// File: components/CommentForm.client.tsx
'use client'

import { useState } from 'react';

export default function CommentForm({ 
  post, 
  addComment ,

}: { 
    post: any,
  addComment: (post: any, comment: string, ) => Promise<{ success: boolean, error?: string }>
}) {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const result = await addComment(post, comment);
      
      if (result.success) {
        setComment('');
      } else {
        setError(result.error || 'Failed to add comment');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form   className="space-y-4">
      <div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          name='comment'
          placeholder="Add a comment..."
          className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          required
        />
      </div>
      
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Comment'}
      </button>
    </form>
  );
}