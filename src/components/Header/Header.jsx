import fast from '../../assets/Images/fast.svg';
import styles from './Header.module.scss';

const Header = ({ progress }) => (
  <header className={`${styles.header} ${progress ? styles.progress : ''}`}>
    <img src={fast} alt="" />
    <h1>REFLEX GAME</h1>
    <p>Test your reflexes! Click correspondent letter on keyboard for a given number.</p>
  </header>
)

export default Header;