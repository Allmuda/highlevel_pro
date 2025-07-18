import React from 'react';

const LoginFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Support', href: '#' }
  ];

  return (
    <footer className="mt-8 pt-6 border-t border-border">
      <div className="text-center space-y-4">
        <div className="flex flex-wrap justify-center items-center space-x-6 text-sm">
          {footerLinks.map((link, index) => (
            <React.Fragment key={link.label}>
              <a
                href={link.href}
                className="text-text-muted hover:text-text-secondary transition-colors duration-150"
              >
                {link.label}
              </a>
              {index < footerLinks.length - 1 && (
                <span className="text-text-muted">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
        
        <p className="text-xs text-text-muted">
          © {currentYear} HighLevel Pro. All rights reserved.
        </p>
        
        <div className="flex justify-center items-center space-x-4 text-xs text-text-muted">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>System Status: Operational</span>
          </div>
          <span>•</span>
          <span>Version 2.4.1</span>
        </div>
      </div>
    </footer>
  );
};

export default LoginFooter;