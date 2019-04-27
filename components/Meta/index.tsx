import { css, Global } from '@emotion/core';
import React from 'react';

const Meta = () => (
  <Global
    styles={css`
      html,
      body {
        margin: 0;
        padding: 0;
        font-family: 'Galano Grotesque', 'Roboto', sans-serif;
        font-weight: normal;
      }
      input,
      textarea,
      button {
        font-family: 'Galano Grotesque', 'Roboto', sans-serif;
      }
      button {
        background-color: transparent;
        border: none;
        outline: none;
        padding: 0;
      }
      h1,
      h2,
      h3,
      h4,
      p,
      span {
        margin: 0;
      }
      iframe {
        border: none;
      }
      @font-face {
        font-family: 'Galano Grotesque Bold';
        font-weight: bold;
        src: url('/static/fonts/galano-grotesque-bold.otf') format('truetype');
      }
      @font-face {
        font-family: 'Galano Grotesque Medium';
        font-weight: 400;
        src: url('/static/fonts/galano-grotesque-medium.otf') format('truetype');
      }
      @font-face {
        font-family: 'Galano Grotesque Light';
        font-weight: lighter;
        src: url('/static/fonts/galano-grotesque-thin.otf') format('truetype');
      }
      @font-face {
        font-family: 'Galano Grotesque';
        font-weight: normal;
        src: url('/static/fonts/galano-grotesque.otf') format('truetype');
      }
    `}
  />
);

export default Meta;
