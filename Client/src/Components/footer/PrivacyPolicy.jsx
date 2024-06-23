import React from 'react';
import './Styles.css';

const PrivacyPolicy = () => {
  return (
    <div>
      <header>
        <div className="header-container">
          <h3>Privacy Policy</h3>
        </div>
      </header>
      <main>
        <section>
          <h4>Introduction</h4>
          <p>
            This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>
        </section>
        <section>
          <h4>What Information We Collect</h4>
          <p>
            We collect information such as your name, email address, and other contact information.
          </p>
        </section>
        <section>
          <h4>How We Use Your Information</h4>
          <p>
            We use your information to provide you with our services, to communicate with you, and to improve our services.
          </p>
        </section>
        <section>
          <h4>How We Protect Your Information</h4>
          <p>
            We take reasonable measures to protect your information from unauthorized access, disclosure, or use.
          </p>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;