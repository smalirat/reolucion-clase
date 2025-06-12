import './ContadorClicks.css';

export function ContadorClicks({ clicks, setClicks, ganador, lado, registrarClick,clickPositions  }) {

  function manejoClick(evento){
    const pos = evento.currentTarget.getBoundingClientRect(); //toma la posicion en pantalla de un evento (click)
    const x = evento.clientX - pos.left;
    const y = evento.clientY - pos.top;
    registrarClick(lado, { x, y }); // enviamos la posición

    setClicks(prev => prev + 1);
  }

  return (
  <div className={`ContadorClicks ${ganador ? 'ganador' : ''}`} onClick={manejoClick}>
  <div className="ContadorClicks-contador">{clicks} clicks</div>
  <div className="ContadorClicks-lienzo">
    {clickPositions.map((pos, i) => (
      <span
        key={i}
        className="puntito"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />
    ))}
  </div>
  </div>
  )
}