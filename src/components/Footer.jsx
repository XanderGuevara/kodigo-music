export default function Footer() {
  return (
    <footer className="site-footer">
      <address className="container">
        Desarrollado por <strong>David Alexander Guevara</strong> ·{' '}
        <a
          href="https://github.com/XanderGuevara"
          target="_blank"
          rel="noreferrer"
        >
          @XanderGuevara
        </a>{' '}
        © {new Date().getFullYear()}
      </address>
    </footer>
  );
}
