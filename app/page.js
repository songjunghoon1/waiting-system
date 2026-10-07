'use client';

import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR('/api/waiting-status', fetcher, {
    refreshInterval: 4000,
    revalidateOnFocus: false,
  });

  if (isLoading) return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;
  if (error || !data) return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>데이터를 불러올 수 없습니다.</div>;

  return (
    <main style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center', width: '300px' }}>
        <h1 style={{ fontSize: '20px', margin: '0 0 10px 0' }}>실시간 대기 현황</h1>
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '20px' }}>기준 시각: {data.currentTime}</p>

        <div style={{ backgroundColor: '#eff6ff', padding: '15px', borderRadius: '12px', marginBottom: '12px' }}>
          <p style={{ fontSize: '14px', color: '#2563eb', margin: '0 0 5px 0' }}>현재 대기 인원</p>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e40af', margin: 0 }}>
            {Number(data.waitingCount).toLocaleString()} 명
          </p>
        </div>

        <div style={{ backgroundColor: '#fef2f2', padding: '15px', borderRadius: '12px' }}>
          <p style={{ fontSize: '14px', color: '#dc2626', margin: '0 0 5px 0' }}>예상 대기 시간</p>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#991b1b', margin: 0 }}>
            약 {data.estimatedTime} 분
          </p>
        </div>
      </div>
    </main>
  );
}
