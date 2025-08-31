import React from 'react';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    // Adicionando o id="footer" para que o link de navegação funcione
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Pastelaria Abibe</h4>
          <p>O Sabor da Tradição desde 1960.</p>
        </div>
        <div className="footer-section">
          <h4>Contato</h4>
          <p>Email: contato@abibe.com.br</p>
          <p>Telefone: (11) 98765-4321</p>
          <p>Endereço: Rua da Tradição, 123 - Centro</p>
        </div>
        <div className="footer-section">
          <h4>Siga-nos</h4>
          <div className="footer-social-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={24} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={24} />
            </a>
            <a href="https://wa.me/5511987654321" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <MessageCircle size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Pastelaria Abibe. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;