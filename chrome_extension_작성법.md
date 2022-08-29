# Chrome Extension
Chrome Extension(크롬 확장기능)은 크롬 사용을 좀 더 수월하고 편하게 해주는 기능입니다. 직접 작성해 사용하거나 스토어에 공개할 수도 있습니다.

## 작성법
대표적인 구조는 아래와 같습니다.
- JavaScript 파일 : 실행되는 코드
- HTML 파일 : 설정화면 등 구성
- CSS 파일 : style 지정
- Image 파일 : 아이콘 등
- manifest 파일 : 설정파일

다만, 위 파일 중 `JavaScript 파일`과 `manifest 파일`만 있어도 기능 구현은 가능합니다.

## manifest.json
Chrome Extension의 설정 전반에 대한 내용이 담기는 파일입니다. 자세한 사용법은 따로 정리했습니다.

## Chrome 적용법
확장 프로그램 페이지 좌측상단의 `압축해제된 확장 프로그램을 로드합니다.`로 브라우저에 적용할 수 있습니다.


# 예시
특정 화면 진입시 알림 표시하는 Extension 예시입니다.

### content.js
```javascript
window.alert("hello!");
```

### manifest.json
```json
{
  "name": "Sample",
  "version": "1.0.0",
  "manifest_version": 3,
  "description": "Sample Chrome Extension",
  "content_scripts": [{
    "matches": ["https://naver.com/{AppID}/*"],
    "js": [
      "content.js"
    ]
  }]
}
```

### 파일구조
```
.
└── src
     ├── content.js
     └── manifest.json
```
