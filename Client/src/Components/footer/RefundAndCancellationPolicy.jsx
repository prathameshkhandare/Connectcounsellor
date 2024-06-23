import React from 'react';
import './Styles.css';

const RefundAndCancellationPolicy = () => {
  return (
    <div>
      <header>
        <div className="header-container">
          <h3>Refund and Cancellation Policy</h3>
        </div>
      </header>
      <main>
        <section>
          <h4>Refund Policy</h4>
          <p>
            We offer a 3-day money-back guarantee. If you're not satisfied with our services, you can request a refund within 30 days of purchase. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum quia accusantium officia et veritatis doloremque iste voluptas rem architecto in quibusdam corporis suscipit illo voluptates voluptatem nihil sit, sed dicta.
          </p>
        </section>
        <section>
          <h4>Cancellation Policy</h4>
          <p>
          you can cancel your subscription before starting the course . Once it is started canclellation cannot be done.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat quae corporis voluptatum vel, accusantium, reiciendis molestiae necessitatibus aliquam unde eligendi ducimus maiores obcaecati dignissimos repudiandae minus illo quis assumenda debitis?
          </p>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RefundAndCancellationPolicy;