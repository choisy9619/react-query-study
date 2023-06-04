# next-typescript-boilerplate
- 마지막 업데이트: 2021년 3월 21일
- next는 SSR을 지원하는 react 기반의 프론트엔드 프레임워크입니다.
- references
  - [next 공식 문서](https://nextjs.org/docs/getting-started)
  - [typescript 공식 문서](https://www.typescriptlang.org/docs)

###

## Directory
```
├─.storybook // storybook 설정
├─cypress // cypress 설정 및 테스트
├─locales // 다국어 처리
├─public // 정적 파일
├─src
    ├─@types // *.d.ts
    ├─aliases // 타입 정의
    ├─components // 컴포넌트 
    ├─constants // 상수 정의
    ├─contents // UI 컨텐츠
    ├─enums // 열거형 타입 정의
    ├─hocs // 고차 컴포넌트
    ├─hooks // 사용자 정의 hooks
    ├─interfaces // 인터페이스 정의
    ├─layouts // 레이아웃 컴포넌트
    ├─libs // 라이브러리
    ├─middlewares // 미들웨어
    ├─pages // 페이지 컴포넌트
    ├─parts // 조합 컴포넌트
    ├─styles // 공통 스타일
    └─utils // 유틸리티 함수
├─stories // storybook 문서화 및 테스트
└─tests // jest 테스트
```

#### .storybook
- storybook 설정 파일 위치
- reference: [storybook 공식 문서](https://storybook.js.org/docs/react/get-started/introduction)

#### stories
- UI 문서화 및 테스트 파일 위치(storybook)

#### cypress
- cypress 설정 및 e2e 테스트 파일 위치
- reference: [cypress 공식 문서](https://docs.cypress.io/guides/overview/why-cypress.html)

#### locales
- 다국어 처리 파일 위치(i18n)
- reference: [next-translate 저장소](https://github.com/vinissimus/next-translate)

#### public
- 이미지 등 정적 파일 위치

### src
#### @types
- 외부 라이브러리 타입 정의 파일 위치(*.d.ts 확장자)
- reference: [typescript 공식 문서 - .d.ts files](https://www.typescriptlang.org/docs/handbook/2/type-declarations.html#dts-files)

#### aliases
- 타입 정의 파일 위치
- reference: [typescript 공식 문서 - type aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)

#### components
- 컴포넌트 파일 위치

#### constants
- 상수 정의 파일 위치

#### contents
- UI 컨텐츠 파일 위치

#### enums
- 열거형 타입 정의 파일 위치
- reference: [typescript 공식 문서 - enum](https://www.typescriptlang.org/docs/handbook/basic-types.html#enum)

#### hocs
- 고차 컴포넌트(higher order components) 파일 위치
- reference: [react 한국어 문서 - 고차 컴포넌트](https://reactjs-kr.firebaseapp.com/docs/higher-order-components.html)

#### hooks
- 사용자 정의 hooks(custom hooks) 파일 위치
- references
  - [react 한국어 문서 - Hook의 개요](https://ko.reactjs.org/docs/hooks-intro.html)
  - [react 한국어 문서 - 자신만의 Hook 만들기](https://ko.reactjs.org/docs/hooks-custom.html)

#### interfaces
- 인터페이스 정의 파일 위치
- reference: [typescript 공식 문서 - interfaces](https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html#interfaces)

#### layouts
- 레이아웃 컴포넌트 파일 위치

#### libs
- 라이브러리 파일 위치

#### middlewares
- 미들웨어 파일 위치

#### pages
- 페이지 컴포넌트 파일 위치

#### parts
- 조합 컴포넌트(components 파일 내부의 작은 컴포넌트들을 조립한 컴포넌트) 파일 위치

#### styles
- 공통 스타일 파일 위치

#### utils
- 유틸리티 함수 파일 위치

###

## Package Install
- 패키지를 설치합니다.
```
yarn install
```

## Build
- 빌드를 진행합니다.
```
yarn build
```

## Build Storybook
- storybook을 빌드합니다.
```
yarn build:storybook
```

## Start Server
- 서버를 실행합니다
```
yarn start
# open localhost:3000
```

## Start Dev-Server
- 개발 서버를 실행합니다.
```
yarn dev
# open localhost:3000
```

## Start Storybook Server
- storybook 서버를 실행합니다.
```
yarn start:storybook
# open localhost:6006
```

## Test
- jest를 이용해 유닛 테스트를 실행합니다.
```
yarn test
```

## E2E Test
- cypress를 이용해 e2e 테스트를 실행합니다.
```
yarn test:cypress
# open localhost:8080
```

## Open Cypress
- cypress 응용 프로그램을 실행합니다.
```
yarn open:cypress
```

###

## Dependencies
### HTTP
- axios, axios-hooks, swr
- swr은 next를 개발한 vercel팀에서 제작한 react-hooks 라이브러리로, 데이터 가져오기에 특화된 다양한 기능을 제공합니다.
- references
  - [axios 저장소](https://github.com/axios/axios)
  - [axios-hooks 저장소](https://github.com/simoneb/axios-hooks)
  - [swr 공식 문서](https://swr.vercel.app/)

### Style
- emotion
- styled-components와 사용법이 거의 동일하지만 좀 더 확장된 기능을 지원합니다.
- reference: [emotion 공식 문서](https://emotion.sh/docs/introduction)

### Test
- react-testing-library, react-hooks-testing-library, jest
- references
  - [react-testing-library 공식 문서](https://testing-library.com/docs/react-testing-library/intro/)
  - [react-hooks-testing-library 공식 문서](https://react-hooks-testing-library.com/)
  - [jest 공식 문서](https://jestjs.io/docs/en/getting-started)

### ETC
- react-helmet, react-loading-skeleton, react-paginate
- references
  - [react-helmet 저장소](https://github.com/nfl/react-helmet)
  - [react-loading-skeleton 저장소](https://github.com/dvtng/react-loading-skeleton)
  - [react-paginate 저장소](https://github.com/AdeleD/react-paginate)