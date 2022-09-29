const FILTER_STYLE = 0.5

const checkDandok = (title) => {
  if (title.text.includes("[단독]")) {
    title.style = `font-weight: bold;`;
    title.text = "✅".concat(title.text);
  }
};

const checkArticle = (news, title, url) => {
  const titleHead = title.text.match(/\[[\S|\s]*\]/);
  if (titleHead) {
    for (let i = 0; i < del_titles.length; i++) {
      if (titleHead[0].includes(del_titles[i])) {
        news.style.opacity = FILTER_STYLE;
        return;
      };
    };
  }
  for (let j = 0; j < photo_urls.length; j++) {
    if (url.href.includes(photo_urls[j])) {
      news.style.opacity = FILTER_STYLE;
      return;
    }
  };
};

const checkPress = (news, press) => {
  let start = news.querySelector("a.api_txt_lines.dsc_txt_wrap").text[0];
  if (press === '뉴스핌') {
    if (start === '=') {
      news.style.opacity = FILTER_STYLE;
      return;
    };
  } else {
    return;
  };
};

const createKwTag = (news, press, title) => {
  let info = press.replace("언론사 선정", "");
  let pressKw = `${title.text}(${info}, )`;
  let copyKw = document.createElement("a");
  copyKw.innerText = "📋 기사제목(언론사) 복사"
  copyKw.style = styleDefault;
  news.querySelector("div.info_group").appendChild(copyKw);
  copyKw.addEventListener("click", () => {
    navigator.clipboard.writeText(pressKw)
  });
  copyKw.addEventListener("mouseenter", () => {
    copyKw.style = styleMouseEnter
  });
  copyKw.addEventListener("mouseleave", () => {
    copyKw.style = styleDefault;
  });
}

window.onload = () => {
  let news_arr = document.querySelectorAll("div.news_wrap.api_ani_send");
  news_arr.forEach((news) => {
    let press = news.querySelector("a.info.press").text
    let title = news.querySelector("a.news_tit");
    let url = news.querySelector("a.news_tit");
    checkDandok(title);
    checkArticle(news, title, url);
    checkPress(news, press);
    createKwTag(news, press, title);
  })
};

const photo_urls = [
  "news1.kr/photos/",
  "newsis.com/view/?id=NISI",
  "yna.co.kr/view/PYH",
];

const del_titles = [
  "날씨",
  "포토",
  "사진",
  "부고",
  "부음",
  "장례",
];

const styleDefault = `
  color: #808080;
  text-decoration: none;
  padding-left: 0.8rem;
`
const styleMouseEnter = `
  cursor: pointer;
  color: #808080;
  text-decoration: underline;
  padding-left: 0.8rem;
`
