import React, { useState, Fragment } from 'react';
import axios from 'axios';
import Helmet from "react-helmet";

import Quote from "../Quote";

import { URL_TDD_COURSE_REPO, URL_GITHUB_REPO, API_URL } from '../../utils/constants';
import { DEFAULT_MESSAGE } from '../../i18n';

const Generator = () => {
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState(false);

  const loadQuote = async () => {
    setLoading(true);

    const { data } = await axios.get(API_URL);

    setLoading(false);
    setQuote({
      texto: data[0].quote,
      autor: data[0].author
    });
  }

  const h1Style = {
    lineHeight: "39px",
  }

  return (
    <Fragment>
      <Helmet>
        <title>Demo TDD - Los Simpsons</title>
      </Helmet>
      <div className="hero is-fullheight pb-6">
        <div className="hero-body">
          <div className="content has-text-centered mx-auto">
            <h1 className="mb-2" style={h1Style}>
              Bienvenido a <br /><strong>QuoteGenerator</strong>
            </h1>
            <p className="mb-5 is-size-6" >
              basado en <a href={URL_TDD_COURSE_REPO} className="is-underlined">este mini curso</a>
            </p>

            {!quote && !loading && <p>{DEFAULT_MESSAGE}</p>}
            {loading && <p>Cargando...</p>}
            {quote && !loading && <Quote quote={quote} />}

            <button
              onClick={() => loadQuote()}
              type="button"
              className="button is-primary mt-3 mb-1">
              Cargar frase
            </button>
            <br />
            <a href={URL_GITHUB_REPO} className="is-underlined is-size-7">
              GitHub repo
            </a>
          </div>
        </div>
      </div>
    </Fragment >
  )
}

export default Generator;