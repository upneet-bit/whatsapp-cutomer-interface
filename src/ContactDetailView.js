import React, { useState } from 'react';
import { X, Phone, Mail, Image as ImageIcon } from 'lucide-react';

const ContactDetailView = ({ contact, onClose }) => {
  const [enlargedImage, setEnlargedImage] = useState(null);

  if (!contact) {
    return null;
  }

  const openImage = (url) => {
    setEnlargedImage(url);
  };

  const closeEnlargedImage = () => {
    setEnlargedImage(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-y-auto pt-10">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Contact Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-4">
            <span className="text-blue-500 font-semibold mr-2">{contact.id}</span>
            <Phone size={16} className="text-gray-400" />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-semibold mb-2">Order contacted about</h3>
              <p>{contact.order || '—'}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Resolved by</h3>
              <p>{contact.resolvedBy || '—'}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Status</h3>
              <span className={`text-xs px-2 py-1 rounded ${
                contact.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {contact.status || '—'}
              </span>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Date and Time</h3>
              <p>{contact.date || '—'}</p>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Customer selected issue</h3>
            <p>{contact.customerIssue || 'Not specified'}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Agent selected issue</h3>
            <p>{contact.agentIssue || 'Not specified'}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Contact Timeline</h3>
            <div className="border-l-2 border-gray-200 pl-4">
              {contact.timeline && contact.timeline.length > 0 ? (
                contact.timeline.map((event, index) => (
                  <div key={index} className="mb-2">
                    <p className="text-sm text-gray-600">{event.date}</p>
                    <p>{event.action}</p>
                    <p className="text-sm text-gray-500">Agent: {event.agent}</p>
                  </div>
                ))
              ) : (
                <p>No timeline data available.</p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Attachments</h3>
            <div className="flex flex-wrap gap-4">
              {contact.attachments && contact.attachments.length > 0 ? (
                contact.attachments.map((url, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <img
                      src={url}
                      alt={`Attachment ${index + 1}`}
                      className="w-24 h-24 object-cover cursor-pointer rounded"
                      onClick={() => openImage(url)}
                    />
                    <span className="text-sm text-blue-500 mt-1">Attachment {index + 1}</span>
                  </div>
                ))
              ) : (
                <p>No attachments available.</p>
              )}
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-blue-500 mr-2">ⓘ</span>
                <span>Verify customer photos before offering a concession.</span>
                <p className="text-sm text-gray-600 mt-1">DO NOT tell the customer the photos are being verified. Ask them to wait a moment while you check on something.</p>
              </div>
              <button className="bg-white text-blue-500 px-3 py-1 rounded border border-blue-500">
                Verify photos
              </button>
            </div>
          </div>
        </div>
      </div>
      {enlargedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={closeEnlargedImage}>
          <div className="relative max-w-4xl max-h-full">
            <img src={enlargedImage} alt="Enlarged view" className="max-w-full max-h-full" />
            <button 
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation();
                closeEnlargedImage();
              }}
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactDetailView;