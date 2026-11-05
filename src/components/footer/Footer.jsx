export function Footer() {
  return (
    <footer>
      <p><small>Designed and developed by Matthew Harview.</small></p>
      <nav>
        <h2>Personal Links</h2>
        <ul>
          <li>
            <a href="https://github.com/Long-Hold">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/github/github-original.svg"
                alt=""
                width={40}
                height={40}
              />
              GitHub Profile
            </a>
          </li>
          <li>
            <a href="https://github.com/Long-Hold/shopping-cart">
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