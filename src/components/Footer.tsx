import React from "react";
import { MapPin, Link2, Globe } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0D1117] text-white px-6 py-12 md:px-20 border-t border-white shadow-inner">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-white/[0.08] pb-10">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#3f85a9]">
            <MapPin className="w-5 h-5 text-red-400" />
            Our Office
          </h2>
          <p className="mt-4 leading-6 text-sm text-gray-300 space-y-1">
            HextGen <br />
            1-73, Active Hill Reside, Janardhana Hills <br />
            Gachibowli, Hyderabad, Telangana - 500032 <br />
            Email: hextgen@gmail.com <br />
            Phone: +91 7093211926
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#3f85a9]">
            <Link2 className="w-5 h-5 text-sky-400" />
            Quick Links
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-gray-300">
            {[
              "Home",
              "Contact Us",
              "Why HextGen",
              "Blogs",
            ].map((text) => (
              <li key={text}>
                <a href="#" className="hover:text-white transition">
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#3f85a9]">
            <Globe className="w-5 h-5 text-green-400" />
            Follow Us
          </h2>
          <div className="mt-4 flex gap-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              aria-label="Facebook"
              className="hover:text-blue-500 transition"
            >
              <FaFacebook className="w-6 h-6" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              aria-label="Twitter"
              className="hover:text-sky-400 transition"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/company/hextgen/posts/?feedView=all"
              target="_blank"
              aria-label="LinkedIn"
              className="hover:text-blue-300 transition"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              aria-label="Instagram"
              className="hover:text-pink-400 transition"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        © 2025 <span className="text-white font-medium">HextGen Technologies</span>. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
