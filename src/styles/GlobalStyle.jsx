import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

body,
div,
ul,
li,
dl,
h1,
h2,
h3,
h4,
p,
img{
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

/* link reset */
a {
  color: #1d1e21;
  text-decoration: none;
}

a:hover {
  color: #1d1e21;
}
/* font reset */
body {
  font: normal 400 12px/1.5 'Lato';
}

h1 {
  text-align: center;
  font: normal 900 48px/2 'Lato';
  color: #1d1e21;
}

h2 {
  text-align: center;
  font: normal 900 32px/2 'Lato';
  color: #1d1e21;
}

h3 {
  text-align: center;
  font: normal 900 20px/1.2 'Lato';
  color: #1d1e21;
}

h4 {
  font: normal 900 14px/1.2 'Lato';
  color: #1d1e21;
}

p {
  font: normal 400 14px/22px 'Lato';
  color: #1d1e21;
}

small{  
  display:block;
  text-align: center;
  font: normal 500 20px/1.2 'Lato';
  color:#666;}




/* font style reset */
address {
  font-style: normal;
}

/* Bullet symbol set*/
dl,
ul,
li,
ol,
menu {
  list-style: none;
}

/* BORDER RESET  */
img,
fieldset {
  border: 0 none;
}


/* header  */
header{
border-bottom: 1px solid lightgray;
margin-bottom: 50px;
}
`;

export default GlobalStyle;
