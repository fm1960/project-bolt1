import React from 'react';
import { MessageSquare } from 'lucide-react';

const MessagesPage = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          Messages
        </h1>
        <p className="text-gray-600 mt-2">
          View and manage your messages here
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center h-40">
          <p className="text-gray-500">No messages yet</p>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;