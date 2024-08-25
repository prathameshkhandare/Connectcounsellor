import React from 'react';
import './Styles.css';

const PrivacyPolicy = () => {
  return (
    <div>
      <header>
        <div className="header-container">
          <h3>Privacy Policy for Connect Counsellor</h3>
        </div>
      </header>
      <main>
        <section>
          <h4>Effective Date: [Insert Date]</h4>
          <p>
            At Connect Counsellor, accessible from [Insert Website URL], we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website and register for our counseling courses.
          </p>
        </section>
        <section>
          <h4>1. Information We Collect</h4>
          <p>
            We may collect the following types of personal information:
          </p>
          <ul>
            <li><strong>Personal Information:</strong> During registration, we collect information such as your name, email address, phone number, and any profile details you save on our website.</li>
          </ul>
        </section>
        <section>
          <h4>2. How Information is Collected</h4>
          <p>
            We collect information at the time of registration and through the profiles users create on our website. This helps streamline your experience.
          </p>
        </section>
        <section>
          <h4>3. Purpose of Data Collection</h4>
          <p>
            We use the collected information to make your experience more convenient, allowing you to avoid filling in details repeatedly on our website.
          </p>
        </section>
        <section>
          <h4>4. Data Sharing</h4>
          <p>
            We do not share user data with any third parties. The information is used solely for enhancing your experience on our website.
          </p>
        </section>
        <section>
          <h4>5. Data Security</h4>
          <p>
            We prioritize your security by storing your data in a secure database using hashing techniques. We respect your privacy and take measures to protect your information.
          </p>
        </section>
        <section>
          <h4>6. User Rights</h4>
          <p>
            You have the right to log out at any time, change your password, and contact us if you encounter any issues.
          </p>
        </section>
        <section>
          <h4>7. Changes to the Privacy Policy</h4>
          <p>
            While we generally do not anticipate changes, any updates to this Privacy Policy will be displayed on our website.
          </p>
        </section>
        <section>
          <h4>8. Contact Information</h4>
          <p>
            If you have any questions or concerns regarding this Privacy Policy, please contact us using the "Contact Us" option on our website.
          </p>
        </section>
        <section>
          <p>Thank you for choosing Connect Counsellor!</p>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
