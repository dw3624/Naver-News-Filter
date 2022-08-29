# manifest.json
Chrome Extension의 설정 전반에 대한 내용이 담기는 파일입니다.

## 필수항목
필수적으로 작성해야하는 항목
### manifest_version
- manifest 파일의 버전
- 2022.08.28 기준 유효한 버전은 3
```json
"manifest_version": 3
```

### name
- Extension 이름
- 45글자 이내로 작성
```json
"name": "Extension name"
```

- Extension 약칭
- 선택적으로 작성
- 12글자 이내 작성 권장
```json
"short_name": "Ext name"
```

### version
- Extension 버전
- 1 ~ 4개 수치를 `.`으로 구분해 작성 가능
- 0 외의 숫자 앞에 0 사용 불가 (`032` 등 불가)
- Extension 자동갱신기능으로 버전 상하관계가 확인되므로 주의
- Extension 갱신시 버전 반드시 올라 있어야
```json
"version": "1.0.12.3456"
```

## 권장항목
작성이 필수는 아니지만 권장되는 항목

### default_locale
- Extension 기본언어
- 해당 Extesion이 |18N에 대응하는 경우 필수 작성, 아닌 경우 작성하지 말아야
```json
"default_locale": "ko_KR"
```

### description
- Extension 설명
- 132글자 이내 작성
```json
"description": "a extention for Google Chrome"
```

### icons
- Extension 아이콘
- 128x128, 48x48, 16x16 각각 웹스토어, 관리페이지, favicon 등에 사용됨
- `.png` 권장
```json
"icons": {
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png"
}
```

## 양자택일(혹은 미사용)
브라우저액션과 페이지액션 사용시 둘 중 하나만 선택 사용 가능합니다. 혹은 둘 다 사용하지 않을 수도 있습니다.

### browser_action
```json
"page_action": {
    "default_icon": {
        "19": "icon19.png"
    },
    "default_title": "Ext title",
    "default_popup": "popup.html"
},
```
- `default_icon`
  - 주소창 오른쪽에 표시할 아이콘
  - 19px 권장
- `default_title`
  - browser_action에 대한 임의 항목
  - 주소창 오른쪽 아이콘에서 표시되는 툴팁에 표시되는 문자열
  - 생략시 `name`이 사용됨
- `default_popup`
  - browser_action에 대한 임의 항목
  - 주소창 오른쪽 아이콘 클릭시 표시되는 팝업창 내 html 지정

### page_action
```json
"page_action": {
    "default_icon": {
        "19": "icon19.png"
    },
    "default_title": "Ext title",
    "default_popup": "popup.html"
},
```

## 옵션 항목
필요시 작성

### content_scripts
```json
"content_scripts": [
    {
        "matches": [ "http://*/*", "https://*/*" ],
        "js": [ "script.js" ]
    }
],
```
- `matches`
  - content_scripts에 대한 필수 항목
  - 동작대상 URL을 Match Patterns 형식을 설정
- `js`
  - content_script에 대한 임의 항목
  - 동작시킬 스크립트 설정


### background
백그라운드페이지 및 이벤트페이지 사용시 작성합니다.
> 백그라운드페이지는 사용은 권장되지 않으므로 가급적 이벤트페이지를 사용하도록 합니다.
```json
"background": {
    "scripts": [ "background.js" ],
    // recommended
    "persistent": false
},
```
- `scripts`
  - 백그라운드에서 동작하는 JavaScript 파일 설정
  - 여러개 지정 가능
- `persistent`
  - `"persistent": false` 포합되는 경우 이벤트페이지, 이외의 경우 백그라운드페이지
  - 백그라운드페이지는 항상 작동
  - 이벤트페이지는 필요시 로드

### permissions
chrome.* API 사용시 등 사용 대상을 지정해야 합니다.
```json
"permissions": [
  "tabs",
  "bookmarks"
],
```

### options_page
옵션페이지를 사용할 경우 설정합니다.
```json
"options_page": "options.html",
```

### minimum_chrome_version
Extention이 요구하는 최소한의 Chrome 버전을 지정합니다.

### homepage_url
Extension 홈페이지 URL을 설정합니다. 웹스토어나 Extension 관리페이지, 브라우저액션 사용하고 있는 경우 아이콘 우클릭시 나오는 메뉴 최상단 제목 클릭했을때 넘길 주소 등을 설정하기도 합니다.
