# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin-functional.spec.ts >> Admin functional operations >> landing page tab persists hero slide CRUD and signature product changes
- Location: e2e/admin-functional.spec.ts:92:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 0
Received: 1

Call Log:
- Timeout 5000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - region "Notifications alt+T":
      - list:
        - listitem [ref=e3]:
          - generic [ref=e5]: 정말 삭제하시겠습니까?
          - button "취소" [ref=e6] [cursor=pointer]
          - button "삭제" [ref=e7] [cursor=pointer]
        - listitem [ref=e8]:
          - generic [ref=e10]: 정말 삭제하시겠습니까?
          - button "취소" [ref=e11] [cursor=pointer]
          - button "삭제" [ref=e12] [cursor=pointer]
    - generic [ref=e13]:
      - complementary [ref=e15]:
        - generic [ref=e16]:
          - generic [ref=e17]: W
          - generic [ref=e18]:
            - generic [ref=e19]: weet
            - generic [ref=e20]: Operations
        - navigation [ref=e21]:
          - generic [ref=e22]:
            - heading "작업" [level=3] [ref=e23]
            - generic [ref=e24]:
              - link "작업실" [ref=e25] [cursor=pointer]:
                - /url: /admin
                - img [ref=e26]
                - text: 작업실
              - link "상담 관리" [ref=e30] [cursor=pointer]:
                - /url: /admin/consultations
                - img [ref=e31]
                - text: 상담 관리
          - generic [ref=e34]:
            - heading "고객" [level=3] [ref=e35]
            - link "레거시 문의" [ref=e37] [cursor=pointer]:
              - /url: /admin/inquiries
              - img [ref=e38]
              - text: 레거시 문의
          - generic [ref=e40]:
            - heading "제품/공간" [level=3] [ref=e41]
            - generic [ref=e42]:
              - link "제품 관리" [ref=e43] [cursor=pointer]:
                - /url: /admin/products
                - img [ref=e44]
                - text: 제품 관리
              - link "주문 구성" [ref=e48] [cursor=pointer]:
                - /url: /admin/customize
                - img [ref=e49]
                - text: 주문 구성
              - link "프로젝트 관리" [ref=e50] [cursor=pointer]:
                - /url: /admin/projects
                - img [ref=e51]
                - text: 프로젝트 관리
          - generic [ref=e53]:
            - heading "콘텐츠" [level=3] [ref=e54]
            - generic [ref=e55]:
              - link "랜딩 페이지" [ref=e56] [cursor=pointer]:
                - /url: /admin/main
                - img [ref=e57]
                - text: 랜딩 페이지
              - link "FAQ 관리" [ref=e59] [cursor=pointer]:
                - /url: /admin/support
                - img [ref=e60]
                - text: FAQ 관리
              - link "갤러리 관리" [ref=e63] [cursor=pointer]:
                - /url: /admin/gallery
                - img [ref=e64]
                - text: 갤러리 관리
          - generic [ref=e68]:
            - heading "데이터" [level=3] [ref=e69]
            - generic [ref=e70]:
              - link "고객 인사이트" [ref=e71] [cursor=pointer]:
                - /url: /admin/insights
                - img [ref=e72]
                - text: 고객 인사이트
              - link "UTM Builder" [ref=e74] [cursor=pointer]:
                - /url: /admin/utm
                - img [ref=e75]
                - text: UTM Builder
          - generic [ref=e78]:
            - heading "시스템" [level=3] [ref=e79]
            - link "설정" [ref=e81] [cursor=pointer]:
              - /url: /admin/settings
              - img [ref=e82]
              - text: 설정
        - generic [ref=e85]:
          - generic [ref=e86]: E
          - generic [ref=e87]:
            - paragraph [ref=e88]: e2e-44d5363e
            - paragraph [ref=e89]: 관리자
          - button "로그아웃" [ref=e90] [cursor=pointer]:
            - img [ref=e91]
      - main [ref=e94]:
        - generic [ref=e96]:
          - generic [ref=e98]:
            - paragraph [ref=e99]: CONTENTS
            - heading "랜딩 페이지 관리" [level=1] [ref=e100]
            - paragraph [ref=e101]: 홈 첫 화면과 시그니처 제품 노출을 실제 공개 상태와 함께 관리합니다.
          - generic [ref=e102]:
            - generic [ref=e104]:
              - generic [ref=e105]:
                - paragraph [ref=e106]: 공개 히어로
                - paragraph [ref=e107]: 13/13
                - paragraph [ref=e108]: 홈 첫 화면에 노출되는 슬라이드
              - img [ref=e110]
            - generic [ref=e115]:
              - generic [ref=e116]:
                - paragraph [ref=e117]: 시그니처 제품
                - paragraph [ref=e118]: "10"
                - paragraph [ref=e119]: 공개 제품 중 홈 노출 선택
              - img [ref=e121]
            - generic [ref=e125]:
              - generic [ref=e126]:
                - paragraph [ref=e127]: 비공개 선택
                - paragraph [ref=e128]: "0"
                - paragraph [ref=e129]: 공개 전환 전에는 홈에 표시되지 않음
              - img [ref=e131]
          - navigation [ref=e137]:
            - button "히어로 슬라이드" [ref=e138] [cursor=pointer]:
              - img [ref=e139]
              - text: 히어로 슬라이드
            - button "시그니처 제품" [ref=e143] [cursor=pointer]:
              - img [ref=e144]
              - text: 시그니처 제품
          - generic [ref=e148]:
            - generic [ref=e149]:
              - heading "슬라이드 관리" [level=2] [ref=e152]
              - button "새 슬라이드" [ref=e153] [cursor=pointer]:
                - img [ref=e154]
                - text: 새 슬라이드
            - generic [ref=e155]:
              - generic [ref=e156]:
                - button "Welcome to weet:) 순서 변경" [ref=e157]:
                  - img [ref=e158]
                - generic [ref=e165]:
                  - img "Welcome to weet:)" [ref=e167]
                  - generic [ref=e168]:
                    - generic [ref=e169]:
                      - paragraph [ref=e170]: 메인 타이틀
                      - paragraph [ref=e171]: Welcome to weet:)
                      - generic [ref=e173]: 공개
                    - generic [ref=e174]:
                      - paragraph [ref=e175]: 서브 타이틀
                      - paragraph [ref=e176]: We make dreams come true
                - generic [ref=e177]:
                  - button "Welcome to weet:) 숨기기" [ref=e178] [cursor=pointer]:
                    - img [ref=e179]
                  - button "Welcome to weet:) 수정" [ref=e184] [cursor=pointer]: 수정
                  - button "Welcome to weet:) 삭제" [ref=e185] [cursor=pointer]:
                    - img [ref=e186]
              - generic [ref=e189]:
                - button "순서 변경" [ref=e190]:
                  - img [ref=e191]
                - generic [ref=e198]:
                  - img [ref=e200]
                  - generic [ref=e201]:
                    - generic [ref=e202]:
                      - paragraph [ref=e203]: 메인 타이틀
                      - paragraph
                      - generic [ref=e205]: 공개
                    - generic [ref=e206]:
                      - paragraph [ref=e207]: 서브 타이틀
                      - paragraph [ref=e208]: "-"
                - generic [ref=e209]:
                  - button "숨기기" [ref=e210] [cursor=pointer]:
                    - img [ref=e211]
                  - button "수정" [ref=e216] [cursor=pointer]
                  - button "삭제" [ref=e217] [cursor=pointer]:
                    - img [ref=e218]
              - generic [ref=e221]:
                - button "- 순서 변경" [ref=e222]:
                  - img [ref=e223]
                - generic [ref=e230]:
                  - img "-" [ref=e232]
                  - generic [ref=e233]:
                    - generic [ref=e234]:
                      - paragraph [ref=e235]: 메인 타이틀
                      - paragraph [ref=e236]: "-"
                      - generic [ref=e238]: 공개
                    - generic [ref=e239]:
                      - paragraph [ref=e240]: 서브 타이틀
                      - paragraph [ref=e241]: "-"
                - generic [ref=e242]:
                  - button "- 숨기기" [ref=e243] [cursor=pointer]:
                    - img [ref=e244]
                  - button "- 수정" [ref=e249] [cursor=pointer]: 수정
                  - button "- 삭제" [ref=e250] [cursor=pointer]:
                    - img [ref=e251]
              - generic [ref=e254]:
                - button "순서 변경" [ref=e255]:
                  - img [ref=e256]
                - generic [ref=e263]:
                  - img [ref=e265]
                  - generic [ref=e266]:
                    - generic [ref=e267]:
                      - paragraph [ref=e268]: 메인 타이틀
                      - paragraph
                      - generic [ref=e270]: 공개
                    - generic [ref=e271]:
                      - paragraph [ref=e272]: 서브 타이틀
                      - paragraph [ref=e273]: "-"
                - generic [ref=e274]:
                  - button "숨기기" [ref=e275] [cursor=pointer]:
                    - img [ref=e276]
                  - button "수정" [ref=e281] [cursor=pointer]
                  - button "삭제" [ref=e282] [cursor=pointer]:
                    - img [ref=e283]
              - generic [ref=e286]:
                - button "순서 변경" [ref=e287]:
                  - img [ref=e288]
                - generic [ref=e297]:
                  - generic [ref=e298]:
                    - paragraph [ref=e299]: 메인 타이틀
                    - paragraph
                    - generic [ref=e301]: 공개
                  - generic [ref=e302]:
                    - paragraph [ref=e303]: 서브 타이틀
                    - paragraph [ref=e304]: "-"
                - generic [ref=e305]:
                  - button "숨기기" [ref=e306] [cursor=pointer]:
                    - img [ref=e307]
                  - button "수정" [ref=e312] [cursor=pointer]
                  - button "삭제" [ref=e313] [cursor=pointer]:
                    - img [ref=e314]
              - generic [ref=e317]:
                - button "순서 변경" [ref=e318]:
                  - img [ref=e319]
                - generic [ref=e326]:
                  - img [ref=e328]
                  - generic [ref=e329]:
                    - generic [ref=e330]:
                      - paragraph [ref=e331]: 메인 타이틀
                      - paragraph
                      - generic [ref=e333]: 공개
                    - generic [ref=e334]:
                      - paragraph [ref=e335]: 서브 타이틀
                      - paragraph [ref=e336]: "-"
                - generic [ref=e337]:
                  - button "숨기기" [ref=e338] [cursor=pointer]:
                    - img [ref=e339]
                  - button "수정" [ref=e344] [cursor=pointer]
                  - button "삭제" [ref=e345] [cursor=pointer]:
                    - img [ref=e346]
              - generic [ref=e349]:
                - button "순서 변경" [ref=e350]:
                  - img [ref=e351]
                - generic [ref=e358]:
                  - img [ref=e360]
                  - generic [ref=e361]:
                    - generic [ref=e362]:
                      - paragraph [ref=e363]: 메인 타이틀
                      - paragraph
                      - generic [ref=e365]: 공개
                    - generic [ref=e366]:
                      - paragraph [ref=e367]: 서브 타이틀
                      - paragraph [ref=e368]: "-"
                - generic [ref=e369]:
                  - button "숨기기" [ref=e370] [cursor=pointer]:
                    - img [ref=e371]
                  - button "수정" [ref=e376] [cursor=pointer]
                  - button "삭제" [ref=e377] [cursor=pointer]:
                    - img [ref=e378]
              - generic [ref=e381]:
                - button "순서 변경" [ref=e382]:
                  - img [ref=e383]
                - generic [ref=e390]:
                  - img [ref=e392]
                  - generic [ref=e393]:
                    - generic [ref=e394]:
                      - paragraph [ref=e395]: 메인 타이틀
                      - paragraph
                      - generic [ref=e397]: 공개
                    - generic [ref=e398]:
                      - paragraph [ref=e399]: 서브 타이틀
                      - paragraph [ref=e400]: "-"
                - generic [ref=e401]:
                  - button "숨기기" [ref=e402] [cursor=pointer]:
                    - img [ref=e403]
                  - button "수정" [ref=e408] [cursor=pointer]
                  - button "삭제" [ref=e409] [cursor=pointer]:
                    - img [ref=e410]
              - generic [ref=e413]:
                - button "순서 변경" [ref=e414]:
                  - img [ref=e415]
                - generic [ref=e422]:
                  - img [ref=e424]
                  - generic [ref=e425]:
                    - generic [ref=e426]:
                      - paragraph [ref=e427]: 메인 타이틀
                      - paragraph
                      - generic [ref=e429]: 공개
                    - generic [ref=e430]:
                      - paragraph [ref=e431]: 서브 타이틀
                      - paragraph [ref=e432]: "-"
                - generic [ref=e433]:
                  - button "숨기기" [ref=e434] [cursor=pointer]:
                    - img [ref=e435]
                  - button "수정" [ref=e440] [cursor=pointer]
                  - button "삭제" [ref=e441] [cursor=pointer]:
                    - img [ref=e442]
              - generic [ref=e445]:
                - button "순서 변경" [ref=e446]:
                  - img [ref=e447]
                - generic [ref=e454]:
                  - img [ref=e456]
                  - generic [ref=e457]:
                    - generic [ref=e458]:
                      - paragraph [ref=e459]: 메인 타이틀
                      - paragraph
                      - generic [ref=e461]: 공개
                    - generic [ref=e462]:
                      - paragraph [ref=e463]: 서브 타이틀
                      - paragraph [ref=e464]: "-"
                - generic [ref=e465]:
                  - button "숨기기" [ref=e466] [cursor=pointer]:
                    - img [ref=e467]
                  - button "수정" [ref=e472] [cursor=pointer]
                  - button "삭제" [ref=e473] [cursor=pointer]:
                    - img [ref=e474]
              - generic [ref=e477]:
                - button "순서 변경" [ref=e478]:
                  - img [ref=e479]
                - generic [ref=e486]:
                  - img [ref=e488]
                  - generic [ref=e489]:
                    - generic [ref=e490]:
                      - paragraph [ref=e491]: 메인 타이틀
                      - paragraph
                      - generic [ref=e493]: 공개
                    - generic [ref=e494]:
                      - paragraph [ref=e495]: 서브 타이틀
                      - paragraph [ref=e496]: "-"
                - generic [ref=e497]:
                  - button "숨기기" [ref=e498] [cursor=pointer]:
                    - img [ref=e499]
                  - button "수정" [ref=e504] [cursor=pointer]
                  - button "삭제" [active] [ref=e505] [cursor=pointer]:
                    - img [ref=e506]
              - generic [ref=e509]:
                - button "E2E 보조 슬라이드 503ff4cf 순서 변경" [ref=e510]:
                  - img [ref=e511]
                - generic [ref=e518]:
                  - img "E2E 보조 슬라이드 503ff4cf" [ref=e520]
                  - generic [ref=e521]:
                    - generic [ref=e522]:
                      - paragraph [ref=e523]: 메인 타이틀
                      - paragraph [ref=e524]: E2E 보조 슬라이드 503ff4cf
                      - generic [ref=e526]: 공개
                    - generic [ref=e527]:
                      - paragraph [ref=e528]: 서브 타이틀
                      - paragraph [ref=e529]: E2E 보조 공개 슬라이드
                - generic [ref=e530]:
                  - button "E2E 보조 슬라이드 503ff4cf 숨기기" [ref=e531] [cursor=pointer]:
                    - img [ref=e532]
                  - button "E2E 보조 슬라이드 503ff4cf 수정" [ref=e537] [cursor=pointer]: 수정
                  - button "E2E 보조 슬라이드 503ff4cf 삭제" [ref=e538] [cursor=pointer]:
                    - img [ref=e539]
              - generic [ref=e542]:
                - button "E2E 랜딩 슬라이드 503ff4cf 순서 변경" [ref=e543]:
                  - img [ref=e544]
                - generic [ref=e551]:
                  - img "E2E 랜딩 슬라이드 503ff4cf" [ref=e553]
                  - generic [ref=e554]:
                    - generic [ref=e555]:
                      - paragraph [ref=e556]: 메인 타이틀
                      - paragraph [ref=e557]: E2E 랜딩 슬라이드 503ff4cf
                      - generic [ref=e558]:
                        - generic [ref=e559]: 공개
                        - generic [ref=e560]: 링크 있음
                    - generic [ref=e561]:
                      - paragraph [ref=e562]: 서브 타이틀
                      - paragraph [ref=e563]: 수정된 부제
                      - paragraph [ref=e564]:
                        - img [ref=e565]
                        - text: /customize?source=e2e
                - generic [ref=e568]:
                  - button "E2E 랜딩 슬라이드 503ff4cf 숨기기" [ref=e569] [cursor=pointer]:
                    - img [ref=e570]
                  - button "E2E 랜딩 슬라이드 503ff4cf 수정" [ref=e575] [cursor=pointer]: 수정
                  - button "E2E 랜딩 슬라이드 503ff4cf 삭제" [ref=e576] [cursor=pointer]:
                    - img [ref=e577]
            - status [ref=e580]
  - alert [ref=e581]
