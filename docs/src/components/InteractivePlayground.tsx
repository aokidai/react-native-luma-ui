import React, { useState } from 'react';

// Google Material Design 3 SVG Icons
const MaterialHomeIcon = ({ filled = false, size = 22, color = 'currentColor' }: { filled?: boolean; size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth={filled ? 0 : 2} strokeLinecap="round" strokeLinejoin="round">
    {filled ? (
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    ) : (
      <>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </>
    )}
  </svg>
);

const MaterialSearchIcon = ({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7.5" />
    <line x1="21" y1="21" x2="16.5" y2="16.5" />
  </svg>
);

const MaterialNotificationsIcon = ({ filled = false, size = 22, color = 'currentColor' }: { filled?: boolean; size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth={filled ? 0 : 2} strokeLinecap="round" strokeLinejoin="round">
    {filled ? (
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    ) : (
      <>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </>
    )}
  </svg>
);

const MaterialSettingsIcon = ({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const MaterialArrowBackIcon = ({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const MaterialMoreVertIcon = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <circle cx="12" cy="5" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="12" cy="19" r="2" />
  </svg>
);

const MaterialPlusIcon = ({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const MaterialCalendarIcon = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const MaterialClockIcon = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

interface InteractivePlaygroundProps {
  componentId: string;
}

export const InteractivePlayground: React.FC<InteractivePlaygroundProps> = ({ componentId }) => {
  // Button State
  const [btnMode, setBtnMode] = useState<'filled' | 'elevated' | 'outlined' | 'text' | 'tonal'>('filled');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnClicks, setBtnClicks] = useState(0);

  // Slider State
  const [sliderVal, setSliderVal] = useState(65);
  const [showBubble, setShowBubble] = useState(true);

  // BottomSheet State
  const [sheetOpen, setSheetOpen] = useState(false);

  // Snackbar State
  const [snackOpen, setSnackOpen] = useState(false);

  // TextField State
  const [tfVal, setTfVal] = useState('');
  const [tfError, setTfError] = useState(false);

  // Checkbox State
  const [cbChecked, setCbChecked] = useState(true);
  const [cbShape, setCbShape] = useState<'square' | 'circle'>('square');

  // Switch State
  const [switchVal, setSwitchVal] = useState(true);

  // Card State
  const [cardType, setCardType] = useState<'elevated' | 'filled' | 'outlined'>('elevated');

  // Chip State
  const [chip1, setChip1] = useState(true);
  const [chip2, setChip2] = useState(false);
  const [chip3, setChip3] = useState(true);

  // Dialog State
  const [dialogOpen, setDialogOpen] = useState(false);

  // Badges State
  const [badgeCount, setBadgeCount] = useState(5);
  const [badgeDot, setBadgeDot] = useState(false);
  const [badgeVariant, setBadgeVariant] = useState<'error' | 'primary'>('error');

  // SegmentedButton State
  const [segVal, setSegVal] = useState('day');

  // NavigationBar State
  const [navIndex, setNavIndex] = useState(0);

  // AppBar State
  const [appBarTitle, setAppBarTitle] = useState('Chi tiết đơn hàng');
  const [appBarSubtitle, setAppBarSubtitle] = useState('Mã đơn: #LM-98214');
  const [appBarShowBack, setAppBarShowBack] = useState(true);
  const [appBarCenterTitle, setAppBarCenterTitle] = useState(false);
  const [appBarElevated, setAppBarElevated] = useState(false);
  const [appBarToast, setAppBarToast] = useState('');

  // Scaffold State
  const [scaffoldShowAppBar, setScaffoldShowAppBar] = useState(true);
  const [scaffoldShowFab, setScaffoldShowFab] = useState(true);
  const [scaffoldShowBottomNav, setScaffoldShowBottomNav] = useState(true);
  const [scaffoldEdgeToEdge, setScaffoldEdgeToEdge] = useState(false);

  // DateTimePicker State
  const [pickerMode, setPickerMode] = useState<'date' | 'time' | 'datetime'>('date');
  const [selectedDay, setSelectedDay] = useState(15);
  const [selectedHour, setSelectedHour] = useState(14);
  const [selectedMinute, setSelectedMinute] = useState(30);
  const [picker24Hour, setPicker24Hour] = useState(true);
  const [pickerExpanded, setPickerExpanded] = useState(true);

  // Preview local theme override: 'auto' | 'light' | 'dark'
  const [previewTheme, setPreviewTheme] = useState<'auto' | 'light' | 'dark'>('auto');

  return (
    <div
      className="playground-card"
      data-theme={previewTheme === 'auto' ? undefined : previewTheme}
    >
      <div className="playground-preview-header">
        <span className="playground-title">Trình diễn tương tác (Interactive Preview)</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            type="button"
            className="m3-icon-button"
            style={{ width: 28, height: 28, fontSize: 13 }}
            title={`Chế độ xem: ${previewTheme === 'auto' ? 'Theo hệ thống' : previewTheme === 'dark' ? 'Chế độ Tối' : 'Chế độ Sáng'}`}
            onClick={() => {
              setPreviewTheme((t) => (t === 'auto' ? 'light' : t === 'light' ? 'dark' : 'auto'));
            }}
          >
            {previewTheme === 'light' ? '☀️' : previewTheme === 'dark' ? '🌙' : '🌓'}
          </button>
          <span style={{ fontSize: 12, opacity: 0.7 }}>
            {previewTheme === 'auto' ? 'Theo tài liệu' : previewTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </span>
        </div>
      </div>

      <div className="playground-body" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* BUTTON PREVIEW */}
        {componentId === 'button' && (
          <div style={{ textAlign: 'center' }}>
            <button
              disabled={btnDisabled}
              onClick={() => !btnLoading && setBtnClicks((c) => c + 1)}
              style={{
                height: 44,
                padding: '0 24px',
                borderRadius: 9999,
                fontSize: 14,
                fontWeight: 600,
                cursor: btnDisabled ? 'not-allowed' : 'pointer',
                opacity: btnDisabled ? 0.38 : 1,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
                border:
                  btnMode === 'outlined'
                    ? '1px solid var(--md-sys-color-outline)'
                    : 'none',
                backgroundColor:
                  btnMode === 'filled'
                    ? 'var(--md-sys-color-primary)'
                    : btnMode === 'elevated'
                      ? 'var(--md-sys-color-surface-container-low)'
                      : btnMode === 'tonal'
                        ? 'var(--md-sys-color-secondary-container)'
                        : 'transparent',
                color:
                  btnMode === 'filled'
                    ? 'var(--md-sys-color-on-primary)'
                    : btnMode === 'elevated'
                      ? 'var(--md-sys-color-primary)'
                      : btnMode === 'tonal'
                        ? 'var(--md-sys-color-on-secondary-container)'
                        : 'var(--md-sys-color-primary)',
                boxShadow:
                  btnMode === 'elevated'
                    ? 'var(--md-sys-elevation-1)'
                    : 'none',
              }}
            >
              {btnLoading ? (
                <span>Đang tải...</span>
              ) : (
                <>
                  <span>Nhấn tôi ({btnClicks})</span>
                </>
              )}
            </button>
            <div style={{ marginTop: 12, fontSize: 12, color: 'var(--md-sys-color-on-surface-variant)' }}>
              Đã bấm: {btnClicks} lần • Chế độ: <code>{btnMode}</code>
            </div>
          </div>
        )}

        {/* SLIDER PREVIEW */}
        {componentId === 'slider' && (
          <div style={{ width: '100%', maxWidth: 360, textAlign: 'center' }}>
            {showBubble && (
              <div
                style={{
                  display: 'inline-block',
                  background: 'var(--md-sys-color-primary)',
                  color: 'var(--md-sys-color-on-primary)',
                  padding: '3px 10px',
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 700,
                  marginBottom: 10,
                  boxShadow: 'var(--md-sys-elevation-2)',
                }}
              >
                {sliderVal}%
              </div>
            )}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderVal}
              onChange={(e) => setSliderVal(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: 'var(--md-sys-color-primary)',
                height: 8,
                cursor: 'pointer',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, opacity: 0.6, marginTop: 4 }}>
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        )}

        {/* BOTTOM SHEET PREVIEW */}
        {componentId === 'bottom-sheet' && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => setSheetOpen(true)}
              style={{
                padding: '10px 24px',
                borderRadius: 9999,
                background: 'var(--md-sys-color-primary)',
                color: 'var(--md-sys-color-on-primary)',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Mở BottomSheet Xem Thử
            </button>

            {sheetOpen && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.45)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  zIndex: 20,
                  animation: 'fadeIn 0.2s ease',
                }}
                onClick={() => setSheetOpen(false)}
              >
                <div
                  style={{
                    width: '100%',
                    maxWidth: 420,
                    backgroundColor: 'var(--md-sys-color-surface-container-low)',
                    borderTopLeftRadius: 28,
                    borderTopRightRadius: 28,
                    padding: '12px 24px 28px 24px',
                    boxShadow: 'var(--md-sys-elevation-4)',
                    color: 'var(--md-sys-color-on-surface)',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    style={{
                      width: 36,
                      height: 4,
                      borderRadius: 2,
                      background: 'var(--md-sys-color-outline-variant)',
                      margin: '0 auto 16px auto',
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <h4 style={{ fontSize: 18, fontWeight: 700 }}>Tùy chọn thao tác</h4>
                    <button
                      onClick={() => setSheetOpen(false)}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        fontSize: 13,
                        color: 'var(--md-sys-color-primary)',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      Đóng
                    </button>
                  </div>
                  <p style={{ fontSize: 13.5, color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.5 }}>
                    BottomSheet chuẩn Luma UI với góc bo tròn 28dp và scrim đè mờ toàn phần.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SNACKBAR PREVIEW */}
        {componentId === 'snackbar' && (
          <div style={{ textAlign: 'center', width: '100%' }}>
            <button
              onClick={() => setSnackOpen(true)}
              style={{
                padding: '10px 24px',
                borderRadius: 9999,
                background: 'var(--md-sys-color-primary)',
                color: 'var(--md-sys-color-on-primary)',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Kích hoạt Snackbar
            </button>

            {snackOpen && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 16,
                  left: 20,
                  right: 20,
                  maxWidth: 400,
                  margin: '0 auto',
                  backgroundColor: 'var(--md-sys-color-inverse-surface)',
                  color: 'var(--md-sys-color-inverse-on-surface)',
                  padding: '14px 18px',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--md-sys-elevation-3)',
                }}
              >
                <span style={{ fontSize: 13.5 }}>Đã lưu tài liệu thành công.</span>
                <button
                  onClick={() => setSnackOpen(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--md-sys-color-inverse-primary)',
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  HOÀN TÁC
                </button>
              </div>
            )}
          </div>
        )}

        {/* TEXT FIELD PREVIEW */}
        {componentId === 'text-field' && (
          <div style={{ width: '100%', maxWidth: 320 }}>
            <div
              style={{
                position: 'relative',
                border: tfError
                  ? '2px solid var(--md-sys-color-error)'
                  : '1px solid var(--md-sys-color-outline)',
                borderRadius: 8,
                padding: '8px 14px',
                backgroundColor: 'var(--md-sys-color-surface-container-highest)',
              }}
            >
              <label
                style={{
                  fontSize: 11,
                  color: tfError
                    ? 'var(--md-sys-color-error)'
                    : 'var(--md-sys-color-primary)',
                  fontWeight: 600,
                  display: 'block',
                }}
              >
                Họ và tên
              </label>
              <input
                type="text"
                value={tfVal}
                onChange={(e) => setTfVal(e.target.value)}
                placeholder="Nhập tên của bạn..."
                style={{
                  width: '100%',
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: 14,
                  color: 'var(--md-sys-color-on-surface)',
                  marginTop: 2,
                }}
              />
            </div>
            {tfError ? (
              <span style={{ fontSize: 11, color: 'var(--md-sys-color-error)', display: 'block', marginTop: 4 }}>
                Trường này không được để trống
              </span>
            ) : (
              <span style={{ fontSize: 11, color: 'var(--md-sys-color-on-surface-variant)', display: 'block', marginTop: 4 }}>
                Nhập đầy đủ họ và tên theo CCCD
              </span>
            )}
          </div>
        )}

        {/* CHECKBOX PREVIEW */}
        {componentId === 'checkbox' && (
          <div
            onClick={() => setCbChecked(!cbChecked)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 18px',
              borderRadius: 12,
              backgroundColor: 'var(--md-sys-color-surface-container-low)',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: cbShape === 'circle' ? '50%' : 4,
                backgroundColor: cbChecked ? 'var(--md-sys-color-primary)' : 'transparent',
                border: cbChecked ? 'none' : '2px solid var(--md-sys-color-outline)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--md-sys-color-on-primary)',
                transition: 'all 0.18s ease',
              }}
            >
              {cbChecked && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Tùy chọn tự động sao lưu</div>
              <div style={{ fontSize: 12, color: 'var(--md-sys-color-on-surface-variant)' }}>
                {cbChecked ? 'Đang bật sao lưu định kỳ' : 'Chưa bật tính năng này'}
              </div>
            </div>
          </div>
        )}

        {/* SWITCH PREVIEW */}
        {componentId === 'switch' && (
          <div
            onClick={() => setSwitchVal(!switchVal)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 16,
              padding: '14px 20px',
              borderRadius: 14,
              backgroundColor: 'var(--md-sys-color-surface-container-low)',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Chế độ tối ưu hóa hiệu năng</div>
              <div style={{ fontSize: 12, color: 'var(--md-sys-color-on-surface-variant)' }}>
                {switchVal ? 'Đang kích hoạt' : 'Đã vô hiệu hóa'}
              </div>
            </div>
            <div
              style={{
                width: 52,
                height: 32,
                borderRadius: 16,
                backgroundColor: switchVal ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-surface-container-highest)',
                border: switchVal ? 'none' : '2px solid var(--md-sys-color-outline)',
                position: 'relative',
                transition: 'background-color 0.2s cubic-bezier(0.2, 0, 0, 1)',
              }}
            >
              <div
                style={{
                  width: switchVal ? 24 : 16,
                  height: switchVal ? 24 : 16,
                  borderRadius: '50%',
                  backgroundColor: switchVal ? 'var(--md-sys-color-on-primary)' : 'var(--md-sys-color-outline)',
                  position: 'absolute',
                  top: '50%',
                  left: switchVal ? 24 : 6,
                  transform: 'translateY(-50%)',
                  transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
                  boxShadow: switchVal ? 'var(--md-sys-elevation-1)' : 'none',
                }}
              />
            </div>
          </div>
        )}

        {/* CARD PREVIEW */}
        {componentId === 'card' && (
          <div
            style={{
              width: '100%',
              maxWidth: 360,
              padding: 20,
              borderRadius: 16,
              textAlign: 'left',
              backgroundColor:
                cardType === 'filled'
                  ? 'var(--md-sys-color-surface-container-highest)'
                  : 'var(--md-sys-color-surface-container-low)',
              border:
                cardType === 'outlined'
                  ? '1px solid var(--md-sys-color-outline-variant)'
                  : 'none',
              boxShadow:
                cardType === 'elevated'
                  ? 'var(--md-sys-elevation-1)'
                  : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--md-sys-color-primary)', textTransform: 'uppercase' }}>
                Thẻ Luma UI • {cardType}
              </span>
              <span style={{ fontSize: 11, background: '#E8DEF8', color: '#4A4458', padding: '2px 8px', borderRadius: 9999 }}>
                Hoàn thành
              </span>
            </div>
            <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Báo cáo phân tích quý 3</h4>
            <p style={{ fontSize: 13, color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.5, marginBottom: 16 }}>
              Giao diện tuân thủ tiêu chuẩn Luma UI đem lại trải nghiệm cao cấp cho người dùng React Native.
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button
                style={{
                  padding: '6px 14px',
                  borderRadius: 9999,
                  background: 'var(--md-sys-color-primary)',
                  color: 'var(--md-sys-color-on-primary)',
                  border: 'none',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Khám phá
              </button>
            </div>
          </div>
        )}

        {/* CHIP PREVIEW */}
        {componentId === 'chip' && (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => setChip1(!chip1)}
              style={{
                height: 32,
                padding: '0 14px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                border: chip1 ? 'none' : '1px solid var(--md-sys-color-outline)',
                backgroundColor: chip1 ? 'var(--md-sys-color-secondary-container)' : 'transparent',
                color: chip1 ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {chip1 && <span>✓</span>}
              <span>Bộ lọc: React Native</span>
            </button>

            <button
              onClick={() => setChip2(!chip2)}
              style={{
                height: 32,
                padding: '0 14px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                border: chip2 ? 'none' : '1px solid var(--md-sys-color-outline)',
                backgroundColor: chip2 ? 'var(--md-sys-color-secondary-container)' : 'transparent',
                color: chip2 ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {chip2 && <span>✓</span>}
              <span>TypeScript</span>
            </button>

            <button
              onClick={() => setChip3(!chip3)}
              style={{
                height: 32,
                padding: '0 14px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                border: chip3 ? 'none' : '1px solid var(--md-sys-color-outline)',
                backgroundColor: chip3 ? 'var(--md-sys-color-secondary-container)' : 'transparent',
                color: chip3 ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {chip3 && <span>✓</span>}
              <span>Luma UI</span>
            </button>
          </div>
        )}

        {/* DIALOG PREVIEW */}
        {componentId === 'dialog' && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => setDialogOpen(true)}
              style={{
                padding: '10px 24px',
                borderRadius: 9999,
                background: 'var(--md-sys-color-primary)',
                color: 'var(--md-sys-color-on-primary)',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Mở Hộp Thoại Dialog
            </button>

            {dialogOpen && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 25,
                  padding: 20,
                }}
                onClick={() => setDialogOpen(false)}
              >
                <div
                  style={{
                    backgroundColor: 'var(--md-sys-color-surface-container-high)',
                    borderRadius: 28,
                    padding: 24,
                    maxWidth: 320,
                    width: '100%',
                    boxShadow: 'var(--md-sys-elevation-3)',
                    textAlign: 'left',
                    color: 'var(--md-sys-color-on-surface)',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Xác nhận xóa tài khoản?</h4>
                  <p style={{ fontSize: 13.5, color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.5, marginBottom: 20 }}>
                    Thao tác này sẽ xóa toàn bộ dữ liệu dự án của bạn và không thể phục hồi lại.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                    <button
                      onClick={() => setDialogOpen(false)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--md-sys-color-primary)',
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: 'pointer',
                      }}
                    >
                      Hủy bỏ
                    </button>
                    <button
                      onClick={() => setDialogOpen(false)}
                      style={{
                        padding: '6px 16px',
                        borderRadius: 9999,
                        background: 'var(--md-sys-color-primary)',
                        color: 'var(--md-sys-color-on-primary)',
                        border: 'none',
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: 'pointer',
                      }}
                    >
                      Xác nhận
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* BADGES PREVIEW */}
        {componentId === 'badges' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: '100%', maxWidth: 440 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 36, flexWrap: 'wrap' }}>
              {/* Main Badge Anchor (Icon button with Badge) */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 26,
                      backgroundColor: 'var(--md-sys-color-surface-container-highest)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--md-sys-color-on-surface)',
                      boxShadow: 'var(--md-sys-elevation-1)',
                      transition: 'transform 0.15s ease',
                    }}
                  >
                    <MaterialNotificationsIcon size={24} color="var(--md-sys-color-on-surface)" />
                  </div>
                  {badgeDot ? (
                    <div
                      style={{
                        position: 'absolute',
                        top: 2,
                        right: 2,
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: badgeVariant === 'error' ? 'var(--md-sys-color-error)' : 'var(--md-sys-color-primary)',
                        boxShadow: '0 0 0 2px var(--md-sys-color-surface)',
                      }}
                    />
                  ) : badgeCount > 0 ? (
                    <div
                      style={{
                        position: 'absolute',
                        top: -3,
                        right: -6,
                        backgroundColor:
                          badgeVariant === 'error'
                            ? 'var(--md-sys-color-error)'
                            : 'var(--md-sys-color-primary)',
                        color:
                          badgeVariant === 'error'
                            ? 'var(--md-sys-color-on-error)'
                            : 'var(--md-sys-color-on-primary)',
                        borderRadius: 12,
                        fontSize: 11,
                        fontWeight: 700,
                        padding: '1px 6px',
                        minWidth: 18,
                        textAlign: 'center',
                        boxShadow: '0 0 0 2px var(--md-sys-color-surface)',
                      }}
                    >
                      {badgeCount > 99 ? '99+' : badgeCount}
                    </div>
                  ) : null}
                </div>
                <span style={{ fontSize: 12, color: 'var(--md-sys-color-on-surface-variant)' }}>
                  {badgeDot ? 'Dạng chấm (Dot)' : `Số lượng: ${badgeCount}`}
                </span>
              </div>

              {/* Secondary Badge Anchor: User Avatar */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 26,
                      background: 'linear-gradient(135deg, var(--md-sys-color-primary), var(--md-sys-color-tertiary))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: 18,
                      boxShadow: 'var(--md-sys-elevation-1)',
                    }}
                  >
                    LM
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: 1,
                      right: 1,
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: '#10B981',
                      boxShadow: '0 0 0 2px var(--md-sys-color-surface)',
                    }}
                  />
                </div>
                <span style={{ fontSize: 12, color: 'var(--md-sys-color-on-surface-variant)' }}>
                  Trạng thái (Online)
                </span>
              </div>
            </div>

            {/* Stepper with clear contrast in both light & dark */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 18px',
                borderRadius: 12,
                backgroundColor: 'var(--md-sys-color-surface-container)',
                border: '1px solid var(--md-sys-color-outline-variant)',
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--md-sys-color-on-surface)' }}>
                Tăng giảm số huy hiệu:
              </span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setBadgeCount((c) => Math.max(0, c - 1))}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    border: '1px solid var(--md-sys-color-outline-variant)',
                    backgroundColor: 'var(--md-sys-color-surface-container-high)',
                    color: 'var(--md-sys-color-on-surface)',
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  -1
                </button>
                <button
                  type="button"
                  onClick={() => setBadgeCount((c) => c + 1)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    border: '1px solid var(--md-sys-color-outline-variant)',
                    backgroundColor: 'var(--md-sys-color-surface-container-high)',
                    color: 'var(--md-sys-color-on-surface)',
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  +1
                </button>
                <button
                  type="button"
                  onClick={() => setBadgeCount(120)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    border: '1px solid var(--md-sys-color-outline-variant)',
                    backgroundColor: 'var(--md-sys-color-surface-container-high)',
                    color: 'var(--md-sys-color-on-surface)',
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  99+
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SEGMENTED BUTTONS PREVIEW */}
        {componentId === 'segmented-buttons' && (
          <div
            style={{
              display: 'inline-flex',
              borderRadius: 9999,
              border: '1px solid var(--md-sys-color-outline)',
              overflow: 'hidden',
            }}
          >
            {[
              { val: 'day', label: 'Ngày' },
              { val: 'week', label: 'Tuần' },
              { val: 'month', label: 'Tháng' },
            ].map((btn) => {
              const active = segVal === btn.val;
              return (
                <button
                  key={btn.val}
                  type="button"
                  onClick={() => setSegVal(btn.val)}
                  style={{
                    padding: '8px 20px',
                    border: 'none',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    backgroundColor: active
                      ? 'var(--md-sys-color-secondary-container)'
                      : 'transparent',
                    color: active
                      ? 'var(--md-sys-color-on-secondary-container)'
                      : 'var(--md-sys-color-on-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'all 0.15s ease',
                  }}
                >
                  {active && <span>✓</span>}
                  <span>{btn.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* NAVIGATION BAR PREVIEW */}
        {componentId === 'navigation-bar' && (
          <div
            style={{
              width: '100%',
              maxWidth: 420,
              backgroundColor: 'var(--md-sys-color-surface-container)',
              borderRadius: 24,
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-around',
              boxShadow: 'var(--md-sys-elevation-2)',
              border: '1px solid var(--md-sys-color-outline-variant)',
            }}
          >
            {[
              {
                idx: 0,
                label: 'Trang chủ',
                icon: (act: boolean) => (
                  <MaterialHomeIcon
                    filled={act}
                    size={22}
                    color={act ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface-variant)'}
                  />
                ),
              },
              {
                idx: 1,
                label: 'Tìm kiếm',
                icon: (act: boolean) => (
                  <MaterialSearchIcon
                    size={22}
                    color={act ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface-variant)'}
                  />
                ),
              },
              {
                idx: 2,
                label: 'Thông báo',
                badge: 3,
                icon: (act: boolean) => (
                  <MaterialNotificationsIcon
                    filled={act}
                    size={22}
                    color={act ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface-variant)'}
                  />
                ),
              },
              {
                idx: 3,
                label: 'Cài đặt',
                icon: (act: boolean) => (
                  <MaterialSettingsIcon
                    size={22}
                    color={act ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface-variant)'}
                  />
                ),
              },
            ].map((item) => {
              const active = navIndex === item.idx;
              return (
                <button
                  key={item.idx}
                  type="button"
                  onClick={() => setNavIndex(item.idx)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: 16,
                    color: 'inherit',
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <div
                      style={{
                        width: 64,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: active
                          ? 'var(--md-sys-color-secondary-container)'
                          : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
                      }}
                    >
                      {item.icon(active)}
                    </div>
                    {item.badge && (
                      <span
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 12,
                          backgroundColor: 'var(--md-sys-color-error)',
                          color: 'var(--md-sys-color-on-error)',
                          fontSize: 10,
                          fontWeight: 700,
                          minWidth: 16,
                          height: 16,
                          lineHeight: '16px',
                          borderRadius: 8,
                          textAlign: 'center',
                          padding: '0 4px',
                          boxShadow: '0 0 0 2px var(--md-sys-color-surface-container)',
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: active ? 700 : 500,
                      color: active
                        ? 'var(--md-sys-color-on-surface)'
                        : 'var(--md-sys-color-on-surface-variant)',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* APP BAR PREVIEW */}
        {componentId === 'app-bar' && (
          <div style={{ width: '100%', maxWidth: 440 }}>
            <div
              style={{
                width: '100%',
                backgroundColor: 'var(--md-sys-color-surface-container)',
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid var(--md-sys-color-outline-variant)',
                boxShadow: appBarElevated ? 'var(--md-sys-elevation-2)' : 'none',
                transition: 'box-shadow 0.2s ease',
              }}
            >
              <div
                style={{
                  height: 64,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 16px',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                {/* Left side */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: appBarCenterTitle ? '0 0 auto' : '1 1 auto', minWidth: 0 }}>
                  {appBarShowBack && (
                    <button
                      type="button"
                      onClick={() => setAppBarToast('Đã bấm: Quay lại (Back)')}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        border: 'none',
                        background: 'transparent',
                        color: 'var(--md-sys-color-on-surface)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                      title="Quay lại"
                    >
                      <MaterialArrowBackIcon size={22} color="var(--md-sys-color-on-surface)" />
                    </button>
                  )}
                  {!appBarCenterTitle && (
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--md-sys-color-on-surface)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                        {appBarTitle}
                      </div>
                      {appBarSubtitle && (
                        <div style={{ fontSize: 12, color: 'var(--md-sys-color-on-surface-variant)' }}>
                          {appBarSubtitle}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Center Title */}
                {appBarCenterTitle && (
                  <div style={{ flex: 1, textAlign: 'center', overflow: 'hidden' }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--md-sys-color-on-surface)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                      {appBarTitle}
                    </div>
                    {appBarSubtitle && (
                      <div style={{ fontSize: 12, color: 'var(--md-sys-color-on-surface-variant)' }}>
                        {appBarSubtitle}
                      </div>
                    )}
                  </div>
                )}

                {/* Right Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => setAppBarToast('Đã bấm: Tìm kiếm')}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--md-sys-color-on-surface-variant)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    title="Tìm kiếm"
                  >
                    <MaterialSearchIcon size={20} color="var(--md-sys-color-on-surface-variant)" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setAppBarToast('Đã bấm: Tùy chọn khác')}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--md-sys-color-on-surface-variant)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    title="Tùy chọn"
                  >
                    <MaterialMoreVertIcon size={20} color="var(--md-sys-color-on-surface-variant)" />
                  </button>
                </div>
              </div>

              {/* Sample Content Area */}
              <div
                style={{
                  padding: '16px 20px',
                  backgroundColor: 'var(--md-sys-color-surface)',
                  borderTop: '1px solid var(--md-sys-color-outline-variant)',
                  fontSize: 13,
                  color: 'var(--md-sys-color-on-surface-variant)',
                }}
              >
                {appBarToast ? (
                  <span style={{ color: 'var(--md-sys-color-primary)', fontWeight: 600 }}>
                    ⚡ {appBarToast}
                  </span>
                ) : (
                  <span>Nội dung màn hình cuộn bên dưới AppBar chuẩn Material 3.</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SCAFFOLD PREVIEW */}
        {componentId === 'scaffold' && (
          <div style={{ width: '100%', maxWidth: 340, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 300,
                height: 440,
                borderRadius: 28,
                backgroundColor: 'var(--md-sys-color-surface)',
                border: '4px solid var(--md-sys-color-outline-variant)',
                boxShadow: 'var(--md-sys-elevation-3)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Status Bar */}
              <div
                style={{
                  height: 32,
                  padding: '0 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'var(--md-sys-color-on-surface)',
                  backgroundColor: scaffoldEdgeToEdge
                    ? 'transparent'
                    : 'var(--md-sys-color-surface-container)',
                }}
              >
                <span>09:41</span>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 18.25A11.93 11.93 0 0 1 0 12C0 5.37 5.37 0 12 0s12 5.37 12 12c0 2.27-.63 4.39-1.72 6.21l-.63-.64C22.26 16.07 23 14.12 23 12c0-4.97-4.03-9-9-9z" />
                  </svg>
                  <svg width="14" height="10" viewBox="0 0 24 14" fill="currentColor">
                    <rect x="0" y="0" width="20" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                    <rect x="2" y="2" width="14" height="10" rx="1" fill="currentColor" />
                    <path d="M22 4v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* AppBar Slot */}
              {scaffoldShowAppBar && (
                <div
                  style={{
                    height: 48,
                    padding: '0 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'var(--md-sys-color-surface-container)',
                    borderBottom: '1px solid var(--md-sys-color-outline-variant)',
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--md-sys-color-on-surface)' }}>
                    Trang chủ Luma
                  </span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <MaterialSearchIcon size={18} color="var(--md-sys-color-on-surface-variant)" />
                  </div>
                </div>
              )}

              {/* Main Content Area */}
              <div
                style={{
                  flex: 1,
                  padding: 14,
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <div
                  style={{
                    padding: 12,
                    borderRadius: 12,
                    backgroundColor: 'var(--md-sys-color-surface-container-low)',
                    border: '1px solid var(--md-sys-color-outline-variant)',
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--md-sys-color-primary)', marginBottom: 4 }}>
                    Khung sườn ứng dụng
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.4 }}>
                    Scaffold tự động kết nối AppBar, Status Bar, Bottom Bar và FAB slot.
                  </div>
                </div>

                <div
                  style={{
                    padding: 12,
                    borderRadius: 12,
                    backgroundColor: 'var(--md-sys-color-surface-container-low)',
                    border: '1px solid var(--md-sys-color-outline-variant)',
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--md-sys-color-on-surface)', marginBottom: 4 }}>
                    Tràn viền màn hình
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--md-sys-color-on-surface-variant)' }}>
                    {scaffoldEdgeToEdge ? 'Bật Edge-to-Edge tràn viền mượt mà' : 'Đang dùng Safe Area chuẩn'}
                  </div>
                </div>
              </div>

              {/* Floating Action Button (FAB) Slot */}
              {scaffoldShowFab && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: scaffoldShowBottomNav ? 66 : 16,
                    right: 16,
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    backgroundColor: 'var(--md-sys-color-primary-container)',
                    color: 'var(--md-sys-color-on-primary-container)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--md-sys-elevation-3)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <MaterialPlusIcon size={20} color="var(--md-sys-color-on-primary-container)" />
                </div>
              )}

              {/* Bottom Navigation Bar Slot */}
              {scaffoldShowBottomNav && (
                <div
                  style={{
                    height: 52,
                    backgroundColor: 'var(--md-sys-color-surface-container)',
                    borderTop: '1px solid var(--md-sys-color-outline-variant)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    padding: '0 8px',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <MaterialHomeIcon filled size={18} color="var(--md-sys-color-primary)" />
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--md-sys-color-primary)' }}>Chính</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <MaterialSearchIcon size={18} color="var(--md-sys-color-on-surface-variant)" />
                    <span style={{ fontSize: 10, color: 'var(--md-sys-color-on-surface-variant)' }}>Tìm</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <MaterialSettingsIcon size={18} color="var(--md-sys-color-on-surface-variant)" />
                    <span style={{ fontSize: 10, color: 'var(--md-sys-color-on-surface-variant)' }}>Cài đặt</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* DATE TIME PICKER PREVIEW */}
        {componentId === 'date-time-picker' && (
          <div style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Input Trigger Field */}
            <div
              onClick={() => setPickerExpanded(!pickerExpanded)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 12,
                backgroundColor: 'var(--md-sys-color-surface-container-high)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {pickerMode === 'time' ? (
                  <MaterialClockIcon size={22} color="var(--md-sys-color-primary)" />
                ) : (
                  <MaterialCalendarIcon size={22} color="var(--md-sys-color-primary)" />
                )}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--md-sys-color-primary)' }}>
                    {pickerMode === 'date' ? 'Ngày được chọn' : pickerMode === 'time' ? 'Giờ được chọn' : 'Thời gian đã chọn'}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--md-sys-color-on-surface)' }}>
                    {pickerMode === 'date' && `Ngày ${selectedDay} Tháng 10, 2026`}
                    {pickerMode === 'time' && `${String(selectedHour).padStart(2, '0')}:${String(selectedMinute).padStart(2, '0')} ${picker24Hour ? '(24h)' : selectedHour >= 12 ? 'PM' : 'AM'}`}
                    {pickerMode === 'datetime' && `Ngày ${selectedDay}/10/2026 • ${String(selectedHour).padStart(2, '0')}:${String(selectedMinute).padStart(2, '0')}`}
                  </div>
                </div>
              </div>
              <span style={{ fontSize: 12, color: 'var(--md-sys-color-primary)', fontWeight: 600 }}>
                {pickerExpanded ? 'Thu gọn ▲' : 'Mở lịch ▼'}
              </span>
            </div>

            {/* Interactive Inline Picker */}
            {pickerExpanded && (
              <div
                style={{
                  padding: 16,
                  borderRadius: 20,
                  backgroundColor: 'var(--md-sys-color-surface-container)',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  boxShadow: 'var(--md-sys-elevation-2)',
                }}
              >
                {/* Header with Quick Presets */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--md-sys-color-on-surface)' }}>
                    Tháng 10, 2026
                  </span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {['Hôm nay', 'Ngày mai'].map((label, i) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setSelectedDay(i === 0 ? 11 : 12)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: 8,
                          fontSize: 11,
                          fontWeight: 600,
                          border: '1px solid var(--md-sys-color-outline-variant)',
                          backgroundColor: 'var(--md-sys-color-surface-container-high)',
                          color: 'var(--md-sys-color-on-surface)',
                          cursor: 'pointer',
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calendar Grid (when date or datetime) */}
                {pickerMode !== 'time' && (
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: 6 }}>
                      {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d) => (
                        <span key={d} style={{ fontSize: 11, fontWeight: 600, color: 'var(--md-sys-color-on-surface-variant)' }}>
                          {d}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center' }}>
                      {[null, null, null].map((_, i) => (
                        <div key={`blank-${i}`} style={{ height: 32 }} />
                      ))}
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                        const isSelected = selectedDay === day;
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => setSelectedDay(day)}
                            style={{
                              height: 32,
                              borderRadius: 16,
                              border: 'none',
                              backgroundColor: isSelected
                                ? 'var(--md-sys-color-primary)'
                                : 'transparent',
                              color: isSelected
                                ? 'var(--md-sys-color-on-primary)'
                                : 'var(--md-sys-color-on-surface)',
                              fontSize: 12,
                              fontWeight: isSelected ? 700 : 500,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Time selection (when time or datetime) */}
                {pickerMode !== 'date' && (
                  <div style={{ marginTop: pickerMode === 'datetime' ? 14 : 0, paddingTop: pickerMode === 'datetime' ? 12 : 0, borderTop: pickerMode === 'datetime' ? '1px solid var(--md-sys-color-outline-variant)' : 'none' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: 8, textAlign: 'center' }}>
                      Chọn thời gian ({picker24Hour ? '24h' : '12h'}):
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                      {/* Hour */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <button
                          type="button"
                          onClick={() => setSelectedHour((h) => (h > 0 ? h - 1 : 23))}
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 6,
                            border: '1px solid var(--md-sys-color-outline-variant)',
                            backgroundColor: 'var(--md-sys-color-surface-container-high)',
                            color: 'var(--md-sys-color-on-surface)',
                            cursor: 'pointer',
                            fontWeight: 700,
                          }}
                        >
                          -
                        </button>
                        <span style={{ fontSize: 16, fontWeight: 700, minWidth: 28, textAlign: 'center', color: 'var(--md-sys-color-on-surface)' }}>
                          {String(selectedHour).padStart(2, '0')}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedHour((h) => (h < 23 ? h + 1 : 0))}
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 6,
                            border: '1px solid var(--md-sys-color-outline-variant)',
                            backgroundColor: 'var(--md-sys-color-surface-container-high)',
                            color: 'var(--md-sys-color-on-surface)',
                            cursor: 'pointer',
                            fontWeight: 700,
                          }}
                        >
                          +
                        </button>
                      </div>
                      <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--md-sys-color-on-surface)' }}>:</span>
                      {/* Minute */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <button
                          type="button"
                          onClick={() => setSelectedMinute((m) => (m >= 5 ? m - 5 : 55))}
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 6,
                            border: '1px solid var(--md-sys-color-outline-variant)',
                            backgroundColor: 'var(--md-sys-color-surface-container-high)',
                            color: 'var(--md-sys-color-on-surface)',
                            cursor: 'pointer',
                            fontWeight: 700,
                          }}
                        >
                          -
                        </button>
                        <span style={{ fontSize: 16, fontWeight: 700, minWidth: 28, textAlign: 'center', color: 'var(--md-sys-color-on-surface)' }}>
                          {String(selectedMinute).padStart(2, '0')}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedMinute((m) => (m <= 50 ? m + 5 : 0))}
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 6,
                            border: '1px solid var(--md-sys-color-outline-variant)',
                            backgroundColor: 'var(--md-sys-color-surface-container-high)',
                            color: 'var(--md-sys-color-on-surface)',
                            cursor: 'pointer',
                            fontWeight: 700,
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* DEFAULT PREVIEW FALLBACK (Only for unknown components) */}
        {![
          'button',
          'slider',
          'bottom-sheet',
          'snackbar',
          'text-field',
          'checkbox',
          'switch',
          'card',
          'chip',
          'dialog',
          'badges',
          'segmented-buttons',
          'navigation-bar',
          'app-bar',
          'scaffold',
          'date-time-picker',
        ].includes(componentId) && (
            <div
              style={{
                padding: 24,
                borderRadius: 16,
                background: 'var(--md-sys-color-surface-container)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                textAlign: 'center',
                maxWidth: 360,
                width: '100%',
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>📱</div>
              <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
                {componentId.replace('-', ' ').toUpperCase()}
              </h4>
              <p style={{ fontSize: 13, color: 'var(--md-sys-color-on-surface-variant)' }}>
                Component đã sẵn sàng sử dụng trong ứng dụng React Native với đầy đủ props và Luma UI tokens.
              </p>
            </div>
          )}
      </div>

      {/* CONTROLS BAR */}
      {componentId === 'button' && (
        <div className="playground-controls">
          <div className="control-chips-group">
            <span className="control-label">Chế độ (Mode):</span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {(['filled', 'elevated', 'tonal', 'outlined', 'text'] as const).map((m) => {
                const active = btnMode === m;
                return (
                  <button
                    key={m}
                    type="button"
                    className={`m3-filter-chip ${active ? 'active' : ''}`}
                    onClick={() => setBtnMode(m)}
                  >
                    {active && <span className="chip-check">✓</span>}
                    <span style={{ textTransform: 'capitalize' }}>{m}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="control-chips-group" style={{ marginTop: 4 }}>
            <button
              type="button"
              className={`m3-filter-chip ${btnDisabled ? 'active' : ''}`}
              onClick={() => setBtnDisabled(!btnDisabled)}
            >
              {btnDisabled && <span className="chip-check">✓</span>}
              <span>Disabled</span>
            </button>

            <button
              type="button"
              className={`m3-filter-chip ${btnLoading ? 'active' : ''}`}
              onClick={() => setBtnLoading(!btnLoading)}
            >
              {btnLoading && <span className="chip-check">✓</span>}
              <span>Loading</span>
            </button>
          </div>
        </div>
      )}

      {componentId === 'card' && (
        <div className="playground-controls">
          <div className="control-chips-group">
            <span className="control-label">Phong cách (Style):</span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[
                { id: 'elevated', label: 'Elevated' },
                { id: 'outlined', label: 'Outlined' },
                { id: 'filled', label: 'Filled' },
              ].map((item) => {
                const active = cardType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`m3-filter-chip ${active ? 'active' : ''}`}
                    onClick={() => setCardType(item.id as any)}
                  >
                    {active && <span className="chip-check">✓</span>}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {componentId === 'checkbox' && (
        <div className="playground-controls">
          <div className="control-chips-group">
            <span className="control-label">Hình dạng (Shape):</span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[
                { id: 'square', label: 'Vuông (Square 4dp)' },
                { id: 'circle', label: 'Tròn (Circle)' },
              ].map((item) => {
                const active = cbShape === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`m3-filter-chip ${active ? 'active' : ''}`}
                    onClick={() => setCbShape(item.id as any)}
                  >
                    {active && <span className="chip-check">✓</span>}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="control-chips-group" style={{ marginTop: 4 }}>
            <button
              type="button"
              className={`m3-filter-chip ${cbChecked ? 'active' : ''}`}
              onClick={() => setCbChecked(!cbChecked)}
            >
              {cbChecked && <span className="chip-check">✓</span>}
              <span>{cbChecked ? 'Đã chọn (Checked)' : 'Chưa chọn (Unchecked)'}</span>
            </button>
          </div>
        </div>
      )}

      {componentId === 'slider' && (
        <div className="playground-controls">
          <div className="control-chips-group">
            <button
              type="button"
              className={`m3-filter-chip ${showBubble ? 'active' : ''}`}
              onClick={() => setShowBubble(!showBubble)}
            >
              {showBubble && <span className="chip-check">✓</span>}
              <span>Hiện bong bóng giá trị (Value Bubble)</span>
            </button>
          </div>
        </div>
      )}

      {componentId === 'text-field' && (
        <div className="playground-controls">
          <div className="control-chips-group">
            <button
              type="button"
              className={`m3-filter-chip ${tfError ? 'active error-chip' : ''}`}
              onClick={() => setTfError(!tfError)}
            >
              {tfError && <span className="chip-check">✓</span>}
              <span>Giả lập báo lỗi (Error State)</span>
            </button>
          </div>
        </div>
      )}

      {componentId === 'badges' && (
        <div className="playground-controls">
          <div className="control-chips-group">
            <span className="control-label">Kiểu hiển thị:</span>
            <button
              type="button"
              className={`m3-filter-chip ${!badgeDot ? 'active' : ''}`}
              onClick={() => setBadgeDot(false)}
            >
              {!badgeDot && <span className="chip-check">✓</span>}
              <span>Hiển thị số đếm (Count)</span>
            </button>
            <button
              type="button"
              className={`m3-filter-chip ${badgeDot ? 'active' : ''}`}
              onClick={() => setBadgeDot(true)}
            >
              {badgeDot && <span className="chip-check">✓</span>}
              <span>Dấu chấm (Dot)</span>
            </button>
          </div>

          <div className="control-chips-group" style={{ marginTop: 4 }}>
            <span className="control-label">Màu sắc:</span>
            <button
              type="button"
              className={`m3-filter-chip ${badgeVariant === 'error' ? 'active' : ''}`}
              onClick={() => setBadgeVariant('error')}
            >
              {badgeVariant === 'error' && <span className="chip-check">✓</span>}
              <span>Cảnh báo (Error Red)</span>
            </button>
            <button
              type="button"
              className={`m3-filter-chip ${badgeVariant === 'primary' ? 'active' : ''}`}
              onClick={() => setBadgeVariant('primary')}
            >
              {badgeVariant === 'primary' && <span className="chip-check">✓</span>}
              <span>Chủ đạo (Primary)</span>
            </button>
          </div>
        </div>
      )}

      {componentId === 'navigation-bar' && (
        <div className="playground-controls">
          <div className="control-chips-group">
            <span className="control-label">Chuyển Tab nhanh:</span>
            {[
              { id: 0, label: 'Trang chủ' },
              { id: 1, label: 'Tìm kiếm' },
              { id: 2, label: 'Thông báo' },
              { id: 3, label: 'Cài đặt' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                className={`m3-filter-chip ${navIndex === t.id ? 'active' : ''}`}
                onClick={() => setNavIndex(t.id)}
              >
                {navIndex === t.id && <span className="chip-check">✓</span>}
                <span>Tab: {t.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {componentId === 'app-bar' && (
        <div className="playground-controls">
          <div className="control-chips-group">
            <button
              type="button"
              className={`m3-filter-chip ${appBarShowBack ? 'active' : ''}`}
              onClick={() => setAppBarShowBack(!appBarShowBack)}
            >
              {appBarShowBack && <span className="chip-check">✓</span>}
              <span>Nút quay lại (Back)</span>
            </button>
            <button
              type="button"
              className={`m3-filter-chip ${appBarCenterTitle ? 'active' : ''}`}
              onClick={() => setAppBarCenterTitle(!appBarCenterTitle)}
            >
              {appBarCenterTitle && <span className="chip-check">✓</span>}
              <span>Căn giữa tiêu đề (Center Title)</span>
            </button>
            <button
              type="button"
              className={`m3-filter-chip ${appBarSubtitle ? 'active' : ''}`}
              onClick={() => setAppBarSubtitle(appBarSubtitle ? '' : 'Mã đơn: #LM-98214')}
            >
              {appBarSubtitle && <span className="chip-check">✓</span>}
              <span>Phụ đề (Subtitle)</span>
            </button>
            <button
              type="button"
              className={`m3-filter-chip ${appBarElevated ? 'active' : ''}`}
              onClick={() => setAppBarElevated(!appBarElevated)}
            >
              {appBarElevated && <span className="chip-check">✓</span>}
              <span>Bóng đổ (Elevated Level 2)</span>
            </button>
          </div>
        </div>
      )}

      {componentId === 'scaffold' && (
        <div className="playground-controls">
          <div className="control-chips-group">
            <button
              type="button"
              className={`m3-filter-chip ${scaffoldShowAppBar ? 'active' : ''}`}
              onClick={() => setScaffoldShowAppBar(!scaffoldShowAppBar)}
            >
              {scaffoldShowAppBar && <span className="chip-check">✓</span>}
              <span>Thanh AppBar</span>
            </button>
            <button
              type="button"
              className={`m3-filter-chip ${scaffoldShowFab ? 'active' : ''}`}
              onClick={() => setScaffoldShowFab(!scaffoldShowFab)}
            >
              {scaffoldShowFab && <span className="chip-check">✓</span>}
              <span>Nút nổi (FAB)</span>
            </button>
            <button
              type="button"
              className={`m3-filter-chip ${scaffoldShowBottomNav ? 'active' : ''}`}
              onClick={() => setScaffoldShowBottomNav(!scaffoldShowBottomNav)}
            >
              {scaffoldShowBottomNav && <span className="chip-check">✓</span>}
              <span>Thanh đáy (BottomNav)</span>
            </button>
            <button
              type="button"
              className={`m3-filter-chip ${scaffoldEdgeToEdge ? 'active' : ''}`}
              onClick={() => setScaffoldEdgeToEdge(!scaffoldEdgeToEdge)}
            >
              {scaffoldEdgeToEdge && <span className="chip-check">✓</span>}
              <span>Tràn viền (Edge-to-Edge)</span>
            </button>
          </div>
        </div>
      )}

      {componentId === 'date-time-picker' && (
        <div className="playground-controls">
          <div className="control-chips-group">
            <span className="control-label">Chế độ chọn:</span>
            {[
              { id: 'date', label: 'Chỉ Ngày' },
              { id: 'time', label: 'Chỉ Giờ' },
              { id: 'datetime', label: 'Cả Ngày & Giờ' },
            ].map((m) => {
              const active = pickerMode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  className={`m3-filter-chip ${active ? 'active' : ''}`}
                  onClick={() => setPickerMode(m.id as any)}
                >
                  {active && <span className="chip-check">✓</span>}
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
          <div className="control-chips-group" style={{ marginTop: 4 }}>
            <button
              type="button"
              className={`m3-filter-chip ${picker24Hour ? 'active' : ''}`}
              onClick={() => setPicker24Hour(!picker24Hour)}
            >
              {picker24Hour && <span className="chip-check">✓</span>}
              <span>Định dạng 24 Giờ</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
