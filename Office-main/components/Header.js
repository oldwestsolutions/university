'use client';

import { Container } from 'react-bootstrap';
import Image from 'next/image';

export default function Header() {
  return (
    <div className="top-header">
      <Container>
        <div className="header-content">
          <div className="logo-container">
            <Image 
              src="/images/saintdanielslogo.jpeg" 
              alt="Saint Daniels Logo" 
              width={50} 
              height={50} 
              className="header-logo"
            />
            <span className="brand-text">SAINT DANIELS</span>
          </div>
        </div>
      </Container>
    </div>
  );
} 