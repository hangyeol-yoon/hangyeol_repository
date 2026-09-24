"""
프로젝트명: LAM 장비 센서 데이터 분석 및 이상 탐지
목적: 장비 로그 데이터에서 이상 징후 조기 발견

기술 스택:
- Python 3.x
- Pandas (데이터 처리)
- Matplotlib/Seaborn (시각화)
- NumPy (수치 계산)
"""

import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from datetime import datetime, timedelta

# ===== 1. 데이터 생성 (실제로는 장비 로그 파일 읽기) =====
def generate_sample_data(n_samples=1000):
    """
    실제 장비 로그 형태의 샘플 데이터 생성
    CSV 파일: timestamp, temperature, pressure, flow_rate, rf_power, status
    """
    np.random.seed(42)
    
    # 정상 범위
    base_temp = 60.0
    base_pressure = 5.0
    base_flow = 100.0
    base_power = 1000.0
    
    data = {
        'timestamp': [datetime.now() - timedelta(seconds=i*10) 
                     for i in range(n_samples)],
        'temperature': base_temp + np.random.normal(0, 2, n_samples),
        'pressure': base_pressure + np.random.normal(0, 0.3, n_samples),
        'flow_rate': base_flow + np.random.normal(0, 5, n_samples),
        'rf_power': base_power + np.random.normal(0, 20, n_samples),
    }
    
    # 이상치 주입 (장비 이상 시뮬레이션)
    anomaly_indices = [200, 201, 202, 550, 551, 800]
    for idx in anomaly_indices:
        data['temperature'][idx] += np.random.uniform(15, 25)
        data['pressure'][idx] += np.random.uniform(2, 4)
    
    df = pd.DataFrame(data)
    df['status'] = 'Normal'
    df.loc[anomaly_indices, 'status'] = 'Anomaly'
    
    return df

# ===== 2. 데이터 로드 및 전처리 =====
def load_and_preprocess(filepath=None):
    """
    실제 프로젝트: CSV 파일 읽기
    df = pd.read_csv('equipment_log_20250110.csv')
    """
    df = generate_sample_data()
    
    # 결측치 처리
    df = df.fillna(method='ffill')
    
    # 이동 평균 계산 (트렌드 파악)
    df['temp_ma'] = df['temperature'].rolling(window=20).mean()
    df['pressure_ma'] = df['pressure'].rolling(window=20).mean()
    
    return df

# ===== 3. 이상 탐지 알고리즘 =====
def detect_anomalies(df, column, threshold=3):
    """
    통계적 방법: 3-sigma rule
    실무: 장비마다 정상 범위가 있음
    """
    mean = df[column].mean()
    std = df[column].std()
    
    df[f'{column}_zscore'] = (df[column] - mean) / std
    df[f'{column}_anomaly'] = abs(df[f'{column}_zscore']) > threshold
    
    return df

# ===== 4. 시각화 =====
def visualize_equipment_data(df):
    """
    장비 엔지니어가 보는 대시보드 형태
    """
    fig, axes = plt.subplots(2, 2, figsize=(15, 10))
    fig.suptitle('Equipment Sensor Data Analysis - LAM Etcher', 
                 fontsize=16, fontweight='bold')
    
    # 온도 트렌드
    ax1 = axes[0, 0]
    ax1.plot(df['timestamp'], df['temperature'], 
             label='Temperature', alpha=0.6, linewidth=0.8)
    ax1.plot(df['timestamp'], df['temp_ma'], 
             label='Moving Avg', color='red', linewidth=2)
    anomaly_temp = df[df['temperature_anomaly'] == True]
    ax1.scatter(anomaly_temp['timestamp'], anomaly_temp['temperature'],
               color='red', s=100, marker='x', label='Anomaly', zorder=5)
    ax1.set_xlabel('Time')
    ax1.set_ylabel('Temperature (°C)')
    ax1.set_title('Chamber Temperature Monitoring')
    ax1.legend()
    ax1.grid(True, alpha=0.3)
    
    # 압력 트렌드
    ax2 = axes[0, 1]
    ax2.plot(df['timestamp'], df['pressure'], 
             label='Pressure', alpha=0.6, linewidth=0.8)
    ax2.plot(df['timestamp'], df['pressure_ma'], 
             label='Moving Avg', color='red', linewidth=2)
    anomaly_pressure = df[df['pressure_anomaly'] == True]
    ax2.scatter(anomaly_pressure['timestamp'], anomaly_pressure['pressure'],
               color='red', s=100, marker='x', label='Anomaly', zorder=5)
    ax2.set_xlabel('Time')
    ax2.set_ylabel('Pressure (Torr)')
    ax2.set_title('Chamber Pressure Monitoring')
    ax2.legend()
    ax2.grid(True, alpha=0.3)
    
    # 다변량 상관관계
    ax3 = axes[1, 0]
    scatter = ax3.scatter(df['temperature'], df['pressure'], 
                         c=df['rf_power'], cmap='viridis', alpha=0.6)
    ax3.set_xlabel('Temperature (°C)')
    ax3.set_ylabel('Pressure (Torr)')
    ax3.set_title('Temperature vs Pressure (colored by RF Power)')
    plt.colorbar(scatter, ax=ax3, label='RF Power (W)')
    
    # 이상치 통계
    ax4 = axes[1, 1]
    anomaly_counts = {
        'Temperature': df['temperature_anomaly'].sum(),
        'Pressure': df['pressure_anomaly'].sum(),
        'Flow Rate': df['flow_rate_anomaly'].sum()
    }
    ax4.bar(anomaly_counts.keys(), anomaly_counts.values(), 
            color=['red', 'orange', 'yellow'])
    ax4.set_ylabel('Anomaly Count')
    ax4.set_title('Detected Anomalies by Parameter')
    ax4.grid(True, alpha=0.3, axis='y')
    
    plt.tight_layout()
    plt.savefig('equipment_analysis.png', dpi=300, bbox_inches='tight')
    print("✅ 분석 결과 저장: equipment_analysis.png")

