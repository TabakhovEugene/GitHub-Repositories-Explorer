import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <img src="/github.png" alt="Logo" className={styles.logoImage}/>
            <div className={styles.logo}>GitHub Repositories</div>
        </nav>
    );
};

export default Navbar;