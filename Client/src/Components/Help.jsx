import React from 'react';
import './Stylesheets/Help.css'; // Assuming you have a HelpPage.css for styling




const Help = () => {
  return (
    <div className="help-container">
      <h1 className="help-main-title">Help Center</h1>
      <p className="help-paragraph">Welcome to our help center! Here, you'll find answers to frequently asked questions, tutorials, and guides to help you get the most out of our product.</p>
      <section className="help-faq-section">
        <h2 className="help-title">Frequently Asked Questions</h2>
        <ul className="help-list">
          <li className="help-list-item">
            <h3 className="help-title">What is this product?</h3>
            <p className="help-paragraph">This product is a revolutionary tool that helps you manage your tasks and projects with ease.</p>
          </li>
          <li className="help-list-item">
            <h3 className="help-title">How do I get started?</h3>
            <p className="help-paragraph">Getting started is easy! Simply sign up for an account, and follow the onboarding process.</p>
          </li>
          <li className="help-list-item">
            <h3 className="help-title">What if I need help?</h3>
            <p className="help-paragraph">Don't worry! Our support team is here to help. You can contact us through our website or email us at <a className="help-link" href="mailto:support@example.com">support@example.com</a>.</p>
          </li>
        </ul>
      </section>
      <section className="help-resource-section">
        <h2 className="help-title">Resources</h2>
        <ul className="help-list">
          <li className="help-list-item">
            <a className="help-link" href="#" target="_blank" rel="noopener noreferrer">User Guide</a>
          </li>
          <li className="help-list-item">
            <a className="help-link" href="#" target="_blank" rel="noopener noreferrer">Video Tutorials</a>
          </li>
          <li className="help-list-item">
            <a className="help-link" href="#" target="_blank" rel="noopener noreferrer">Blog</a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Help;