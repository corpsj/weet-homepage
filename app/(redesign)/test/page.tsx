export default function TestPage() {
  return (
    <div className="pt-20 px-4">
      <h1 className="text-3xl font-bold">리디자인 테스트 페이지</h1>
      <p className="mt-4 text-gray-600">HeaderV2와 FooterV2가 정상 작동하는지 확인합니다.</p>
      <div className="mt-8 h-[200vh] bg-gray-50 rounded-lg p-8">
        <p>스크롤하면 헤더가 변합니다</p>
      </div>
    </div>
  );
}
