import { forwardRef, useEffect } from "react"
import { getUserUnitInPx } from "../../utils/getUserUnitInPx"


export const Rain = forwardRef(function Rain(props, ref: React.ForwardedRef<SVGGElement>) {

  useEffect(() => {
    
      if (ref && "current" in ref && ref.current) {

        try {
          const raindropContainers = ref.current.querySelectorAll(".raindrop-container")

          raindropContainers.forEach(raindropContainer => {
            const raindrop: SVGPathElement | null = raindropContainer.querySelector(".raindrop")
            const raindropParts: SVGGElement | null = raindropContainer.querySelector(".raindrop-parts")

            if (raindrop && raindropParts) {
              // defineRaindropPartsStrokeDash(raindropParts, raindrop.getTotalLength())

              const raindropBoundingClientRect = raindrop.getBoundingClientRect()
              
              // moveRaindropPartsTo(raindropParts, { x: raindropBoundingClientRect.x + raindropBoundingClientRect.width / 2, y: raindropBoundingClientRect.y + raindropBoundingClientRect.height })

              console.log(raindropParts.getBoundingClientRect().x, raindropParts.getBoundingClientRect().y)
            }
          })
        } catch(e) {
          console.log(e)
        }

      }

  }, [])

  function changeCoordsBy(xAmount: number, yAmount: number, dValue: string) {
    console.log(dValue.replace(/(?<xValue>-?[0-9]+\.?[[0-9]+]?),(?<yValue>-?[0-9]+\.?[[0-9]+]?)/g, (match, xValue: string, yValue: string) => {
      return `${(+xValue + xAmount)},${yValue}`
    }))
  }

  changeCoordsBy(14.468, 9.0602, "m -17.653559,42.247221 c 8.8168165,-0.04943 17.9396591,1.442481 18.14407356,8.504476")

  return (
    <g
      ref={ref}
      className="rain"
      transform="translate(157.83568,29.499829)"
      stroke="#002bed"
      strokeWidth="2" 
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none">

      <g className="raindrop-container" display={"none"} transform="matrix(1.1024306,0,0,1.1024306,-1.8278875,78.242559)">
        <path className="raindrop" d="M 15,0 V 12" />
        <g className="raindrop-parts">
          <path className="lower-raindrop-part"
            d="m -17.66543,27.256782 c 6.857523,-0.03844 13.9530677,1.12193 14.1120567,6.614593"
            transform="translate(0, -40.611)"
          />
          <path className="higher-raindrop-part"
            d="m -18.276962,23.749722 c 6.867048,0.101011 15.0305011,3.188062 14.8304762,9.937277"
            transform="translate(0, -40.611)"
          />
          <path className="lower-raindrop-part"
            d="m 10.632808,27.256792 c -6.8575236,-0.03844 -13.9530593,1.12193 -14.1120486,6.614592"
            transform="translate(0, -40.611)"
          />
          <path className="higher-raindrop-part"
            d="M 11.244339,23.749732 C 4.3772919,23.850743 -3.7861531,26.937794 -3.586128,33.687009"
            transform="translate(0, -40.611)"
          />
        </g>
      </g>

      <g className="raindrop-container" display={"none"} transform="matrix(1.1024306,0,0,1.1024306,7.0496096,74.423924)">
        <path className="raindrop" d="M 12.947393,3.4637749 V 19.060875" />
        <g className="raindrop-parts">
          <path className="lower-raindrop-part"
            d="m -17.840921,41.646211 c 7.83717,-0.04394 15.9463633,1.282206 16.1280651,7.559535"
            transform="translate(0, -40.611)"
          />
          <path className="higher-raindrop-part"
            d="m -18.539814,37.638143 c 7.848055,0.115441 17.177715,3.643499 16.9491151,11.356888"
            transform="translate(0, -40.611)"
          />
          <path className="lower-raindrop-part"
            d="M 14.499923,41.646223 C 6.6627528,41.602286 -1.4464308,42.928429 -1.628133,49.205757"
            transform="translate(0, -40.611)"
          />
          <path className="higher-raindrop-part"
            d="M 15.198815,37.638154 C 7.3507614,37.753595 -1.9788901,41.281653 -1.7502899,48.995042"
            transform="translate(0, -40.611)"
          />
        </g>
      </g>

      <g className="raindrop-container" transform="matrix(1.1024306,0,0,1.1024306,11.401336, 78.242495)">
        <path className="raindrop" d="M 15,0 V 19.1942" />
        <g className="raindrop-parts">
          <path className="lower-raindrop-part"
            d="m -17.653559,42.247221 c 8.8168165,-0.04943 17.9396591,1.442481 18.14407356,8.504476"
            transform="translate(0, -40.611)"
          />
          <path className="higher-raindrop-part"
            d="M -18.439813,37.738144 C -9.6107517,37.868015 0.88511616,41.83708 0.62794122,50.514643"
            transform="translate(0, -40.611)"
          />
          <path className="lower-raindrop-part"
            d="M 18.729891,42.247233 C 9.9130744,42.197805 0.79024282,43.689715 0.58582791,50.751709"
            transform="translate(0, -40.611)"
          />
          <path className="higher-raindrop-part"
            d="M 19.516145,37.738157 C 10.687084,37.868028 0.19122613,41.837093 0.44840134,50.514656"
            transform="translate(0, -40.611)"
          />

          {/* <path className="lower-raindrop-part"
            d="m -3.1855590000000014,42.247221 c 8.8168165,-0.04943 17.9396591,1.442481 18.14407356,8.504476"
            transform="translate(0, -40.611)"
          />
          <path className="higher-raindrop-part"
            d="M -18.439813,37.738144 C -9.6107517,37.868015 0.88511616,41.83708 0.62794122,50.514643"
            transform="translate(0, -40.611)"
          />
          <path className="lower-raindrop-part"
            d="M 33.197891,42.247233 C 24.3810744,42.197805 15.25824282,43.689715 15.05382791,50.751709"
            transform="translate(0, -40.611)"
          />
          <path className="higher-raindrop-part"
            d="M 19.516145,37.738157 C 10.687084,37.868028 0.19122613,41.837093 0.44840134,50.514656"
            transform="translate(0, -40.611)"
          /> */}
        </g>
      </g>

      <g className="raindrop-container" display={"none"} transform="matrix(1.1024306,0,0,1.1024306,18.01592,78.242495)">
        <path className="raindrop" opacity={1} d="M 15,0 V 22.7913" />     
        <g className="raindrop-parts">
          <path className="raindrop-part lower-raindrop-part"
            d="M-5.2081 53.9601c9.796-.055 19.933 1.603 20.16 9.45"
            transform="translate(0, -40.611)"
          />
          <path className="raindrop-part higher-raindrop-part"
            d="M-6.0821 48.9501c9.81.144 21.472 4.554 21.186 14.196"
            transform="translate(0, -40.611)"
          />
          <path className="raindrop-part lower-raindrop-part"
            d="M35.2179 53.9601c-9.797-.055-19.933 1.603-20.16 9.45"
            transform="translate(0, -40.611)"
          />
          <path className="raindrop-part higher-raindrop-part"
            d="M36.0909 48.9501c-9.81.144-21.472 4.554-21.186 14.196"
            transform="translate(0, -40.611)"
          />
        </g>
      </g>

    </g>
  )
})

