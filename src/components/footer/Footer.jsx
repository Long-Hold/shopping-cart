import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p><small>Designed and developed by Matthew Harview.</small></p>
      <nav aria-label="Footer">
        <h2 className="visuallyHidden">Personal Links</h2>
        <ul className={styles.navList}>
          <li>
            <a className={styles.anchor} href="https://github.com/Long-Hold">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/github/github-original.svg"
                alt=""
                width={40}
                height={40}
                style={{
                  filter: "invert(100%)"
                }}
              />
              GitHub Profile
            </a>
          </li>
          <li>
            <a className={styles.anchor} href="https://github.com/Long-Hold/shopping-cart">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/git/git-original.svg"
                alt=""
                width={40}
                height={40}
              />
              Source Code
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  )
}