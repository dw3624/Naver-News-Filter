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
        news.style.opacity = 0.5;
        return;
      };
    };
  }
  for (let j = 0; j < photo_urls.length; j++) {
    if (url.href.includes(photo_urls[j])) {
      news.style.opacity = 0.5;
      return;
    }
  };
};

const createKwTag = (news, info, title) => {
  let pressKw = `${title.text}(${info}, )`;
  let copyKw = document.createElement("a");
  copyKw.innerText = "📋 기사제목(언론사) 복사"
  copyKw.style = `
    color: #808080;
    text-decoration: none;
    padding-left: 0.8rem;
  `;
  news.querySelector("div.info_group").appendChild(copyKw);
  copyKw.addEventListener("click", () => {
    navigator.clipboard.writeText(pressKw)
  });
  copyKw.addEventListener("mouseenter", () => {
    copyKw.style = `
      cursor: pointer;
      color: #808080;
      text-decoration: underline;
      padding-left: 0.8rem;
    `
  });
  copyKw.addEventListener("mouseleave", () => {
    copyKw.style = `
      color: #808080;
      text-decoration: none;
      padding-left: 0.8rem;
    `
  });
}

window.onload = () => {
  let news_arr = document.querySelectorAll("div.news_wrap.api_ani_send");
  news_arr.forEach((news) => {
    let info = news.querySelector("a.info.press").text.replace("언론사 선정", "");
    let title = news.querySelector("a.news_tit");
    let url = news.querySelector("a.news_tit");
    checkDandok(title);
    checkArticle(news, title, url);
    createKwTag(news, info, title);
  })
};
