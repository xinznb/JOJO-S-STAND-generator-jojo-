<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created () {
    const setHtmlFontSize = () => {
      const htmlDom = document.getElementsByTagName('html')[0];
      let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
      if (htmlWidth <= 1000) {
        htmlWidth = 1000;
      }
      htmlDom.style.fontSize = `${htmlWidth * 100 / 1900}px`;
      // console.log(htmlDom.style.fontSize);
    };
    window.onresize = setHtmlFontSize;
    setHtmlFontSize();
  }
}
</script>


<style lang="scss">
body,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
blockquote,
dl,
dt,
dd,
ul,
ol,
li,
pre,
form,
button,
input,
textarea,
th,
td {
  margin: 0;
  padding: 0;
}

body,
button,
input,
select,
textarea {
  font: 12px/1.5tahoma, arial, /5b8b/4f53;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
}

address,
cite,
dfn,
em,
var {
  font-style: normal;
}

code,
kbd,
pre,
samp {
  font-family: couriernew, courier, monospace;
}

small {
  font-size: 12px;
}

ul,
ol {
  list-style: none;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

sup {
  vertical-align: text-top;
}

sub {
  vertical-align: text-bottom;
}


img {
  border: 0;
}

button,
input,
select,
textarea {
  font-size: 100%;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>
