import React, { Component } from 'react';
import TelegramIcon from '@material-ui/icons/Telegram';
import InstagramIcon from '@material-ui/icons/Instagram';
// import { Icon } from 'semantic-ui-react';
import '../assets/styles/footer.css';

const Footer = () => {
  return (
    <div class="footer" >
      <div>
        <div class="social-medias">
          <div>
            <a
              target="_blank"
              href="https://t.me/rastaiha"
              class="social-link"
            >
              <TelegramIcon />
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/rastaiha/"
              class="social-link"
            >
              <InstagramIcon />
            </a>
            <a
              target="_blank"
              href="https://www.aparat.com/Rastaiha/%D8%AC%D9%85%D8%B9_%D8%B9%D9%84%D9%85%DB%8C-%D8%AA%D8%B1%D9%88%DB%8C%D8%AC%DB%8C_%26laquo%3B%D8%B1%D8%B3%D8%AA%D8%A7%26raquo"
              class="social-link"
            >
              <img
                src={process.env.PUBLIC_URL + '/aparat_logo.png'}
                alt="aparat"
              />
            </a>
          </div>
        </div>
      </div>
    </div >
  );
}


export default Footer;