import React from 'react';

function NotificationsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600">No new notifications</p>
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;