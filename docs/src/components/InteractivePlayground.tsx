import React, { useState } from 'react';

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

  // SegmentedButton State
  const [segVal, setSegVal] = useState('day');

  // NavigationBar State
  const [navIndex, setNavIndex] = useState(0);

  return (
    <div className="playground-card">
      <div className="playground-preview-header">
        <span className="playground-title">Trình diễn tương tác (Interactive Preview)</span>
        <span style={{ fontSize: 12, opacity: 0.7 }}>Luma UI</span>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: 'var(--md-sys-color-surface-container-highest)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                }}
              >
                🔔
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: -4,
                  right: -4,
                  backgroundColor: 'var(--md-sys-color-error)',
                  color: '#FFFFFF',
                  borderRadius: 10,
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '1px 6px',
                  minWidth: 18,
                  textAlign: 'center',
                }}
              >
                {badgeCount}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Tăng giảm số huy hiệu:</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => setBadgeCount((c) => Math.max(0, c - 1))}
                  style={{
                    padding: '4px 12px',
                    borderRadius: 8,
                    border: '1px solid var(--md-sys-color-outline)',
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  -1
                </button>
                <button
                  onClick={() => setBadgeCount((c) => c + 1)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: 8,
                    border: '1px solid var(--md-sys-color-outline)',
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  +1
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
              maxWidth: 380,
              backgroundColor: 'var(--md-sys-color-surface-container)',
              borderRadius: 20,
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-around',
              boxShadow: 'var(--md-sys-elevation-2)',
            }}
          >
            {[
              { idx: 0, label: 'Trang chủ', icon: '🏠' },
              { idx: 1, label: 'Tìm kiếm', icon: '🔍' },
              { idx: 2, label: 'Cài đặt', icon: '⚙️' },
            ].map((item) => {
              const active = navIndex === item.idx;
              return (
                <button
                  key={item.idx}
                  onClick={() => setNavIndex(item.idx)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 28,
                      borderRadius: 14,
                      backgroundColor: active
                        ? 'var(--md-sys-color-secondary-container)'
                        : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 16,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: active ? 700 : 500,
                      color: active
                        ? 'var(--md-sys-color-on-surface)'
                        : 'var(--md-sys-color-on-surface-variant)',
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* DEFAULT PREVIEW (Scaffold / AppBar / DateTimePicker / others) */}
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
    </div>
  );
};
