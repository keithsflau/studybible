/* Remap Tailwind CDN palette to 信仰討論 tokens. Must load before cdn.tailwindcss.com */
(function () {
  var paper = {
    50: "#fbf7ef",
    100: "#f6f1e6",
    200: "#efe6d2",
    300: "#e4cf96",
    400: "#c4a35a",
    500: "#8a6d28",
    600: "#8a6d28",
    700: "#1b2436",
    800: "#0c1222",
    900: "#0c1222",
    950: "#0c1222"
  };
  var slate = {
    50: "#fbf7ef",
    100: "#f6f1e6",
    200: "#e8e2d4",
    300: "#d7cba8",
    400: "#9aa3b2",
    500: "#5c6574",
    600: "#5c6574",
    700: "#1b2436",
    800: "#1b2436",
    900: "#0c1222",
    950: "#0c1222"
  };
  window.tailwind = window.tailwind || {};
  window.tailwind.config = {
    theme: {
      extend: {
        colors: {
          slate: slate,
          stone: slate,
          zinc: slate,
          neutral: slate,
          gray: slate,
          indigo: paper,
          violet: paper,
          purple: paper,
          fuchsia: paper,
          blue: paper,
          sky: paper,
          cyan: paper,
          teal: paper,
          amber: paper,
          orange: paper,
          yellow: paper,
          lime: paper
        },
        fontFamily: {
          sans: ['"Source Sans 3"', '"PingFang HK"', '"Microsoft JhengHei"', "sans-serif"],
          serif: ['"Noto Serif TC"', '"Source Han Serif TC"', "serif"]
        }
      }
    }
  };
})();
