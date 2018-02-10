import React from 'react';
import {StyleSheet, css} from 'aphrodite';

export default class HomePage extends React.Component {
    render = () => {
    return (
      <div className={css(styles.container)}>
        <article className={css(styles.article)}>
          <h2 className={css(styles.h2)}>Features</h2>
          <div className={css(styles.content)}>
            <section className={css(styles.section)}>
              <h3 className={css(styles.h3)}>Basic Features</h3>
              <p>Lorem Ipsum</p>
            </section>
            <section className={css(styles.section)}>
              <h3 className={css(styles.h3)}>Extra Features</h3>
              <p>Lorem Ipsum</p>
            </section>
            <section className={css(styles.section)}>
              <h3 className={css(styles.h3)}>More Features</h3>
              <p>Lorem Ipsum</p>
            </section>
            <section className={css(styles.section)}>
              <h3 className={css(styles.h3)}>Refer and earn</h3>
              <p>Lorem Ipsum</p>
            </section>
          </div>
        </article>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    display: 'flex',
    flex: 1,
    width: '100%'
  },
  article: {
    margin: '0 auto auto',
    maxWidth: '60rem',
    padding: '3em 2rem',
  },
  h2: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: '2rem',
    color: '#ff5a5f'
  },
  h3: {
    display: 'flex',
    alignItems: 'center',
    color: '#7d93aa',
    fontSize: '1.4em',
    fontWeight: '400',
    marginBottom: '.75rem',
    marginTop: '1rem'
  },
  section: {
    width: 'calc(50% - 1rem)',
    fontSize: '1.1rem'
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  }
});
