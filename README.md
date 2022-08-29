# Naver News Filter
본 확장 프로그램은 네이버 뉴스 검색시 특정 뉴스를 필터링하는 기능을 가집니다. 필터링 대상은 아래와 같습니다.
- 일부 포토뉴스 투명도 증가
- 일부 날씨뉴스 투명도 증가
- 일부 부고뉴스 투명도 증가
- 일부 단독뉴스 강조
- 기사제목(언론사) 복사 기능 추가
  - 예: `오후 9시까지 4만 1930명 신규 확진(노컷뉴스, )`


# 구성 파일
## manifest.json
```json
{
  "name": "Naver News Filter",
  "short_name": "nnf",
  "version": "1.0.0",
  "manifest_version": 3,
  "icons": {
    "16": "asset/icon16.png",
    "48": "asset/icon48.png",
    "128": "asset/icon128.png"
  },
  "description": "naver 뉴스 검색에서 포토뉴스를 숨기고 단독뉴스를 강조합니다.",
  "content_scripts": [{
    "matches": ["https://search.naver.com/search.naver?*where=news*"],
    "js": [
      "content.js"
    ]
  }]
}
```

## content.js
Extension 주요 동작 코드입니다.

### checkDandok
기사 제목에 `[단독]`이 포함된 경우 해당 제목을 굵게 표시하고 이모지를 추가합니다.
```javascript
const checkDandok = (title) => {
  if (title.text.includes("[단독]")) {
    title.style = `font-weight: bold;`;
    title.text = "✅".concat(title.text);
  }
};
```

### checkArticle
기사 제목에서 `[`와 `]` 사이 문자열을 추출, 사전에 지정한 키워드가 포함된 경우 해당 기사 투명하게 변경합니다.
```javascript
const checkArticle = (news, title, url) => {
  const titleHead = title.text.match(/\[[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|-]*\]/);
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
```

### createKwTag
a 태그를 만들어 DOM에 추가한 뒤 해당 태그 클릭시 양식에 맞게 변형한 기사 제목이 복사되도록 이벤트를 설정합니다. 추가적으로 style을 지정합니다.
```javascript
const createKwTag = (news, info, title) => {
  let pressKw = `${title.text}(${info}, )`;
  let copyKw = document.createElement("a");
  copyKw.innerText = "→기사제목(언론사) 복사하기"
  copyKw.style.color = "#0c43b7";
  
  news.querySelector("div.info_group").appendChild(copyKw);
  copyKw.addEventListener("click", () => {
    navigator.clipboard.writeText(pressKw)
  });
  copyKw.addEventListener("mouseenter", () => {
    copyKw.style = `
      cursor: pointer;
      color: #0c43b7;
      text-decoration: underline;
    `    
  });
  copyKw.addEventListener("mouseleave", () => {
    copyKw.style.color = "#0c43b7";
    copyKw.style.textDecoration = "none";
  });
}
```
