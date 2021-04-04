import React from 'react';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Footer.css';

// Import Images
import bg from '../../header-bk.png';

export function Footer() {
  return (
    <div style={{ background: `#FFF url(${bg}) center` }} className={styles.footer}>
      <p>&copy; 2019 &middot; TitanRisen </p>
      <p><FormattedMessage id="Github博客" /> : <a href="https://Titanrisen.github.io" target="_Blank">@Titanrisen</a></p>
    </div>
  );
}

export default Footer;
