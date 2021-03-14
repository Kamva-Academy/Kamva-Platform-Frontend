import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import TelegramIcon from '@material-ui/icons/Telegram';

const Media = () => {
  return (
    <div className="social-medias">
      <div>
        <a
          rel='noreferrer'
          target="_blank"
          href="https://t.me/karsooghmehregan"
          className="social-link"
        >
          <TelegramIcon />
        </a>
        <a
          rel='noreferrer'
          target="_blank"
          href="https://www.instagram.com/karsooghmehregan/"
          className="social-link"
        >
          <InstagramIcon />
        </a>
        <a
          rel='noreferrer'
          target="_blank"
          href="https://www.aparat.com/karsooghmehregan.ir/%DA%A9%D8%A7%D8%B1%D8%B3%D9%88%D9%82_%D8%B1%DB%8C%D8%A7%D8%B6%DB%8C_%D9%85%D9%87%D8%B1%DA%AF%D8%A7%D9%86"
          className="social-link"
        >
          <img
            src={process.env.PUBLIC_URL + '/aparat_logo.png'}
            alt="aparat"
          />
        </a>
      </div>
    </div>
  )
}

export default Media;