export function getUserUnitInPx(SvgElement: SVGGraphicsElement): number {
  const CTM = SvgElement.getCTM()

  if (CTM) {
    return CTM.a
  } else {
    throw (`SvgElement CTM is ${CTM}`)
  }
}