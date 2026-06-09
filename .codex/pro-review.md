MARKER: REVIEW_PACKET_SITEWIDE_20260610_V1
SOURCE: Chrome ChatGPT GPT-5.5 Pro, https://chatgpt.com/c/6a287ee9-13f4-8320-a0ab-f3fc64810cc8
VERDICT: PASS

MUST_FIX

NO MUST_FIX

OPTIONAL

AdminCommandSearch should get real combobox/listbox semantics before an accessibility-hardening pass: add an explicit label or aria-label, aria-expanded, aria-controls, and active-result announcement via aria-activedescendant or roving focus. The current UI supports arrow/enter behavior visually, but the input and popup are plain input/div/ul/link elements, so screen readers may not understand the active command state.

Add 레거시 문의 and 랜딩 페이지 to COMMANDS, or narrow the placeholder copy. The existing admin shell exposes those destinations, but the new "명령 또는 화면 검색" command list omits them, so searching known admin screens can produce a false miss.

Add focused e2e coverage for command-search keyboard behavior: fill query, ArrowDown/ArrowUp selection, Enter navigation, Escape close, and zero-result no-navigation. Current e2e only verifies that faq exposes an /admin/support link, while the implementation contains custom keyboard logic that is otherwise untested.

Add unit tests for formatKstDate covering null, undefined, invalid strings, date-only strings, timezone-qualified ISO strings, and offsetless datetime strings. The helper is deterministic for valid timestamp inputs with explicit timezone or date-only values, but offsetless datetimes are still parsed through new Date(dateString), which can vary by runtime timezone.

Before final production signoff, resolve or replace the production admin credentials and rerun authenticated admin QA on the deployed domain. The packet records that weet / weet003 failed on production and that authenticated admin QA used temporary local users, so admin production validation remains incomplete.

Align the existing FAQ A/S copy with the new contract-scoped checklist language. The new card is safer because it scopes manufacturing defects to the contract warranty and separates ground subsidence, disasters, and user-caused damage, but the existing FAQ excerpt still uses broader warranty/app wording nearby; that can create mixed expectations unless the broader FAQ claims are confirmed operationally.
