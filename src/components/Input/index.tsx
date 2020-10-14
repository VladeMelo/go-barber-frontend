import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>; // quando vc quer receber um componente como uma propriedade
  containerStyle?: object;
}

const Input: React.FC<InputProps> = ({
  icon: Icon,
  name,
  containerStyle = {},
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null); // tem acesso direto ao input, ja que se trata de uma referência do input, é so usar .current
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName, // nome do campo(fieldName === name)
      ref: inputRef.current, // referência para acessar o elemento de uma forma direta, sem ter que armazena-lo num estado. Dentro do current estará nosso input. Acho q é o msm q document.querySector('input')
      path: 'value', // onde estará o valor do input. Acho q é o msm q document.querySector('input').value
    });
  }, [fieldName, registerField]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []); // Quando for usar uma função dentro de outra coloque useCallback, para que a função não seja carregada novamente, garantindo que sua criação vai acontecer uma única vez

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFocused={isFocused}
      isFilled={isFilled}
    >
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
