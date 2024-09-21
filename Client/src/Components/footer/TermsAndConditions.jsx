import './Styles.css';
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const TermsAndConditions = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div id="terms-conditions-container">
      <h3 className="terms-conditions-heading">Terms and Conditions</h3>

      {/* Accordion Section 1 */}
      <div className={`terms-conditions-item ${activeIndex === 0 ? 'active' : ''}`}>
        <div className="terms-conditions-header" onClick={() => toggleAccordion(0)}>
          <h5>Introduction</h5>
          <FontAwesomeIcon icon={activeIndex === 0 ? faMinus : faPlus} />
        </div>
        {activeIndex === 0 && (
          <div className="terms-conditions-content">
            <p>
              For the purpose of these Terms and Conditions, the term "we", "us", "our" used anywhere on this page shall mean NIKHIL RAMESH SURJUSE, whose registered/operational office is Bajoria Layout, Hingana Road, Akola, Maharashtra 444004. "You", “your”, "user", “visitor” shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.
            </p>
          </div>
        )}
      </div>

      {/* Accordion Section 2 */}
      <div className={`terms-conditions-item ${activeIndex === 1 ? 'active' : ''}`}>
        <div className="terms-conditions-header" onClick={() => toggleAccordion(1)}>
          <h5>Content Changes</h5>
          <FontAwesomeIcon icon={activeIndex === 1 ? faMinus : faPlus} />
        </div>
        {activeIndex === 1 && (
          <div className="terms-conditions-content">
            <p>
              The content of the pages of this website is subject to change without notice.
            </p>
          </div>
        )}
      </div>

      {/* Accordion Section 3 */}
      <div className={`terms-conditions-item ${activeIndex === 2 ? 'active' : ''}`}>
        <div className="terms-conditions-header" onClick={() => toggleAccordion(2)}>
          <h5>Liability and Accuracy</h5>
          <FontAwesomeIcon icon={activeIndex === 2 ? faMinus : faPlus} />
        </div>
        {activeIndex === 2 && (
          <div className="terms-conditions-content">
            <p>
              Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
            </p>
          </div>
        )}
      </div>

      {/* Accordion Section 4 */}
      <div className={`terms-conditions-item ${activeIndex === 3 ? 'active' : ''}`}>
        <div className="terms-conditions-header" onClick={() => toggleAccordion(3)}>
          <h5>Use of Information and Materials</h5>
          <FontAwesomeIcon icon={activeIndex === 3 ? faMinus : faPlus} />
        </div>
        {activeIndex === 3 && (
          <div className="terms-conditions-content">
            <p>
              Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services, or information available through our website and/or product pages meet your specific requirements.
            </p>
          </div>
        )}
      </div>

      {/* Accordion Section 5 */}
      <div className={`terms-conditions-item ${activeIndex === 4 ? 'active' : ''}`}>
        <div className="terms-conditions-header" onClick={() => toggleAccordion(4)}>
          <h5>Ownership and Reproduction</h5>
          <FontAwesomeIcon icon={activeIndex === 4 ? faMinus : faPlus} />
        </div>
        {activeIndex === 4 && (
          <div className="terms-conditions-content">
            <p>
              Our website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
            </p>
          </div>
        )}
      </div>

      {/* Accordion Section 6 */}
      <div className={`terms-conditions-item ${activeIndex === 5 ? 'active' : ''}`}>
        <div className="terms-conditions-header" onClick={() => toggleAccordion(5)}>
          <h5>Links and Disputes</h5>
          <FontAwesomeIcon icon={activeIndex === 5 ? faMinus : faPlus} />
        </div>
        {activeIndex === 5 && (
          <div className="terms-conditions-content">
            <p>
              From time to time, our website may also include links to other websites. These links are provided for your convenience to provide further information. You may not create a link to our website from another website or document without NIKHIL RAMESH SURJUSE’s prior written consent. Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India. We shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any transaction, on account of the cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.
            </p>
          </div>
        )}
      </div>

      {/* Refund and Cancellation Policy Section */}
      <h3 className="terms-conditions-heading">Refund and Cancellation Policy</h3>

      <div className={`terms-conditions-item ${activeIndex === 6 ? 'active' : ''}`}>
        <div className="terms-conditions-header" onClick={() => toggleAccordion(6)}>
          <h5>Refund  Policy</h5>
          <FontAwesomeIcon icon={activeIndex === 6 ? faMinus : faPlus} />
        </div>
        {activeIndex === 6 && (
          <div className="terms-conditions-content">
            <p>No refunds will be provided after the purchase.</p>
        
          </div>
        )}
      </div>
      <div className={`terms-conditions-item ${activeIndex === 7? 'active' : ''}`}>
        <div className="terms-conditions-header" onClick={() => toggleAccordion(7)}>
          <h5>Cancellation Policy</h5>
          <FontAwesomeIcon icon={activeIndex === 7 ? faMinus : faPlus} />
        </div>
        {activeIndex === 7 && (
          <div className="terms-conditions-content">
           
            <p>Cancellations are not allowed after the purchase is complete.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TermsAndConditions;
