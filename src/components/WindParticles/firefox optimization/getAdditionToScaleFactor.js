export default function getAdditionToScaleFactor(svgWidth) {
  let result

  // Дополнительные 0.013 для компенсации разницы между видимой шириной и шириной занимаемой элементом g
  if (svgWidth >= 357) {
    result = 0.013
  } else if (313 <= svgWidth && svgWidth < 357) {
    result = 0.019
  } else if (240 <= svgWidth && svgWidth  < 313) {
    result = 0.021
  } else if (200 <= svgWidth && svgWidth < 240) {
    result = 0.027
  } else if (170 <= svgWidth && svgWidth < 200) {
    result = 0.033
  } else if (150 <= svgWidth && svgWidth < 170) {
    result = 0.041
  } else if (100 <= svgWidth && svgWidth < 150) {
    result = 0.066
  } else if (svgWidth < 100) {
    result = 0.29
  } 

  return result
}
