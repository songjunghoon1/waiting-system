'use client';

import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR('/api/waiting-status', fetcher, {
    refreshInterval: 2000, // 2초마다 자동 반영
    revalidateOnFocus: false,
  });

  if (isLoading) {
    return (
      <main style={styles.container}>
        <div style={styles.skeletonCard}>
          <div style={styles.spinner}></div>
          <p style={{ marginTop: '16px', color: '#888', fontSize: '14px' }}>최신 대기 현황 불러오는 중...</p>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main style={styles.container}>
        <div style={styles.card}>
          <p style={{ color: '#e53e3e', fontWeight: 'bold' }}>데이터를 불러올 수 없습니다.</p>
          <p style={{ color: '#718096', fontSize: '13px', marginTop: '8px' }}>잠시 후 다시 시도해 주세요.</p>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.container}>
      {/* 배경 장식 포인트 */}
      <div style={styles.bgGlow}></div>

      <div style={styles.card}>
        {/* 상단 태그 */}
        <div style={styles.badge}>
          <span style={styles.liveDot}></span> LIVE STATUS
        </div>

        {/* 타이틀 */}
        <h1 style={styles.title}>
          2026 JTBC 서울마라톤<br />
          <span style={styles.titleHighlight}>레이스팩 수령 대기 현황</span>
        </h1>

        <p style={styles.timeText}>
          기준 시각 <span style={styles.timeValue}>{data.currentTime || '-'}</span>
        </p>

        {/* 대기인원 & 예상시간 그리드 */}
        <div style={styles.gridContainer}>
          {/* 현재 대기 인원 */}
          <div style={styles.statBoxPrimary}>
            <span style={styles.statLabelPrimary}>현재 대기 인원</span>
            <div style={styles.statValueWrapper}>
              <span style={styles.statValuePrimary}>
                {Number(data.waitingCount || 0).toLocaleString()}
              </span>
              <span style={styles.statUnitPrimary}>명</span>
            </div>
          </div>

          {/* 예상 대기 시간 */}
          <div style={styles.statBoxAccent}>
            <span style={styles.statLabelAccent}>예상 대기 시간</span>
            <div style={styles.statValueWrapper}>
              <span style={styles.statUnitAccent}>약</span>
              <span style={styles.statValueAccent}>
                {data.estimatedTime || 0}
              </span>
              <span style={styles.statUnitAccent}>분</span>
            </div>
          </div>
        </div>

        {/* 하단 안내 문구 */}
        <div style={styles.footerNote}>
          💡 현장 상황에 따라 실제 대기 시간은 차이가 발생할 수 있습니다.
        </div>
      </div>
    </main>
  );
}

// 인라인 CSS 스타일 (모바일 & 데스크톱 모두 완벽 대응)
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a', // 세련된 다크 블루/그레이 배경
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    padding: '20px',
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden',
  },
  bgGlow: {
    position: 'absolute',
    width: '350px',
    height: '350px',
    background: 'radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(15,23,42,0) 70%)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: '#1e293b', // 카드는 한 단계 밝은 다크 톤
    borderRadius: '24px',
    padding: '36px 28px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
    boxSizing: 'border-box',
  },
  skeletonCard: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: '#1e293b',
    borderRadius: '24px',
    padding: '50px 28px',
    textAlign: 'center',
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '3px solid rgba(255,255,255,0.1)',
    borderTop: '3px solid #ef4444',
    borderRadius: '50%',
    margin: '0 auto',
    animation: 'spin 1s linear infinite',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    color: '#f87171',
    fontSize: '11px',
    fontWeight: '700',
    padding: '6px 12px',
    borderRadius: '20px',
    letterSpacing: '1px',
    marginBottom: '18px',
  },
  liveDot: {
    width: '6px',
    height: '6px',
    backgroundColor: '#ef4444',
    borderRadius: '50%',
    boxShadow: '0 0 8px #ef4444',
  },
  title: {
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: '700',
    lineHeight: '1.4',
    margin: '0 0 12px 0',
    wordBreak: 'keep-all',
  },
  titleHighlight: {
    color: '#f87171', // 레드 포인트
  },
  timeText: {
    fontSize: '13px',
    color: '#94a3b8',
    margin: '0 0 28px 0',
  },
  timeValue: {
    color: '#e2e8f0',
    fontWeight: '600',
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  statBoxPrimary: {
    backgroundColor: '#0f172a',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  statLabelPrimary: {
    fontSize: '13px',
    color: '#94a3b8',
    fontWeight: '500',
    display: 'block',
    marginBottom: '6px',
  },
  statValueWrapper: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: '4px',
  },
  statValuePrimary: {
    fontSize: '38px',
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: '-1px',
  },
  statUnitPrimary: {
    fontSize: '16px',
    color: '#64748b',
    fontWeight: '500',
  },
  statBoxAccent: {
    background: 'linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(220,38,38,0.08) 100%)',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid rgba(239, 68, 68, 0.3)',
  },
  statLabelAccent: {
    fontSize: '13px',
    color: '#fca5a5',
    fontWeight: '600',
    display: 'block',
    marginBottom: '6px',
  },
  statValueAccent: {
    fontSize: '42px',
    fontWeight: '900',
    color: '#f87171',
    letterSpacing: '-1px',
  },
  statUnitAccent: {
    fontSize: '18px',
    color: '#fca5a5',
    fontWeight: '600',
    padding: '0 2px',
  },
  footerNote: {
    marginTop: '24px',
    fontSize: '12px',
    color: '#64748b',
    lineHeight: '1.5',
    wordBreak: 'keep-all',
  },
};
