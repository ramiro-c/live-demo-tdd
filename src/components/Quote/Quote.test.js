import { cleanup, render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import Quote from '.';

afterEach(cleanup);

test("El componente recibe una prop y renderiza el contenido", () => {
  const frase = {
    texto: "Anda la osa",
    autor: "Homero"
  };

  const { container } = render(<Quote quote={frase} />);

  expect(container).toBeDefined();
  expect(container).toHaveTextContent(frase.texto);
  expect(container).toHaveTextContent(`- ${frase.autor}`);
});