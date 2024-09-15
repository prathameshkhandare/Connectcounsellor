import React, { useState } from 'react';


const CookiePolicy = () => {
    const [open, setOpen] = useState(null);

    return (
        <>


<div className="privacy-policy-outer-container">
          <h1 id="privacy-policy-outer-container-h1">Privacy policy</h1>
          <p id="privacy-policy-outer-container-p">Effective Date: 15-09-2024</p>
          
          <div className="privacy-policy-outer-flex-container">
            <p>Privacy is Precious</p>
            <i class="fa-solid fa-user-secret"></i>
          </div>
          <div className="privacy-policy-inner-container">
            <div className="privacy-policy-container">
              <div className="privacy-policy-flex-container">
                <p>WHAT INFORMATION DO WE COLLECT ABOUT YOU</p>
                {open != 1 ? (
                  <a onClick={() => setOpen(1)}>
                    <i class="fa-solid fa-plus"></i>
                  </a>
                ) : (
                  <a onClick={() => setOpen(0)}>
                    <i class="fa-solid fa-minus"></i>
                  </a>
                )}
              </div>
              {open === 1 ? (
                <p id="privacy-content">
                  During registration, we collect information such as your name,
                  email address, phone number, and any profile details you save
                  on our website
                </p>
              ) : null}
            </div>

            <div className="privacy-policy-container">
              <div className="privacy-policy-flex-container">
                <p>HOW WE USE YOUR PERSONAL INFORMATION</p>
                {open != 2 ? (
                  <a onClick={() => setOpen(2)}>
                    <i class="fa-solid fa-plus"></i>
                  </a>
                ) : (
                  <a onClick={() => setOpen(0)}>
                    <i class="fa-solid fa-minus"></i>
                  </a>
                )}
              </div>
              {open === 2 ? (
                <p id="privacy-content">
                  We use the collected information to make your experience more
                  convenient, allowing you to avoid filling in details
                  repeatedly on our website.
                </p>
              ) : null}
            </div>
            <div className="privacy-policy-container">
              <div className="privacy-policy-flex-container">
                <p>SHARING OF PERSONALINFORMATION WITH THIRD PARTIES</p>
                {open != 3 ? (
                  <a onClick={() => setOpen(3)}>
                    <i class="fa-solid fa-plus"></i>
                  </a>
                ) : (
                  <a onClick={() => setOpen(0)}>
                    <i class="fa-solid fa-minus"></i>
                  </a>
                )}
              </div>
              {open === 3 ? (
                <p id="privacy-content">
                  We do not share user data with any third parties. The
                  information is used solely for enhancing your experience on
                  our website.
                </p>
              ) : null}
            </div>

            <div className="privacy-policy-container">
              <div className="privacy-policy-flex-container">
                <p>SECURING OF YOUR PERSONAL INFORMATION</p>
                {open != 4 ? (
                  <a onClick={() => setOpen(4)}>
                    <i class="fa-solid fa-plus"></i>
                  </a>
                ) : (
                  <a onClick={() => setOpen(0)}>
                    <i class="fa-solid fa-minus"></i>
                  </a>
                )}
              </div>
              {open === 4 ? (
                <p id="privacy-content">
                  We prioritize your security by storing your data in a secure
                  database using hashing techniques. We respect your privacy and
                  take measures to protect your information.
                </p>
              ) : null}
            </div>

            <div className="privacy-policy-container">
              <div className="privacy-policy-flex-container">
                <p>USER RIGHTS</p>
                {open != 5 ? (
                  <a onClick={() => setOpen(5)}>
                    <i class="fa-solid fa-plus"></i>
                  </a>
                ) : (
                  <a onClick={() => setOpen(0)}>
                    <i class="fa-solid fa-minus"></i>
                  </a>
                )}
              </div>
              {open === 5 ? (
                <p id="privacy-content">
                  You have the right to logout at any time, change your
                  password, and contact us if you encounter any issues.
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="privacy-policy-outer-container">
          <h1 id="privacy-policy-outer-container-h1">Cookie policy</h1>
          <p id="privacy-policy-outer-container-p">Effective Date: 15-09-2024</p>
          <div className="privacy-policy-outer-flex-container">
            <p>Secure Cookies</p>
            <i class="fa-solid fa-cookie-bite"></i>
          </div>
          <div className="privacy-policy-inner-container">
            <div className="privacy-policy-container">
              <div className="privacy-policy-flex-container">
                <p>ESSENTIAL COOKIES</p>
                {open != 6 ? (
                  <a onClick={() => setOpen(6)}>
                    <i class="fa-solid fa-plus"></i>
                  </a>
                ) : (
                  <a onClick={() => setOpen(0)}>
                    <i class="fa-solid fa-minus"></i>
                  </a>
                )}
              </div>
              {open === 6 ? (
                <p id="privacy-content">
                  These cookies are necessary for the proper functioning of our
                  website. They allow you to navigate our site and use its
                  features, such as accessing secure areas.
                </p>
              ) : null}
            </div>

            <div className="privacy-policy-container">
              <div className="privacy-policy-flex-container">
                <p>PERFORMANCE COOKIES</p>
                {open != 7 ? (
                  <a onClick={() => setOpen(7)}>
                    <i class="fa-solid fa-plus"></i>
                  </a>
                ) : (
                  <a onClick={() => setOpen(0)}>
                    <i class="fa-solid fa-minus"></i>
                  </a>
                )}
              </div>
              {open === 7 ? (
                <p id="privacy-content">
                  We use these cookies to collect information about how you
                  interact with our website, helping us improve its performance
                  and your experience. For example, we may use Google Analytics
                  to analyze website traffic.
                </p>
              ) : null}
            </div>
            <div className="privacy-policy-container">
              <div className="privacy-policy-flex-container">
                <p>THIRD-PARTY COOKIES</p>
                {open != 8 ? (
                  <a onClick={() => setOpen(8)}>
                    <i class="fa-solid fa-plus"></i>
                  </a>
                ) : (
                  <a onClick={() => setOpen(0)}>
                    <i class="fa-solid fa-minus"></i>
                  </a>
                )}
              </div>
              {open === 8 ? (
                <p id="privacy-content">
                  • Our website may also contain cookies set by third-party
                  services, such as analytics providers and social media
                  platforms. These cookies are governed by the respective
                  privacy policies of those third parties.
                </p>
              ) : null}
            </div>

            <div className="privacy-policy-container">
              <div className="privacy-policy-flex-container">
                <p>PURPOSE OF COOKIES</p>
                {open != 9 ? (
                  <a onClick={() => setOpen(9)}>
                    <i class="fa-solid fa-plus"></i>
                  </a>
                ) : (
                  <a onClick={() => setOpen(0)}>
                    <i class="fa-solid fa-minus"></i>
                  </a>
                )}
              </div>
              {open === 9 ? (
                <p id="privacy-content">
                  • To improve
                  website functionality and user experience.<br/> • To analyze
                  website traffic and usage patterns. <br/> • To personalize content
                  and advertisements. <br/> • To remember user preferences.
                </p>
              ) : null}
            </div>

            <div className="privacy-policy-container">
              <div className="privacy-policy-flex-container">
                <p>CHANGES TO THIS COOKIE POLICY</p>
                {open != 10 ? (
                  <a onClick={() => setOpen(10)}>
                    <i class="fa-solid fa-plus"></i>
                  </a>
                ) : (
                  <a onClick={() => setOpen(0)}>
                    <i class="fa-solid fa-minus"></i>
                  </a>
                )}
              </div>
              {open === 10 ? (
                <p id="privacy-content">
                 We may update our Cookie Policy from time to time to reflect changes in our practices or for legal reasons. Any changes will be posted on this page with a new effective date.
                </p>
              ) : null}
            </div>
            <div className="privacy-policy-container">
              <div className="privacy-policy-flex-container">
                <p>CONTACT US</p>
                {open != 11 ? (
                  <a onClick={() => setOpen(11)}>
                    <i class="fa-solid fa-plus"></i>
                  </a>
                ) : (
                  <a onClick={() => setOpen(0)}>
                    <i class="fa-solid fa-minus"></i>
                  </a>
                )}
              </div>
              {open === 11 ? (
                <p id="privacy-content">
                 •	If you have any questions or concerns about our Cookie Policy, please contact us at: <br/>
                 • Email: connectcounsellor24x7@gmail.com <br/>
                 • Phone: +91-9923287168<br/>
                 • Address: Hingna Road, Akola, Maharashtra, India.<br/>
•	Thank you for visiting Connect Counsellor!

                </p>
              ) : null}
            </div>
          </div>
        </div>
           </>
)};

export default CookiePolicy;