# ===== 5. 리포트 생성 =====
def generate_report(df):
    """
    장비 상태 리포트 - 실무에서 작성하는 형태
    """
    report = f"""
{'='*60}
장비 상태 분석 리포트
{'='*60}
분석 기간: {df['timestamp'].min()} ~ {df['timestamp'].max()}
총 데이터 포인트: {len(df)}개

[센서 통계]
┌─────────────────┬──────────┬──────────┬──────────┐
│ Parameter       │   Mean   │   Std    │  Range   │
├─────────────────┼──────────┼──────────┼──────────┤
│ Temperature(°C) │ {df['temperature'].mean():8.2f} │ {df['temperature'].std():8.2f} │ {df['temperature'].min():.1f}-{df['temperature'].max():.1f} │
│ Pressure (Torr) │ {df['pressure'].mean():8.2f} │ {df['pressure'].std():8.2f} │ {df['pressure'].min():.1f}-{df['pressure'].max():.1f} │
│ Flow Rate (sccm)│ {df['flow_rate'].mean():8.2f} │ {df['flow_rate'].std():8.2f} │ {df['flow_rate'].min():.1f}-{df['flow_rate'].max():.1f} │
│ RF Power (W)    │ {df['rf_power'].mean():8.2f} │ {df['rf_power'].std():8.2f} │ {df['rf_power'].min():.1f}-{df['rf_power'].max():.1f} │
└─────────────────┴──────────┴──────────┴──────────┘

[이상 탐지 결과]
- Temperature 이상: {df['temperature_anomaly'].sum()}건
- Pressure 이상: {df['pressure_anomaly'].sum()}건
- Flow Rate 이상: {df['flow_rate_anomaly'].sum()}건

[권장 조치사항]
{'- 온도 이상 감지: PM(Preventive Maintenance) 스케줄 확인 필요' if df['temperature_anomaly'].sum() > 5 else '- 정상 운영 중'}
{'- 압력 이상 감지: 진공 펌프 점검 권장' if df['pressure_anomaly'].sum() > 5 else ''}

{'='*60}
"""
    print(report)
    
    # 파일로 저장
    with open('equipment_report.txt', 'w', encoding='utf-8') as f:
        f.write(report)
    print("✅ 리포트 저장: equipment_report.txt")

# ===== 메인 실행 =====
def main():
    print("🔧 장비 데이터 분석 시작...")
    
    # 1. 데이터 로드
    df = load_and_preprocess()
    print(f"✅ 데이터 로드 완료: {len(df)}개 레코드")
    
    # 2. 이상 탐지
    df = detect_anomalies(df, 'temperature')
    df = detect_anomalies(df, 'pressure')
    df = detect_anomalies(df, 'flow_rate')
    print("✅ 이상 탐지 완료")
    
    # 3. 시각화
    visualize_equipment_data(df)
    
    # 4. 리포트 생성
    generate_report(df)
    
    print("\n✨ 분석 완료!")
    print("생성된 파일:")
    print("  - equipment_analysis.png (시각화)")
    print("  - equipment_report.txt (리포트)")

if __name__ == "__main__":
    main()