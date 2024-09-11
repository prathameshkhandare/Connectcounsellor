import React from "react";
import "../Components/StyleSheets/LandingPageBlogs.css"

const LandinPageBlog =()=>{
    return(
    <>
    <div className="blogs-landingpage-outer-container">
          <h1>Read Our Blogs</h1>
          <p id='blog-findblog-discription'>You can find latest blogs posted by connect counsellor team here: </p>
          <div className="blogs-landingpage-inner-container">
            <div className="blogs-landingpage-blogcard-container">
              <img
                src="https://t3.ftcdn.net/jpg/05/71/06/04/360_F_571060419_Owx0HieYkYocICzV4W7IxmXpdmP1xo7F.jpg"
                alt=""
              />
              <div style={{ padding: '10px' }}>
                <p id="blog-category">Parenting</p>
                <p id="blog-topic">Topic of the blogs</p>
                <p id="blog-content">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Commodi deserunt tenetur corrupti quia ex soluta ipsa minima
                  aliquam, modi eius! <span id="blog-read-more">Read more</span>
                </p>
                <div className="blogs-landingpage-flex-date-container">
                  <p id="blog-author">
                    <i class="fa-solid fa-user-doctor"></i> Dr. Aman Rathod
                  </p>
                  <p id="blog-date">11-09-2024</p>
                </div>
              </div>
            </div>
            <div className="blogs-landingpage-blogcard-container">
              <img
                src="https://t3.ftcdn.net/jpg/05/71/06/04/360_F_571060419_Owx0HieYkYocICzV4W7IxmXpdmP1xo7F.jpg"
                alt=""
              />
              <div style={{ padding: '10px' }}>
                <p id="blog-category">Parenting</p>
                <p id="blog-topic">Topic of the blogs</p>
                <p id="blog-content">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Commodi deserunt tenetur corrupti quia ex soluta ipsa minima
                  aliquam, modi eius! <span id="blog-read-more">Read more</span>
                </p>
                <div className="blogs-landingpage-flex-date-container">
                  <p id="blog-author">
                    <i class="fa-solid fa-user-doctor"></i> Dr. Aman Rathod
                  </p>
                  <p id="blog-date">11-09-2024</p>
                </div>
              </div>
            </div>
            <div className="blogs-landingpage-blogcard-container">
              <img
                src="https://t3.ftcdn.net/jpg/05/71/06/04/360_F_571060419_Owx0HieYkYocICzV4W7IxmXpdmP1xo7F.jpg"
                alt=""
              />
              <div style={{ padding: '10px' }}>
                <p id="blog-category">Parenting</p>
                <p id="blog-topic">Topic of the blogs</p>
                <p id="blog-content">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Commodi deserunt tenetur corrupti quia ex soluta ipsa minima
                  aliquam, modi eius! <span id="blog-read-more">Read more</span>
                </p>
                <div className="blogs-landingpage-flex-date-container">
                  <p id="blog-author">
                    <i class="fa-solid fa-user-doctor"></i> Dr. Aman Rathod
                  </p>
                  <p id="blog-date">11-09-2024</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
    
    
    
    </>
    );

}
export default LandinPageBlog;