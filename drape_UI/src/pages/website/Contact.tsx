import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../drape/store";
import { ContactUsState, contactUs } from "../slice/contactUsSlice";
import { toast, ToastContainer } from "react-toastify";

const initialState: ContactUsState = {
  your_name: "",
  email: "",
  subject: "",
  message: "",
  status: "idle",
  error: null,
};

const ContactUs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [contactUsState, setContactUsState] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactUsState({
      ...contactUsState,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(contactUs(contactUsState));
      toast.success("We have received your message, Thank you")
    } catch (error) {
      toast.error("Something went wrong, try again later!!!")
    } finally {
      setContactUsState(initialState)
    }
  };

  return (
    <div className="container mx-auto p-5 md:p-12">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-center">CONTACT US</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-4">
            We would love to hear from you! Whether you have a question,
            feedback, or just want to say hello, feel free to reach out to us.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="your_name"
                value={contactUsState.your_name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={contactUsState.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Subject</label>
              <input
                type="text"
                name="subject"
                value={contactUsState.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Message</label>
              <textarea
                name="message"
                value={contactUsState.message}
                onChange={handleChange}
                rows={4}
                placeholder="Your Message"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition w-full"
            >
              Send Message
            </button>
          </form>
        </div>
        <div className="bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="text-blue-500 mr-2" />
              <span className="text-gray-600">
                123 Main Street, Anytown, USA
              </span>
            </div>
            <div className="flex items-center mb-2">
              <FaPhone className="text-blue-500 mr-2" />
              <span className="text-gray-600">+1 (123) 456-7890</span>
            </div>
            <div className="flex items-center mb-2">
              <FaEnvelope className="text-blue-500 mr-2" />
              <span className="text-gray-600">contact@yourdomain.com</span>
            </div>
          </div>
          <div className="w-full h-64 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.565002883352!2d-122.4064172846819!3d37.78593487975747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808de80bb8d1%3A0x5d2f3e26cf60a923!2sSalesforce%20Tower!5e0!3m2!1sen!2sus!4v1597661152777!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

