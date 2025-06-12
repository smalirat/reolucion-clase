import "./ComparadorClicks.css"
import { useEffect, useState } from "react";
import { ContadorClicks } from "./ContadorClicks";

export function ComparadorClicks({ onChange, izquierda, derecha }) {
  const [clicksIzquierda, setClicksIzquierda] = useState(izquierda);
  const [clicksDerecha, setClicksDerecha] = useState(derecha);

  const [puntos, setPuntos] = useState({
    izquierda: [],
    derecha: []
  });

  function registrarClick(lado, punto) {
    setPuntos(prev => ({
      ...prev,
      [lado]: [...prev[lado], punto]
    }));
  }

  const ganador =
    clicksIzquierda > clicksDerecha ? "izquierda" :
    clicksDerecha > clicksIzquierda ? "derecha" :
    "empate";

  useEffect(() => {
    onChange({
      izquierda: clicksIzquierda,
      derecha: clicksDerecha,
      puntos: puntos
    });
  }, [clicksIzquierda, clicksDerecha, puntos]);

  return (
    <div className="ComparadorClicks">
      <ContadorClicks
        clicks={clicksIzquierda}
        setClicks={setClicksIzquierda}
        ganador={ganador === 'izquierda'}
        lado="izquierda"
        registrarClick={registrarClick}
        clickPositions={puntos.izquierda}
      />
      <ContadorClicks
        clicks={clicksDerecha}
        setClicks={setClicksDerecha}
        ganador={ganador === 'derecha'}
        lado="derecha"
        registrarClick={registrarClick}
        clickPositions={puntos.derecha}
      />
    </div>
  );
}
