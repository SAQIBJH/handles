import React from "react";
import Link from "next/link";
import { Ubuntu } from "next/font/google";
const navigationData = {
  column1: [
    { title: "About Us", href: "/" },
    { title: "Terms & Conditions", href: "/termsandconditions" },
    { title: "FAQ", href: "/faqs" },
  ],
  column2: [
    { title: "Handles", href: "/" },
    { title: "Door Accessories", href: "/" },
    { title: "Bespoke Design", href: "/bespoke" },
    { title: "Contact Us", href: "/contact-us" },
    { title: "Catalog", href: "/catalogues" },
  ],
};

const contactInfo = {
  office: {
    title: "Handles and More Office at Hidayath Building Group",
    address: "P.O Box 13650",
    location: "Dubai Investment Park, Phase 2, Dubai UAE",
    tel: "+971 4 885 7700",
    website: "www.handles-more.com",
    email: "info@handles-more.com",
  },
  showroom: {
    title: "Handles and More Showroom",
    address: "Office 103B- Building 5 Wing B, Dubai Design District- Dubai UAE",
    tel: "+971 4 885 7700",
    phone: "+971 52 1122 622",
    website: "www.handles-more.com",
    email: "info@handles-more.com",
  },
};

const socialMedia = [
  { srcImg: '/SocialIcons/Youtube.png', href: '#youtube', label: 'Youtube' },
  { srcImg: '/SocialIcons/Linkedin.png', href: '#linkedin', label: 'LinkedIn' },
  { srcImg: '/SocialIcons/Whatsapp.png', href: '#whatsapp', label: 'WhatsApp' },
  { srcImg: '/SocialIcons/Facebook.png', href: '#facebook', label: 'Facebook' },
  { srcImg: '/SocialIcons/Instagram.png', href: '#instagram', label: 'Instagram' },
];

const ubuntu = Ubuntu({
  subsets: ['latin', 'latin-ext'], // Customize the character set as needed
  weight: ['400', '700'], 
});


const Footer = () => {
  const renderNavLinks = (links) => {
    return links.map((link, index) => (
      <Link
        key={index}
        href={link.href}
        className="block hover:text-gray-200 hover:underline text-lg tracking-wide"
      >
        {link.title}
      </Link>
    ));
  };

  const renderContactInfo = ({
    title,
    address,
    location,
    tel,
    phone,
    website,
    email,
  }) => {
    return (
      <div className="space-y-1 text-center md:text-left text-sm">
        <h3 className="font-bold mb-4 text-sm">{title}</h3>
        <p className="text-sm">{address}</p>
        {location && <p>{location}</p>}
        <p>Tel {tel}</p>
        {phone && <p>Phone: {phone}</p>}
        <p>{website}</p>
        <p>Email {email}</p>
      </div>
    );
  };

  const renderSocialIcons = () => {
    return socialMedia.map(({ srcImg, href, label }, index) => (
      <Link 
        key={index} 
        href={href} 
        className="hover:text-gray-200 transition-colors duration-300 cursor-pointer" 
        aria-label={label}
      >
        <img 
          src={srcImg} 
          alt={label}
          className="w-full h-full object-cover"
         />
      </Link>
    ));
  };

  return (
    <footer className={`bg-[#008080] ${ubuntu.className} text-white w-full py-10`}>
      <div className="container mx-auto py-8 max-w-7xl flex flex-col gap-y-12">
        {/* 1st part */}
        <div className="grid grid-cols-1 md:grid-cols-8 gap-8">
          <div className="md:col-span-2 flex items-start justify-center md:justify-start">
            <img
              src="/logohm1.png"
              alt=""
              width={100}
              height={100}
              className="object-fit transform hover:scale-110 transition duration-300"
            />  
          </div>
          <div className="md:col-span-3 flex flex-col md:flex-row gap-8 md:gap-x-10 p-4">
            <div className="flex flex-col gap-y-3 p-2 items-center md:items-start">
              {renderNavLinks(navigationData.column1)}
            </div>
            <div className="hidden md:flex w-[2px] h-full items-center justify-center bg-teal-200/20 rounded-lg"></div>
            <div className="flex flex-col gap-y-3 py-2 items-center md:items-start">
              {renderNavLinks(navigationData.column2)}
            </div>
          </div>
        </div>

        {/* 2nd part */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Contact Information Section */}
          <div className="md:col-span-8 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-x-6">
            {/* First Contact Block */}
            <div className="flex-0">
              {renderContactInfo(contactInfo.office)}
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:flex w-[2px] h-full items-center justify-center bg-teal-200/20 rounded-lg"></div>

            {/* Second Contact Block */}
            <div className="flex-0">
              {renderContactInfo(contactInfo.showroom)}
            </div>
          </div>

          {/* Email and Social Media Section */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start space-y-9">
            <p className="text-xl font-bold">Email us at: info@handles-more.com</p>
            
            {/* Social Icons */}
            <div className="flex gap-x-6">
              {renderSocialIcons()}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
