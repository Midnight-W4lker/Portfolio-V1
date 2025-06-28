// src/components/VantaFog.jsx
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const VantaFog = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    const loadVanta = async () => {
      const VANTA = await import("vanta/dist/vanta.fog.min");
      if (!vantaEffect) {
        setVantaEffect(
          VANTA.default({
            el: vantaRef.current,
            THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            highlightColor: 0xdaf2,
            midtoneColor: 0x8d7ff,
            lowlightColor: 0x4e4e51,
            baseColor: 0x000000,
          })
        );
      }
    };

    loadVanta();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return <div ref={vantaRef} className="w-full h-[100vh] -z-10 fixed top-0 left-0" />;
};

export default VantaFog;
