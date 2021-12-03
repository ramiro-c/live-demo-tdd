import { cleanup, render } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import { Simulate } from 'react-dom/test-utils';
import "@testing-library/jest-dom/extend-expect";

import axios from 'axios';
import MockAxios from "axios-mock-adapter";

import { DEFAULT_MESSAGE } from "../../i18n";
import { URL_GITHUB_REPO, URL_TDD_COURSE_REPO } from "../../utils/constants";

import Generator from '.';

const mock = new MockAxios(axios, { delayResponse: Math.random() * 500 });

afterAll(() => mock.restore());

afterEach(cleanup);

beforeEach(() => {
  var meta = document.createElement('meta');
  document.head.appendChild(meta);
});

describe("Generator tests", () => {
  test("renderiza correctamente <title>", async () => {
    const { container } = render(<Generator />);

    expect(container).toBeDefined();
    await waitFor(
      () => expect(
        document.querySelector("title")
      ).toHaveTextContent('Demo TDD - Los Simpsons'));
  });

  test("renderiza correctamente el h1", () => {
    const { container } = render(<Generator />);

    expect(container).toBeDefined();
    expect(container.querySelector("h1")).toHaveTextContent("QuoteGenerator");
  });

  test("Traer una frase de la api y mostrarla en pantalla", async () => {
    const frase = {
      quote: "Anda la osa",
      author: "Homero"
    };

    mock.onGet().replyOnce(200, [{
      ...frase
    }]);

    const { container, getByText, queryByText } = render(<Generator />);

    expect(container).toBeDefined();

    expect(queryByText(DEFAULT_MESSAGE)).toBeInTheDocument();
    Simulate.click(getByText("Cargar frase"));
    expect(queryByText(DEFAULT_MESSAGE)).not.toBeInTheDocument();
    expect(getByText("Cargando...")).toBeInTheDocument();

    await waitFor(() => expect(queryByText("Cargando...")).not.toBeInTheDocument());

    expect(getByText(frase.quote)).toBeInTheDocument();
    expect(getByText(`- ${frase.author}`)).toBeInTheDocument();
  });

  // data driven test
  test.each`
    texto                             | url 
    ${'este mini curso'}              | ${URL_TDD_COURSE_REPO}
    ${'GitHub repo'}                  | ${URL_GITHUB_REPO}
  `("Valida que el link '$texto' tenga como path: '$url'", ({ texto, url }) => {
    const { container, getByText } = render(<Generator />);

    expect(container).toBeDefined();

    const link = getByText(texto);

    expect(link).toHaveAttribute("href");
    expect(link.getAttribute("href")).toBe(url);
  });
});
