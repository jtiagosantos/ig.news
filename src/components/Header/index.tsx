import { ActiveLink } from '../ActiveLink';
import { SignInButton } from '../SignInButton';
import { HOME_URL } from '../../config/constants';

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
          <ActiveLink activeClassName={styles.active} href="http://localhost:3000/posts" prefetch>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}