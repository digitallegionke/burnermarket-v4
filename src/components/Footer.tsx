import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container py-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/2">
            <h2 className="footer-heading mb-8">
              Unleash Your Healthy, Creative Magic in Every Kitchen Creation.
            </h2>
            <div className="flex flex-col gap-4">
              <span className="text-white text-xl font-bold">Follow us</span>
              <div className="flex gap-6">
                {/* Social icons would go here */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-overlay">
        <div className="container py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[44px] gap-y-4">
            <div>
              <ul className="space-y-2">
                <li><Link href="/gift-card" className="footer-text">Give Gift Card</Link></li>
                <li><Link href="/redeem" className="footer-text">Redeem Gift Card</Link></li>
                <li><Link href="/careers" className="footer-text">Careers</Link></li>
                <li><Link href="/supply-chain" className="footer-text">CA Supply Chain</Link></li>
                <li><Link href="/sitemap" className="footer-text">Sitemap</Link></li>
              </ul>
            </div>
            
            <div>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="footer-text">Privacy Policy</Link></li>
                <li><Link href="/terms" className="footer-text">Terms of Service</Link></li>
                <li><Link href="/do-not-sell" className="footer-text">Do Not Sell or Share My Information</Link></li>
                <li><Link href="/snap-ebt" className="footer-text">SNAP EBT</Link></li>
              </ul>
            </div>

            <div>
              <p className="footer-text opacity-70">
                This site is protected by reCAPTCHA and the Google{' '}
                <Link href="/privacy" className="underline">Privacy Policy</Link> and{' '}
                <Link href="/terms" className="underline">Terms of Service</Link> apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;