// shared so the stream and the liquid fill run on one synced timeline,
// both starting on mount and completing together
export const POUR_DURATION = 1.6

// shared geometry so the stream, the cup's back layers (behind it) and
// front layers (in front of it) all line up exactly
export const RIM = { cx: 80, cy: 50, rx: 44, ry: 11 }
export const LIQUID_RX = RIM.rx - 7
export const LIQUID_RY = RIM.ry - 2.5

export const CUP_BOX_CLASS = 'w-[128px] h-[96px] sm:w-[144px] sm:h-[108px]'
export const CUP_TOP_CLASS = 'top-[calc(50dvh_-_48px)] sm:top-[calc(50dvh_-_54px)]'

// the rim ring is split into a back half (the far side, behind the stream
// so the pour visibly covers it) and a front half (the near lip, in front
// of the stream so the cup still reads as containing it)
function backArc(rx, ry) {
  return `M ${RIM.cx - rx},${RIM.cy} A ${rx},${ry} 0 0 1 ${RIM.cx + rx},${RIM.cy}`
}
function frontArc(rx, ry) {
  return `M ${RIM.cx - rx},${RIM.cy} A ${rx},${ry} 0 0 0 ${RIM.cx + rx},${RIM.cy}`
}

export const RIM_OUTER_BACK = backArc(RIM.rx, RIM.ry)
export const RIM_OUTER_FRONT = frontArc(RIM.rx, RIM.ry)
