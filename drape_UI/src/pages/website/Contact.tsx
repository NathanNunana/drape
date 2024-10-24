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
      toast.success("We have received your message, Thank you");
    } catch (error) {
      toast.error("Something went wrong, try again later!!!");
    } finally {
      setContactUsState(initialState);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="bg-gray-50">
        <div className="container mx-auto text-left mb-5 text-gray-500 px-8 lg:px-48 py-5">
          <p className="text-sm">
            <span className="text-red-500">Home</span> / Contact Us
          </p>
        </div>

      </div>
      <div className="bg-white">

        <div className="container mx-auto px-8 lg:px-48 mb-5">
          <h1 className="text-3xl font-bold mb-6 text-center text-red-500">Contact Us</h1>
          <p className="text-center text-gray-600 mb-8">Feel free to contact us</p>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 shadow-sm text-center border border-gray-50">
              <FaMapMarkerAlt className="text-red-500 text-3xl mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Our Address</h2>
              <p className="text-gray-700">Dabi 7, 1 Bono Street, GW-14565-3212, Sunyani Ghana</p>
            </div>

            <div className="bg-white p-6 shadow-sm text-center border border-gray-50">
              <FaEnvelope className="text-red-500 text-3xl mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Email Us</h2>
              <p className="text-gray-700">sales@drape.com</p>
              <p className="text-gray-700">info@drape.com</p>
            </div>

            <div className="bg-white p-6 shadow-sm text-center border border-gray-50">
              <FaPhone className="text-red-500 text-3xl mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Call Us</h2>
              <p className="text-gray-700">+233302438011</p>
              <p className="text-gray-700">+233206883274</p>
            </div>
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Google Map Embed */}
            <div className="bg-white p-6 shadow-sm border border-gray-50">
              <h2 className="text-xl font-semibold mb-4">Our Location</h2>
              <div className="w-full h-4/5 overflow-hidden rounded-lg shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.565002883352!2d-122.4064172846819!3d37.78593487975747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808de80bb8d1%3A0x5d2f3e26cf60a923!2sSalesforce%20Tower!5e0!3m2!1sen!2sus!4v1597661152777!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Company Location"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 shadow-sm border border-gray-50">
              <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Your Name</label>
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
                  className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition w-full"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

