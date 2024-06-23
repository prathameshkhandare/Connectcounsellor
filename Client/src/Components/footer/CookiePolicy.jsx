import React from 'react';
import './Styles.css';

const CookiePolicy = () => {
    return (
        <div>
            <header>
                <div className="header-container">
                <h3>Cookie Policy</h3>
                </div>
            </header>
            <main>
                <section>
                    <h4>What Are Cookies?</h4>
                    <p>Cookies are small text files stored on your device when you visit a website. They are used to remember your preferences and enhance your browsing experience.</p>
                </section>
                <section>
                    <h4>How We Use Cookies</h4>
                    <p>We use cookies to understand how you use our website, personalize your experience, and provide relevant content and advertisements.</p>
                </section>
                <section>
                    <h4>Your Choices</h4>
                    <p>You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer.</p>
                </section>
                <section>
                    <h4>Changes to This Policy</h4>
                    <p>We may update this Cookie Policy from time to time. We encourage you to review this policy periodically to stay informed about how we are using cookies.</p>
                </section>
            </main>
            <footer>
                <p>&copy; 2024 Your Company. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default CookiePolicy;