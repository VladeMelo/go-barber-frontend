import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// equals to type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {loading?: boolean};
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
);

export default Button;
