# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-pages.spec.ts >> Admin responsive shell >> mobile drawer opens, navigates, and keeps dangerous settings collapsed
- Location: e2e/public-pages.spec.ts:267:7

# Error details

```
Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - alert [ref=e2]: 위트(weet) — 이동식주택·모듈러주택 제작 전문
  - generic [ref=e3]:
    - region "Notifications alt+T":
      - list:
        - listitem [ref=e4]:
          - generic [ref=e5]:
            - generic [ref=e6]: 제품이 하나도 없을 때만 시드 데이터를 추가합니다. 진행할까요?
            - generic [ref=e7]: 이미 제품이 등록되어 있으면 자동으로 중단되며 기존 데이터는 그대로 보존됩니다.
          - button "취소" [ref=e8] [cursor=pointer]
          - button "시드 추가" [ref=e9] [cursor=pointer]
    - generic [ref=e10]:
      - generic [ref=e11]:
        - generic [ref=e12]:
          - generic [ref=e13]: W
          - text: weet
          - generic [ref=e14]: Operations
        - button "관리자 메뉴 열기" [ref=e15] [cursor=pointer]:
          - img [ref=e16]
      - main [ref=e17]:
        - generic [ref=e19]:
          - generic [ref=e21]:
            - paragraph [ref=e22]: SYSTEM
            - heading "설정" [level=1] [ref=e23]
            - paragraph [ref=e24]: 계정 관리, 알림 설정 및 시스템 제어를 수행합니다.
          - generic [ref=e25]:
            - generic [ref=e26]:
              - heading "사이트 정보" [level=2] [ref=e29]
              - paragraph [ref=e30]: 고객에게 노출되는 연락처·상담 채널 정보입니다. 비워두면 해당 항목은 사이트에 표시되지 않습니다. 숫자 항목은 검증 가능한 값만 입력해 주세요.
              - generic [ref=e31]:
                - generic [ref=e32]:
                  - generic [ref=e33]: 대표 연락처
                  - textbox "대표 연락처" [ref=e34]: 010-9645-2348
                - generic [ref=e35]:
                  - generic [ref=e36]: "상담 가능 시간 (예: 평일 09:00–18:00)"
                  - 'textbox "상담 가능 시간 (예: 평일 09:00–18:00)" [ref=e37]'
                - generic [ref=e38]:
                  - generic [ref=e39]: 카카오톡 채널 URL
                  - textbox "카카오톡 채널 URL" [ref=e40]
                - generic [ref=e41]:
                  - generic [ref=e42]: 문의 이메일
                  - textbox "문의 이메일" [ref=e43]
                - generic [ref=e44]:
                  - generic [ref=e45]: 네이버 블로그 URL
                  - textbox "네이버 블로그 URL" [ref=e46]: https://blog.naver.com/we-et
                - generic [ref=e47]:
                  - generic [ref=e48]: 인스타그램 URL
                  - textbox "인스타그램 URL" [ref=e49]: https://www.instagram.com/weet_kr/
                - generic [ref=e50]:
                  - generic [ref=e51]: 당근 프로필 URL
                  - textbox "당근 프로필 URL" [ref=e52]: https://www.daangn.com/kr/local-profile/%EC%9C%84%ED%8A%B8weet-kihpx4ctggn6/
                - generic [ref=e53]:
                  - generic [ref=e54]: "설립 연도 (예: 2021)"
                  - 'textbox "설립 연도 (예: 2021)" [ref=e55]'
                - generic [ref=e56]:
                  - generic [ref=e57]: 누적 제작 대수 (검증된 숫자만)
                  - textbox "누적 제작 대수 (검증된 숫자만)" [ref=e58]
                - generic [ref=e59]:
                  - generic [ref=e60]: "평균 제작 기간 안내 문구 (예: 계약 후 4–6주)"
                  - 'textbox "평균 제작 기간 안내 문구 (예: 계약 후 4–6주)" [ref=e61]'
              - button "저장" [ref=e62] [cursor=pointer]
            - generic [ref=e63]:
              - heading "계정 설정" [level=2] [ref=e66]
              - generic [ref=e67]:
                - generic [ref=e68]:
                  - generic [ref=e69]: 아이디
                  - textbox [disabled] [ref=e70]: e2e-b1c90bef
                - generic [ref=e71]:
                  - generic [ref=e72]: 비밀번호
                  - button "비밀번호 변경" [ref=e73] [cursor=pointer]
            - generic [ref=e74]:
              - heading "알림 설정" [level=2] [ref=e77]
              - generic [ref=e78]:
                - paragraph [ref=e79]: 이메일 알림 연동 전
                - paragraph [ref=e80]: 현재 문의 알림 발송 백엔드는 연결되어 있지 않습니다. 조작 가능한 토글을 노출하지 않고, 실제 발송 연동 후 설정 항목을 활성화합니다.
            - generic [ref=e81]:
              - heading "데이터 관리" [level=2] [ref=e84]
              - group [ref=e85]:
                - generic "고급 / 위험 작업" [ref=e86] [cursor=pointer]
                - generic [ref=e87]:
                  - heading "초기 데이터 이관 (Migration)" [level=3] [ref=e88]
                  - paragraph [ref=e89]:
                    - text: 하드코딩된 제품 데이터를 Supabase 데이터베이스로 복사합니다.
                    - text: 이미 데이터가 존재하는 경우 중복될 수 있으니 주의하세요.
                  - button "데이터 이관 실행" [active] [ref=e90] [cursor=pointer]
```