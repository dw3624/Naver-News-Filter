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
  "name": "네이버 포토뉴스 필터",
  "short_name": "naver photo news filter",
  "version": "1.0.2",
  "manifest_version": 3,
  "icons": {
    "16": "asset/icon16.png",
    "48": "asset/icon48.png",
    "128": "asset/icon128.png"
  },
  "description": "네이버 뉴스 검색에서 포토뉴스를 숨기고 단독뉴스를 강조합니다.",
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
```

### checkPress
- 기능: 기타 특정 언론사 포토뉴스를 필터링합니다.
- 설명: 언론사별 규칙에 맞춰 코드를 작성합니다.
```javascript
const checkPress = (news, press) => {
  let start = news.querySelector("a.api_txt_lines.dsc_txt_wrap").text[0];
  if (press === '뉴스핌') {
    if (start === '=') {
      news.style.opacity = 0.5;
      return;
    };
  } else {
    return;
  };
};
```

### createKwTag
a 태그를 만들어 DOM에 추가한 뒤 해당 태그 클릭시 양식에 맞게 변형한 기사 제목이 복사되도록 이벤트를 설정합니다. 추가적으로 style을 지정합니다.
```javascript
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
```




# 버전 설명
### v1.0.0
- 크롬 익스텐션 최초 업로드

### v1.0.1
- 날씨, 포토, 사진, 부음, 부고, 장례 키워드 포함 뉴스 필터링
- 뉴스1, 뉴시스, 연합뉴스 포토뉴스 필터링
- `[]` 내 문자 추출 후 패턴 매칭하는 방식으로 변경
- 기사제목 복사 링크 색, 아이콘 변경
- 마이너 버그 수정
  - 마우스 호버 시 글씨강조가 마우스 이동 시 해제되도록 수정

### v1.0.2
- 확장기능 명칭 변경
  - Naver News Filter → 네이버 포토뉴스 필터
- 뉴스핌 포토뉴스 필터 기능 추가
- 일부 코드 리팩토링
