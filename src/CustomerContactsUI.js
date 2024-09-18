import React, { useState } from 'react';
import { RefreshCw, ChevronDown, Search, Phone, Mail, ChevronLeft, ChevronRight, ChevronsRight, Send } from 'lucide-react';
import axios from 'axios';
import Header from './Header';
import InfoCard from './InfoCard';
import ContactDetailView from './ContactDetailView';

const API_URL = 'http://localhost:5020'; // Update this with your actual API URL

const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array(length).fill().map(() => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
};

// Mock data generator function
const generateMockContact = (id) => ({
  id: `A${generateRandomString(14)}`,
  type: 'phone',
  order: `${Math.floor(Math.random() * 1000000)}`,
  resolvedBy: `agent_${Math.floor(Math.random() * 100)}`,
  status: Math.random() > 0.5 ? 'Resolved' : 'Pending',
  date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
  attachments: [
    'https://tiny.amazon.com/ycgfondb/s3examazmeditwilAC4a3d73',
    'https://tiny.amazon.com/ycgfondb/s3examazmeditwilAC4a3d73'
  ],
  customerIssue: 'Product damaged during shipping',
  agentIssue: 'Refund processing',
  timeline: [
    {
      date: '7 June 2024 15:53 Asia/Kolkata',
      action: 'Customer reported damaged product',
      agent: 'system'
    },
    {
      date: '7 June 2024 16:15 Asia/Kolkata',
      action: 'Agent reviewed complaint and initiated refund',
      agent: 'agent_42'
    }
  ]
});

const CustomerContactsUI = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [contacts, setContacts] = useState(() => {
    // Generate 5 initial mock contacts
    return Array(5).fill().map((_, index) => generateMockContact(index));
  });
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSending, setIsSending] = useState(false);

  // const fetchContacts = async () => {
  //   setIsLoading(true);
  //   try {
  //     const newContact = generateMockContact(contacts.length);
  //     setContacts(prevContacts => [newContact, ...prevContacts]);
  //   } catch (error) {
  //     console.error("Error fetching contacts:", error);
  //   }
  //   setIsLoading(false);
  // };

  function generateIdFromPhoneNumber(phoneNumber) {
    // Remove non-digit characters from the phone number
    const cleanNumber = phoneNumber.replace(/\D/g, '');
  
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < cleanNumber.length; i++) {
      const char = cleanNumber.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
  
    // Convert hash to a string of alphanumeric characters
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    let absoluteHash = Math.abs(hash);
    for (let i = 0; i < 15; i++) { // Generate a 15-character ID
      id += characters.charAt(absoluteHash % characters.length);
      absoluteHash = Math.floor(absoluteHash / characters.length);
    }
  
    return 'A' + id; // Ensure the ID starts with 'A'
  }
  
  

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const waId = phoneNumber.slice(1);
      const response = await axios.get(`${API_URL}/whatsapp/images/:${waId}`);
      console.log(response);
      const apiContact = response.data ;
      const fetchedContacts = {
        //id: apiContact.id,
        id: generateIdFromPhoneNumber(waId),
        type: 'phone', // Assuming all contacts are phone type
        order: apiContact.order || `WA-${Math.floor(Math.random() * 1000000)}`,
        resolvedBy: apiContact.resolvedBy || `agent_${Math.floor(Math.random() * 100)}`,
        status: apiContact.status || (Math.random() > 0.5 ? 'Resolved' : 'Pending'),
        date: apiContact.date || new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
        attachments: apiContact.urls || [],
        customerIssue: apiContact.customerIssue || 'Issue not specified',
        agentIssue: apiContact.agentIssue || 'Response not specified',
        timeline: apiContact.timeline || [
          {
            date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
            action: 'Contact fetched from API',
            agent: 'system'
          }
        ]
      };
      setContacts(prevContacts => [fetchedContacts, ...prevContacts]);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      // Optionally, you can show an error message to the user here
    }
    setIsLoading(false);
  };

  const sendMessage = async (e) => {
    // e.preventDefault();
    // if (!phoneNumber) {
    //   alert('Please enter a phone number.');
    //   return;
    // }
    // setIsSending(true);
    // try {
    //   const response = await axios.post(`${API_URL}/whatsapp/send-message`, {
    //     to: phoneNumber
    //   });
    //   console.log('Message sent:', response.data);
    //   alert(`Message sent to ${phoneNumber}`);
    //   setPhoneNumber('');
    // } catch (error) {
    //   console.error('Error sending message:', error);
    //   alert('Failed to send message. Please try again.');
    // }
    // setIsSending(false);
    e.preventDefault();
    if (!phoneNumber) {
      alert('Please enter a phone number.');
      return;
    }
    setIsSending(true);
    try {
      const response = await fetch(`${API_URL}/send-notification`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phoneNumber })
      });
      if (response.ok) {
          alert('Notification sent');
      } else {
          alert('Failed to send notification.');
      }
      //setPhoneNumber('');
  } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send notification. Please try again.');
    }
    setIsSending(false);
  };

  const filteredContacts = contacts.filter(contact => 
    contact && contact.id && contact.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRowClick = (contact) => {
    if (contact) {
      setSelectedContact(contact);
    }
  };

  return (
    <div className="bg-[#F7F9FC] min-h-screen">
      <Header />
      <div className="max-w-[1200px] mx-auto p-4">
        <InfoCard />
        
        {/* Message Sending Form */}
        <div className="bg-white mt-4 p-4 rounded shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Send Message</h2>
          <form onSubmit={sendMessage} className="flex items-center">
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-grow border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter phone number"
            />
            <button
              type="submit"
              disabled={isSending}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSending ? 'Sending...' : 'Send'}
              <Send size={16} className="ml-2" />
            </button>
          </form>
        </div>

        {/* Contacts List */}
        <div className="bg-white mt-4 p-4 rounded shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold">Past contacts with customer</h2>
              <button 
                onClick={fetchContacts} 
                className="ml-2 text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
              </button>
            </div>
            <div className="flex items-center">
              <input type="text" placeholder="Date range" className="border rounded px-2 py-1 text-sm mr-2" />
              <button className="bg-[#F0F2F5] text-sm px-3 py-1 rounded flex items-center">
                Bulk Actions <ChevronDown size={16} className="ml-1" />
              </button>
            </div>
          </div>
          <div className="flex mb-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search by Contact ID, Order ID, Associate, Status, Issue Code"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border rounded-l px-3 py-2 text-sm pr-8"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
            <button className="bg-[#FF9900] text-white px-4 py-2 rounded-r">
              <Search size={18} />
            </button>
          </div>
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
                    <td className="py-3 text-sm">{contact.resolvedBy || '—'}</td>
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
          <div className="mt-4 flex justify-center">
            <button className="text-gray-600 mx-1"><ChevronLeft size={20} /></button>
            <button className="text-gray-600 mx-1">1</button>
            <button className="text-gray-600 mx-1"><ChevronRight size={20} /></button>
            <button className="text-gray-600 mx-1"><ChevronsRight size={20} /></button>
          </div>
        </div>
      </div>
      {selectedContact && (
        <ContactDetailView 
          contact={selectedContact} 
          onClose={() => setSelectedContact(null)} 
        />
      )}
    </div>
  );
};

export default CustomerContactsUI;