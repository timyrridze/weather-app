import { forwardRef, useEffect } from "react"
import { Decimal } from "decimal.js"
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
              //defineRaindropPartsStrokeDash(raindropParts, raindrop.getTotalLength())

              const raindropBoundingClientRect = raindrop.getBoundingClientRect()
              
              //moveRaindropPartsTo(raindropParts, { x: raindropBoundingClientRect.x + raindropBoundingClientRect.width / 2, y: raindropBoundingClientRect.y + raindropBoundingClientRect.height })

              //console.log(raindropParts.getBoundingClientRect().x, raindropParts.getBoundingClientRect().y)
            }
          })
        } catch(e) {
          console.log(e)
        }

      }

  }, [])

  function changeCoordsBy(dValue: string, xChange: number, yChange: number) {
    console.log(dValue.replace(/(?<xValue>-?[0-9]+\.?[[0-9]+]?),(?<yValue>-?[0-9]+\.?[[0-9]+]?)/g, (match, xValue: string, yValue: string) => {
      return `${new Decimal(+xValue).plus(new Decimal(xChange))},${new Decimal(+yValue).plus(new Decimal(yChange))}`
    }))
  }

  changeCoordsBy("M 11.244339,23.749732 C 4.3772919,23.850743 -3.7861531,26.937794 -3.586128,33.687009", 18.5168, 18.7266)

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

      <g className="raindrop-container" transform="matrix(1.1024306,0,0,1.1024306,-1.8278875,78.242559)">
        <path className="raindrop" d="M 15,0 V 12"/>
        <g className="raindrop-parts">
          <path className="lower-raindrop-part"
            d="m 0.85137,45.983382 c 6.857523,-0.03844 13.9530677,1.12193 14.1120567,6.614593"
            transform="translate(0, -40.611)"
          />
          <path className="higher-raindrop-part"
            d="m 0.239838,42.476322 c 6.867048,0.101011 15.0305011,3.188062 14.8304762,9.937277"
            transform="translate(0, -40.611)"
          />
          <path className="lower-raindrop-part"
            d="m 29.149608,45.983392 c -6.8575236,-0.03844 -13.9530593,1.12193 -14.1120486,6.614592"
            transform="translate(0, -40.611)"
          />
          <path className="higher-raindrop-part"
            d="M 29.761139,42.476332 C 22.8940919,42.577343 14.7306469,45.664394 14.930672,52.413609"
            transform="translate(0, -40.611)"
          />
        </g>
      </g>

      <g className="raindrop-container" transform="matrix(1.1024306,0,0,1.1024306,7.0496096,74.423924)">
        <path className="raindrop" d="M 12.947393,3.4637749 V 19.060875" />
        <g className="raindrop-parts">
          <path className="lower-raindrop-part"
            d="m -3.223021,52.105411 c 7.83717,-0.04394 15.9463633,1.282206 16.1280651,7.559535"
            transform="translate(0, -40.611)"
          />
          <path className="higher-raindrop-part"
            d="m -3.921914,48.097343 c 7.848055,0.115441 17.177715,3.643499 16.9491151,11.356888"
            transform="translate(0, -40.611)"
          />
          <path className="lower-raindrop-part"
            d="M 29.117823,52.105423 C 21.2806528,52.061486 13.1714692,53.387629 12.989767,59.664957"
            transform="translate(0, -40.611)"
          />
          <path className="higher-raindrop-part"
            d="M 29.816715,48.097354 C 21.9686614,48.212795 12.6390099,51.740853 12.8676101,59.454242"
            transform="translate(0, -40.611)"
          />
        </g>
      </g>

      <g className="raindrop-container" transform="matrix(1.1024306,0,0,1.1024306,11.401336, 78.242495)">
        <path className="raindrop" d="M 15,0 V 19.1942" />
        <g className="raindrop-parts">
          <path className="lower-raindrop-part"
            d="m -3.185559,51.307421 c 8.8168165,-0.04943 17.9396591,1.442481 18.14407356,8.504476"
            transform="translate(0, -40.611)"
          />
          <path className="higher-raindrop-part"
            d="M -3.971813,46.798344 C 4.8572483,46.928215 15.35311616,50.89728 15.09594122,59.574843"
            transform="translate(0, -40.611)"
          />
          <path className="lower-raindrop-part"
            d="M 33.197891,51.307433 C 24.3810744,51.258005 15.25824282,52.749915 15.05382791,59.811909"
            transform="translate(0, -40.611)"
          />
          <path className="higher-raindrop-part"
            d="M 33.984145,46.798357 C 25.155084,46.928228 14.65922613,50.897293 14.91640134,59.574856"
            transform="translate(0, -40.611)"
          />
        </g>
      </g>

      <g className="raindrop-container" transform="matrix(1.1024306,0,0,1.1024306,18.01592,78.242495)">
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