```

# Test source

```ts
  90  | 
  91  | test.describe.serial('Admin functional operations', () => {
  92  |   test('landing page tab persists hero slide CRUD and signature product changes', async ({ page }) => {
  93  |     test.skip(!serviceClient, 'Supabase service role env is required for admin functional CRUD checks.');
  94  | 
  95  |     const credentials = await createE2EAdminCredentials();
  96  |     const suffix = randomUUID().slice(0, 8);
  97  |     const slideTitle = `E2E 랜딩 슬라이드 ${suffix}`;
  98  |     const supportSlideTitle = `E2E 보조 슬라이드 ${suffix}`;
  99  |     const productId = randomUUID();
  100 |     const productName = `E2E 시그니처 제품 ${suffix}`;
  101 | 
  102 |     const { data: activeSignatureProducts } = await serviceClient!
  103 |       .from('products')
  104 |       .select('id')
  105 |       .eq('is_active', true)
  106 |       .eq('is_signature', true);
  107 |     const hasSignatureCapacity = (activeSignatureProducts?.length ?? 0) < 10;
  108 | 
  109 |     await serviceClient!.from('products').insert({
  110 |       id: productId,
  111 |       name: productName,
  112 |       sub_category: 'Private',
  113 |       size_category: 'S',
  114 |       image_url: '/images/hero_main.webp',
  115 |       tagline: 'E2E signature product',
  116 |       description: '관리자 시그니처 토글 검증을 위한 충분한 설명입니다.',
  117 |       price: '테스트가',
  118 |       is_active: true,
  119 |       is_signature: hasSignatureCapacity,
  120 |       display_order: 9999,
  121 |     } as any);
  122 |     await serviceClient!.from('hero_slides').insert({
  123 |       title: supportSlideTitle,
  124 |       subtitle: 'E2E 보조 공개 슬라이드',
  125 |       image_url: '/images/hero_main.webp',
  126 |       link_url: null,
  127 |       is_active: true,
  128 |       sort_order: 9998,
  129 |     } as any);
  130 | 
  131 |     try {
  132 |       await loginAsAdmin(page, credentials);
  133 |       await page.goto('/admin/main');
  134 |       await expect(page.getByRole('heading', { name: '랜딩 페이지 관리' })).toBeVisible();
  135 | 
  136 |       await page.getByRole('button', { name: /새 슬라이드/ }).click();
  137 |       const createForm = page.locator('form').last();
  138 |       await createForm.locator('input[name="title"]').fill(slideTitle);
  139 |       await createForm.locator('input[name="subtitle"]').fill('처음 저장된 부제');
  140 |       await createForm.getByPlaceholder('/images/hero_main.webp 또는 https://...').fill('/images/hero_main.webp');
  141 |       await createForm.getByPlaceholder('/customize 또는 https://...').fill('/customize?source=e2e');
  142 |       await createForm.getByRole('button', { name: '저장' }).click();
  143 |       await expect(page.getByText(slideTitle)).toBeVisible();
  144 | 
  145 |       await expect.poll(async () => {
  146 |         const { data } = await serviceClient!
  147 |           .from('hero_slides')
  148 |           .select('subtitle, image_url, link_url, is_active')
  149 |           .eq('title', slideTitle)
  150 |           .maybeSingle();
  151 |         return data;
  152 |       }).toMatchObject({
  153 |         subtitle: '처음 저장된 부제',
  154 |         image_url: '/images/hero_main.webp',
  155 |         link_url: '/customize?source=e2e',
  156 |         is_active: true,
  157 |       });
  158 | 
  159 |       await page.getByLabel(`${slideTitle} 숨기기`).click();
  160 |       await expect.poll(async () => {
  161 |         const { data } = await serviceClient!
  162 |           .from('hero_slides')
  163 |           .select('is_active')
  164 |           .eq('title', slideTitle)
  165 |           .maybeSingle();
  166 |         return data?.is_active;
  167 |       }).toBe(false);
  168 | 
  169 |       await page.getByRole('button', { name: `${slideTitle} 수정` }).click();
  170 |       const editForm = page.locator('form').last();
  171 |       await editForm.locator('input[name="subtitle"]').fill('수정된 부제');
  172 |       await editForm.getByRole('button', { name: '저장' }).click();
  173 |       await expect.poll(async () => {
  174 |         const { data } = await serviceClient!
  175 |           .from('hero_slides')
  176 |           .select('subtitle')
  177 |           .eq('title', slideTitle)
  178 |           .maybeSingle();
  179 |         return data?.subtitle;
  180 |       }).toBe('수정된 부제');
  181 | 
  182 |       await page.getByLabel(`${slideTitle} 삭제`).click();
  183 |       await acceptNextDialog(page);
  184 |       await expect.poll(async () => {
  185 |         const { data } = await serviceClient!
  186 |           .from('hero_slides')
  187 |           .select('id')
  188 |           .eq('title', slideTitle);
  189 |         return data?.length ?? -1;
> 190 |       }).toBe(0);
      |          ^ Error: expect(received).toBe(expected) // Object.is equality
  191 | 
  192 |       await page.getByRole('button', { name: /시그니처 제품/ }).click();
  193 |       const signatureProductCard = page.getByRole('button', { name: new RegExp(productName) });
  194 |       if (hasSignatureCapacity) {
  195 |         await signatureProductCard.click();
  196 |         await expect.poll(async () => {
  197 |           const { data } = await serviceClient!
  198 |             .from('products')
  199 |             .select('is_signature')
  200 |             .eq('id', productId)
  201 |             .single();
  202 |           return data?.is_signature;
  203 |         }).toBe(false);
  204 |         await expect(signatureProductCard).toHaveAttribute('aria-pressed', 'false');
  205 |         await expect(signatureProductCard).not.toHaveClass(/opacity-70/);
  206 | 
  207 |         await signatureProductCard.click();
  208 |         await expect.poll(async () => {
  209 |           const { data } = await serviceClient!
  210 |             .from('products')
  211 |             .select('is_signature')
  212 |             .eq('id', productId)
  213 |             .single();
  214 |           return data?.is_signature;
  215 |         }).toBe(true);
  216 |       } else {
  217 |         await expect(signatureProductCard).toHaveAttribute('aria-pressed', 'false');
  218 |         await signatureProductCard.click();
  219 |         await expect.poll(async () => {
  220 |           const { data } = await serviceClient!
  221 |             .from('products')
  222 |             .select('is_signature')
  223 |             .eq('id', productId)
  224 |             .single();
  225 |           return data?.is_signature;
  226 |         }).toBe(false);
  227 |         await expect(signatureProductCard).toHaveAttribute('aria-pressed', 'false');
  228 |       }
  229 |     } finally {
  230 |       await serviceClient!.from('hero_slides').delete().eq('title', slideTitle);
  231 |       await serviceClient!.from('hero_slides').delete().eq('title', supportSlideTitle);
  232 |       await serviceClient!.from('products').delete().eq('id', productId);
  233 |       await credentials.cleanup();
  234 |     }
  235 |   });
  236 | 
  237 |   test('customize manager persists create, edit, toggle, and delete operations', async ({ page }) => {
  238 |     test.skip(!serviceClient, 'Supabase service role env is required for admin functional CRUD checks.');
  239 | 
  240 |     const credentials = await createE2EAdminCredentials();
  241 |     const suffix = randomUUID().slice(0, 8);
  242 |     const modelId = `e2e-model-${suffix}`;
  243 |     const modelName = `E2E 모델 ${suffix}`;
  244 |     const categoryKey = `e2e-category-${suffix}`;
  245 |     const categoryName = `E2E 카테고리 ${suffix}`;
  246 |     const optionKey = `e2e-option-${suffix}`;
  247 |     const optionName = `E2E 옵션 ${suffix}`;
  248 |     const conflictOptionId = randomUUID();
  249 |     const conflictOptionKey = `e2e-conflict-option-${suffix}`;
  250 |     const conflictOptionName = `E2E 충돌 옵션 ${suffix}`;
  251 |     const specKey = `e2e-spec-${suffix}`;
  252 |     const specName = `E2E 포함 사양 ${suffix}`;
  253 | 
  254 |     try {
  255 |       await loginAsAdmin(page, credentials);
  256 |       await page.goto('/admin/customize');
  257 |       await expect(page.getByRole('heading', { name: '주문 구성 관리' })).toBeVisible();
  258 | 
  259 |       const modelPanel = page.locator('#customize-panel-models');
  260 |       await modelPanel.getByLabel('ID').fill(modelId);
  261 |       await modelPanel.getByLabel('Code').fill(`m-${suffix}`);
  262 |       await modelPanel.getByLabel('모델명').fill(modelName);
  263 |       await modelPanel.getByLabel('영문명').fill(`Model ${suffix}`);
  264 |       await modelPanel.getByLabel('기본가').fill('12345678');
  265 |       await modelPanel.getByRole('button', { name: '저장' }).click();
  266 |       await expect.poll(async () => {
  267 |         const { data } = await serviceClient!.from('customize_models').select('name_ko, base_price').eq('id', modelId).maybeSingle();
  268 |         return data;
  269 |       }).toMatchObject({ name_ko: modelName, base_price: 12345678 });
  270 | 
  271 |       await page.getByRole('tab', { name: /카테고리/ }).click();
  272 |       const categoryPanel = page.locator('#customize-panel-categories');
  273 |       await categoryPanel.getByLabel('Key').fill(categoryKey);
  274 |       await categoryPanel.getByLabel('카테고리명').fill(categoryName);
  275 |       await categoryPanel.getByRole('button', { name: '저장' }).click();
  276 |       const categoryId = await waitForRecordId('customize_categories', 'key', categoryKey);
  277 | 
  278 |       await page.getByRole('tab', { name: /옵션/ }).click();
  279 |       const optionPanel = page.locator('#customize-panel-options');
  280 |       await optionPanel.getByRole('button', { name: /새 옵션/ }).click();
  281 |       await optionPanel.getByLabel('카테고리').selectOption({ label: categoryName });
  282 |       await optionPanel.getByLabel('Key').fill(optionKey);
  283 |       await optionPanel.getByLabel('옵션명').fill(optionName);
  284 |       await optionPanel.getByLabel('가격', { exact: true }).fill('987654');
  285 |       await optionPanel.getByLabel('짧은 설명').fill('E2E 옵션 설명');
  286 |       await optionPanel.getByLabel(modelName).check();
  287 |       await optionPanel.getByRole('button', { name: '저장' }).first().click();
  288 |       const optionId = await waitForRecordId('customize_options', 'key', optionKey);
  289 | 
  290 |       await serviceClient!.from('customize_options').insert({
```