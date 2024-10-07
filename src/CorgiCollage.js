
function Corgi({ image, name }) {
    // Make this component rendering purposefully slow.
    const then = performance.now();
    while (performance.now() < then + 100);
    return (
      <div className="corgi-component">
        <div>{name}</div>
        <img src={image} className="corgi" alt={`${name} security`} />
      </div>
    );
  }
  
  
  function CorgiCollage({corgis, corgiSearch}) {
    return (
      <div className="corgi-zone">
      {corgis
        .filter(
          (corgi) =>
            corgi.name.toLowerCase().includes(corgiSearch.toLowerCase()) ||
            corgiSearch === "",
        )
        .map((corgi, id) => 
          {
            return <Corgi name={corgi.name} image={corgi.image} key={id}></Corgi>
          }
        )}
    </div>
    );
  }


export default CorgiCollage;