function defineRaindropPartsStrokeDash(raindropParts: SVGGElement, raindropTotalLength: number) {
  const strokeDashLength = raindropTotalLength / raindropParts.children.length

  for (let i = 0; i < raindropParts.children.length; i++) {
    const raindropPart = raindropParts.children[i]

    if (!(raindropPart instanceof SVGPathElement)) {
      throw ("raindropPart is expected to be of type SVGPathElement")
    }

    raindropPart.style.strokeDasharray = `${strokeDashLength} ${raindropPart.getTotalLength() - strokeDashLength}`
    raindropPart.style.strokeDashoffset = `${strokeDashLength}`
  }
}

function moveRaindropPartsTo(raindropParts: SVGGElement, coord: { x: number, y: number }) {
  let userUnit: number = getUserUnitInPx(raindropParts)

  const raindropPartsBoundingClientRect = raindropParts.getBoundingClientRect()
  const xAxisDistance: number = coord.x - raindropPartsBoundingClientRect.x - raindropPartsBoundingClientRect.width / 2
  const yAxisDistance: number = coord.y - raindropPartsBoundingClientRect.y - raindropPartsBoundingClientRect.height

  raindropParts.style.transform = `translate(${xAxisDistance / userUnit}px, ${yAxisDistance / userUnit}px)`
}