import { memo } from 'react';
import { ROUTE_PATH } from './rideDemo';

// Original illustrative map: terrain, water, roads and a few quiet labels.
// Everything shares the coordinate space defined in rideDemo.js. Strokes use
// vector-effect="non-scaling-stroke" so line weights stay the same on every screen size.

const NS = { vectorEffect: 'non-scaling-stroke' };

function Road({ d, w, casing = '#D3D0C4', fill = '#FFFFFF' }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={casing} strokeWidth={w + 2} {...NS} />
      <path d={d} stroke={fill} strokeWidth={w} {...NS} />
    </g>
  );
}

function Shield({ x, y, label, k }) {
  const w = 30 * k;
  const h = 22 * k;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={5 * k} fill="#fff" stroke="#8A8F86" strokeWidth="1" {...NS} />
      <text textAnchor="middle" y={5 * k} fontSize={13 * k} fontWeight="700" fill="#3A403F">{label}</text>
    </g>
  );
}

function MapArt({ layout, k, route }) {
  const compact = layout === 'mobile';
  return (
    <g>
      <defs>
        <path id="lr-forest-a" d="M 380 120 C 450 80 560 110 590 170 C 620 230 540 280 470 270 C 400 260 330 200 380 120 Z" />
        <path id="lr-forest-b" d="M 760 250 C 860 200 1000 230 1060 330 C 1120 430 1040 560 920 600 C 800 640 720 560 730 450 C 735 380 700 300 760 250 Z" />
        <path id="lr-forest-c" d="M 330 650 C 400 610 520 625 560 690 C 590 740 500 780 410 765 C 330 755 270 700 330 650 Z" />
        <path id="lr-forest-d" d="M 880 100 C 960 80 1060 110 1080 170 C 1095 230 1000 250 940 230 C 880 210 840 130 880 100 Z" />
        <path id="lr-forest-e" d="M 60 380 C 110 340 200 350 220 410 C 235 470 150 500 90 480 C 40 460 20 420 60 380 Z" />
        <clipPath id="lr-town-clip">
          <path d="M 120 505 C 170 490 300 490 340 515 C 360 560 330 610 280 620 C 220 630 140 600 120 560 C 110 540 110 515 120 505 Z" />
        </clipPath>
      </defs>

      {/* land */}
      <rect x="-400" y="-400" width="2000" height="1600" fill="#E7E5DB" />

      {/* hills: contour rings around the two big forests */}
      <g fill="none" stroke="#C5CEB3" strokeWidth="1" opacity=".85" {...NS}>
        {[0.84, 0.68, 0.52, 0.36].map((s) => (
          <use key={`a${s}`} href="#lr-forest-a" transform={`translate(480 190) scale(${s}) translate(-480 -190)`} {...NS} />
        ))}
        {[0.86, 0.72, 0.58, 0.44, 0.3].map((s) => (
          <use key={`b${s}`} href="#lr-forest-b" transform={`translate(900 430) scale(${s}) translate(-900 -430)`} {...NS} />
        ))}
      </g>

      {/* forests */}
      <g fill="#CBD5B8" stroke="#B9C6A4" strokeWidth="1">
        {['a', 'b', 'c', 'd', 'e'].map((id) => (
          <use key={id} href={`#lr-forest-${id}`} {...NS} />
        ))}
      </g>

      {/* water */}
      <path d="M 120 160 C 150 110 270 100 330 140 C 390 180 360 250 290 262 C 220 275 110 230 120 160 Z" fill="#B7CCD6" stroke="#A5BDC9" strokeWidth="1" {...NS} />
      <path d="M 340 215 C 400 260 380 330 450 370 C 520 410 600 480 610 560 C 618 620 700 650 780 700" fill="none" stroke="#B7CCD6" strokeWidth="7" strokeLinecap="round" {...NS} />

      {/* town */}
      <path d="M 120 505 C 170 490 300 490 340 515 C 360 560 330 610 280 620 C 220 630 140 600 120 560 C 110 540 110 515 120 505 Z" fill="#DDDBD0" />
      <g clipPath="url(#lr-town-clip)" stroke="#fff" strokeWidth="2.5" fill="none" {...NS}>
        {[150, 185, 220, 255, 290, 325].map((x) => (
          <path key={`v${x}`} d={`M ${x} 480 L ${x - 6} 640`} {...NS} />
        ))}
        {[525, 550, 575, 600].map((y) => (
          <path key={`h${y}`} d={`M 100 ${y} L 360 ${y - 8}`} {...NS} />
        ))}
      </g>

      {/* main roads */}
      <Road d="M -60 520 C 150 520 250 470 330 440 C 420 405 520 470 610 470 C 720 470 850 400 1000 380 C 1100 366 1180 380 1280 360" w={6} />
      <Road d="M 420 40 C 430 160 400 250 440 330 C 470 390 470 430 470 520 C 470 600 520 680 560 800" w={5} />
      <Road d="M 700 130 C 800 150 880 120 960 90 C 1020 66 1100 80 1220 70" w={4} />
      <Road d="M 200 820 C 330 700 420 690 520 700 C 640 710 700 740 840 820" w={4} />

      {/* minor roads */}
      <g fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...NS}>
        <path d="M 289 575 L 250 520 L 180 490" {...NS} />
        <path d="M 531 366 L 600 410 L 680 420" {...NS} />
        <path d="M 579 322 L 520 290 L 470 270" {...NS} />
        <path d="M 635 303 L 700 340 L 760 330" {...NS} />
        <path d="M 368 462 L 330 400 L 290 330" {...NS} />
      </g>

      {/* the ride: dark edge, white casing, pale road ahead; the travelled part is drawn by the map */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={ROUTE_PATH} stroke="#CFCCC0" strokeWidth={route.casing + 2} {...NS} />
        <path d={ROUTE_PATH} stroke="#FFFFFF" strokeWidth={route.casing} {...NS} />
        <path d={ROUTE_PATH} stroke="#E54E57" strokeOpacity=".3" strokeWidth={route.line} {...NS} />
      </g>

      {/* labels */}
      <g fontFamily="inherit" textAnchor="middle">
        {!compact && (
          <text x="478" y="152" fontSize={15 * k} fontStyle="italic" fill="#667452">
            <tspan x="478" dy="0">Pine Ridge</tspan>
            <tspan x="478" dy={18 * k}>State Forest</tspan>
          </text>
        )}
        <text x="140" y="560" textAnchor="start" fontSize={17 * Math.min(k, 1.6)} fontWeight="700" fill="#3D4444">Millbrook</text>
        {!compact && (
          <>
            <text x="232" y="190" fontSize={14 * k} fontStyle="italic" fill="#5F8396">Mill Pond</text>
            <text transform="translate(706 618) rotate(27)" fontSize={13 * k} fontStyle="italic" fill="#5F8396">Willow Creek</text>
            <Shield x={760} y={440} label="41" k={k} />
            <Shield x={437} y={292} label="12" k={k} />
          </>
        )}
      </g>
    </g>
  );
}

export default memo(MapArt);
