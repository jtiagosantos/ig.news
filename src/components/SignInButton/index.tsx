import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss';

export function SignInButton() {
  const isLoggedIn = true;

  return isLoggedIn ? (
    <button type="button" className={styles.signInButton}>
      <FaGithub color="#04D361" />
      Tiago Santos
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button type="button" className={styles.signInButton}>
      <FaGithub color="#eba417" />
      Sing in with GitHub
    </button>
  )
}