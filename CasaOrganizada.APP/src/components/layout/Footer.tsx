import {  FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer style={{ marginTop: '50px', textAlign: 'center', padding: '20px 0' }}>      
      <p style={{ margin: 0, paddingTop: '16px', borderTop: '1px solid #333' }}>© 2026 Projeto Casa Organizada. Todos os direitos reservados.</p>
      
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '20px' }}>
        <a href="https://br.linkedin.com/in/wagner-annunciado" target="_blank" rel="noopener noreferrer" style={{ color: '#999', textDecoration: 'none' }} title="LinkedIn">
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
}
