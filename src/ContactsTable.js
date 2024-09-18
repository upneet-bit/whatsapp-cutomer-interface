import React from 'react';
import { Phone, Mail } from 'lucide-react';

const ContactsTable = ({ filteredContacts, handleRowClick }) => (
  <table className="w-full">
    <thead>
      <tr className="border-b text-sm text-gray-600">
        <th className="text-left py-2 font-normal"></th>
        <th className="text-left py-2 font-normal">Order contacted about</th>
        <th className="text-left py-2 font-normal">Resolved by</th>
        <th className="text-left py-2 font-normal">Status</th>
        <th className="text-left py-2 font-normal">Date and Time</th>
        <th className="text-left py-2 font-normal">Attachments</th>
      </tr>
    </thead>
    <tbody>
      {filteredContacts.map((contact) => (
        contact && contact.id ? (
          <tr 
            key={contact.id} 
            className="border-b hover:bg-gray-50 cursor-pointer"
            onClick={() => handleRowClick(contact)}
          >
            <td className="py-3 flex items-center">
              <span className="text-blue-500">{contact.id}</span>
              {contact.type === 'phone' ? 
                <Phone size={16} className="ml-2 text-gray-400" /> : 
                <Mail size={16} className="ml-2 text-gray-400" />
              }
            </td>
            <td className="py-3 text-sm">{contact.order || '—'}</td>
            <td className="py-3 text-sm">{contact.resolvedBy || contact.lockedBy || '—'}</td>
            <td className="py-3">
              <span className={`text-xs px-2 py-1 rounded ${
                contact.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {contact.status || '—'}
              </span>
            </td>
            <td className="py-3 text-sm">{contact.date || '—'}</td>
            <td className="py-3 text-sm">
              {contact.attachments && contact.attachments.length > 0 ? (
                <span className="text-blue-500">{contact.attachments.length} attachment(s)</span>
              ) : '—'}
            </td>
          </tr>
        ) : null
      ))}
    </tbody>
  </table>
);

export default ContactsTable;