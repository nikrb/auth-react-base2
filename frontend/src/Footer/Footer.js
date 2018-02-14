import React from 'react';
import { css, StyleSheet } from 'aphrodite';

const Footer = () => (
  <footer className={css(styles.footer)}>
    <section className={css(styles.section)}>
      Made with <span role="img" aria-label="heart">❤️ </span> by NAME
    </section>
  </footer>
);
export default Footer;

const styles = StyleSheet.create({
  footer: {
    color: 'white',
    padding: '1rem',
    backgroundColor: '#dae6f1',
    background: 'rgba(132,183,230,1.0)'
  },
  section: {
    width: '100%',
    textAlign: 'center'
  }
});
