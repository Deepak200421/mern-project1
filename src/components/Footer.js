import React from 'react';

const Footer = ({ links, copyright }) => {
  return (
    <footer style={{ 
      position: 'fixed',
      bottom: 0,
      width: '100%',
      backgroundColor: 'pearlypink', // Changed color to pearlypink
      color: 'royalblue', // Changed text color to royalblue
      padding: '20px',
      textAlign: 'center'
    }}>
      <div>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {links && links.map((link, index) => (
            <li key={index} style={{ display: 'inline', marginRight: '20px' }}>
              <a href={link.url} style={{ color: 'black', textDecoration: 'none' }}>{link.title}</a> {/* Changed link color to gold */}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p style={{ margin: 0, fontSize: '0.8rem' }}>{copyright}</p>
      </div>
    </footer>
  );
};

Footer.defaultProps = {
  links: [
    { title: 'Terms of Service', url: '/terms-of-service' },
    { title: 'Privacy Policy', url: '/about' },
    { title: 'Contact Us', url: '/contact' }
  ],
  copyright: `© ${new Date().getFullYear()} Task Management. All rights reserved.`
};

export default Footer;
