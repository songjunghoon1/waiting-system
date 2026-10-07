export const metadata = {
  title: '실시간 대기 현황',
  description: '실시간 대기 인원 및 예상 소요시간 안내 서비스',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
