import { ActiveLink } from '../ActiveLink';
import { POST_URL, HOME_URL } from '../../config/constants';

import { SignInButton } from '../SignInButton';

import styles from './styles.module.scss';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <ActiveLink activeClassName={styles.active} href={HOME_URL}>
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href={POST_URL} prefetch>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}