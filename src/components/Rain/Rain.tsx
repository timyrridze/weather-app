import { forwardRef, useEffect } from "react"

export const Rain = forwardRef(function Rain(props, ref: React.ForwardedRef<SVGGElement>) {

  useEffect(() => {
    
    if(ref && "current" in ref && ref.current) {
      const raindropContainers = ref.current.querySelectorAll(".raindrop-container")

      raindropContainers.forEach(raindropContainer => {
        const raindrop: SVGPathElement | null = raindropContainer.querySelector(".raindrop")
        const raindropParts: SVGGElement | null = raindropContainer.querySelector(".raindrop-parts")

        if (raindrop && raindropParts) {
          const strokeDashLength = raindrop.getTotalLength() / raindropParts.children.length
          
          for (let i = 0; i < raindropParts.children.length; i++) {
            const raindropPart = raindropParts.children[i]

            if (!(raindropPart instanceof SVGPathElement)) {
              throw ("raindropPart is expected to be of type SVGPathElement")
            }

            raindropPart.style.strokeDasharray = `${strokeDashLength} ${raindropPart.getTotalLength() - strokeDashLength}`
            raindropPart.style.strokeDashoffset = `${strokeDashLength}`
          }
        }
      })
    }

  }, [])

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
        <path className="raindrop" d="M 15,0 V 12" />
        <g className="raindrop-parts" display={"none"}>
          <path className="lower-raindrop-part"
            d="M-17.466 42.848c9.796-.055 19.933 1.603 20.16 9.45"
            transform="translate(0, -40.611)"
          />
          <path className="higher-raindrop-part"
            d="M-18.34 37.838c9.81.144 21.472 4.554 21.186 14.196"
            transform="translate(0, -40.611)"
          />
          <path className="lower-raindrop-part"
            d="M22.96 42.848c-9.797-.055-19.933 1.603-20.16 9.45"
            transform="translate(0, -40.611)"
          />
          <path className="higher-raindrop-part"
            d="M23.833 37.838c-9.81.144-21.472 4.554-21.186 14.196"
            transform="translate(0, -40.611)"
          />
        </g>
      </g>

      <g className="raindrop-container" transform="matrix(1.1024306,0,0,1.1024306,7.0496096,74.423924)">
        <path className="raindrop" d="M 12.947393,3.4637749 V 19.060875" />
        <g className="raindrop-parts" display={"none"}>
          <path className="lower-raindrop-part"
            d="M-17.466 42.848c9.796-.055 19.933 1.603 20.16 9.45"
            transform="translate(0, -40.611)"
          />
          <path className="higher-raindrop-part"
            d="M-18.34 37.838c9.81.144 21.472 4.554 21.186 14.196"
            transform="translate(0, -40.611)"
          />
          <path className="lower-raindrop-part"
            d="M22.96 42.848c-9.797-.055-19.933 1.603-20.16 9.45"
            transform="translate(0, -40.611)"
          />
          <path className="higher-raindrop-part"
            d="M23.833 37.838c-9.81.144-21.472 4.554-21.186 14.196"
            transform="translate(0, -40.611)"
          />
        </g>
      </g>

      <g className="raindrop-container" transform="matrix(1.1024306,0,0,1.1024306,11.401336,78.242495)">
        <path className="raindrop" d="M 15,0 V 19.1942" />
        <g className="raindrop-parts" display={"none"}>
          <path className="lower-raindrop-part"
            d="M-17.466 42.848c9.796-.055 19.933 1.603 20.16 9.45"
            transform="translate(0, -40.611)"
          />
          <path className="higher-raindrop-part"
            d="M-18.34 37.838c9.81.144 21.472 4.554 21.186 14.196"
            transform="translate(0, -40.611)"
          />
          <path className="lower-raindrop-part"
            d="M22.96 42.848c-9.797-.055-19.933 1.603-20.16 9.45"
            transform="translate(0, -40.611)"
          />
          <path className="higher-raindrop-part"
            d="M23.833 37.838c-9.81.144-21.472 4.554-21.186 14.196"
            transform="translate(0, -40.611)"
          />
        </g>
      </g>

      <g className="raindrop-container" transform="matrix(1.1024306,0,0,1.1024306,18.01592,78.242495)">
        <path className="raindrop" d="M 15,0 V 22.7913" />
        
        <g className="raindrop-parts">
          <path className="lower-raindrop-part"
            d="M-17.466 42.848c9.796-.055 19.933 1.603 20.16 9.45"
            transform="translate(0, -40.611)"
          />
          <path className="higher-raindrop-part"
            d="M-18.34 37.838c9.81.144 21.472 4.554 21.186 14.196"
            transform="translate(0, -40.611)"
          />
          <path className="lower-raindrop-part"
            d="M22.96 42.848c-9.797-.055-19.933 1.603-20.16 9.45"
            transform="translate(0, -40.611)"
          />
          <path className="higher-raindrop-part"
            d="M23.833 37.838c-9.81.144-21.472 4.554-21.186 14.196"
            transform="translate(0, -40.611)"
          />
        </g>
      </g>

    </g>
  )
})