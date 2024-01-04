import { Icon } from 'leaflet';
import homeIc from '../assets/icons/home.png';
import planeIc from '../assets/icons/plane.png';
import orgRatIc from '../assets/icons/orgRat.png';

const mapIcons = (icon) => {
    return new Icon({
      iconUrl: icon,
      iconSize: [20, 20]
    })
  }

  const homeIcon = mapIcons(homeIc)
  const planeIcon = mapIcons(planeIc)
  const orgRatIcon = mapIcons(orgRatIc)

  export {homeIcon, planeIcon, orgRatIcon}