import "./App.css";
import React from "react";

function App() {
  const timings = [];
  const [corgis, setCorgis] = React.useState([]);
  const [newCorgiName, setNewCorgiName] = React.useState("");
  const [newCorgiSecurityPhoto, setNewCorgiSecurityPhoto] = React.useState("");
  const [corgiSearch, setCorgiSearch] = React.useState("");
  React.useEffect(() => {
    setNewCorgiSecurityPhoto(corgiImages[1]);
    setNewCorgiName(corgiNames[0]);
  }, []);
  return (
    <div className="App">
      <h2 className="text-base font-semibold leading-7 text-indigo-600">
        React example
      </h2>
      <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        My Corgi collage
      </p>
      <header className="header">
        <img
          src={
            "https://www.josera.de/media/ratgeber-de/Hund_Corgi_shutterstock_1079352791_Beitragsbild2.jpg"
          }
          className="corgi-logo"
          alt="logo"
        />
      </header>
      <div className="input-wrap">
        <div className="new-input-wrap">
          <div>
            Corgi name:{" "}
            <input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={newCorgiName}
              onChange={(e) => setNewCorgiName(e.target.value)}
            />
          </div>
          <div>
            Security photo (
            <a
              style={{ color: "blue" }}
              target="_blank"
              rel="noopener noreferrer"
              href="https://home-affairs.ec.europa.eu/system/files/2016-12/icao_photograph_guidelines_en.pdf"
            >
              See guidelines
            </a>
            ):{" "}
            <input
              value={newCorgiSecurityPhoto}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setNewCorgiSecurityPhoto(e.target.value)}
            />
          </div>
          <button
            disabled={!newCorgiName || !newCorgiSecurityPhoto}
            style={{ width: 100 }}
            onClick={appendACorgi}
            className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add new Corgi
          </button>
        </div>
        <div className="find-input-wrap">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              value={corgiSearch}
              onChange={(e) => setCorgiSearch(e.target.value)}
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search a corgi by name"
            />
          </div>
        </div>
      </div>

      <div className="corgi-zone">
        {corgis
          .filter(
            (corgi) =>
              corgi.name.toLowerCase().includes(corgiSearch.toLowerCase()) ||
              corgiSearch === "",
          )
          .map((corgi, id) => (
            <Corgi name={corgi.name} image={corgi.image} key={id}></Corgi>
          ))}
      </div>
    </div>
  );

  function appendACorgi() {
    if (!newCorgiName || !newCorgiSecurityPhoto) {
      return;
    }
    const then = performance.now();
    mockChangeDetection();
    const newCorgiCount = corgis.length + 1;
    const corgiName = newCorgiName;
    const corgiImage = newCorgiSecurityPhoto;
    if (newCorgiCount + 1 < corgiImages.length) {
      setNewCorgiName(corgiNames[newCorgiCount + 1]);
      setNewCorgiSecurityPhoto(corgiImages[newCorgiCount + 1]);
    } else {
      setNewCorgiSecurityPhoto("");
      setNewCorgiName("");
    }
    setCorgis([...corgis, { name: corgiName, image: corgiImage }]);
    const measure = {
      start: then,
      end: performance.now(),
      detail: {
        devtools: {
          metadata: {
            extensionName: "React Extension",
            dataType: "flame-chart-entry",
          },
          color: "primary",
          track: "An Extension Track",
          detailsPairs: [
            ["Description", "This is a top level rendering task"],
            ["Tip", "A tip to improve this"],
          ],
          hintText: "A hint if needed",
        },
      },
    };
    performance.measure("An extension measurement", measure);
    for (const timing of timings) {
      performance.measure(timing.name, timing.measure);
    }
  }
  /**
   * This mocks a task happening when the component renders (f.e change
   * detection). It consists of a inneficient and slow calculation of a
   * Fibonacci number. Each calculation is measured and registered to
   * Chrome using the User Timings API and a proposed predefined
   * format to extend the Performance Panel.
   */
  function mockChangeDetection() {
    const measure = {
      detail: {
        devtools: {
          metadata: {
            extensionName: "React Extension",
            dataType: "marker",
          },
          color: "error",
          detailsPairs: [
            [
              "Description",
              "This marks the start of a task",
            ],
          ],
          hintText: "A mark",
        },
      },
    };
    performance.mark("Custom mark", measure);
    return fib(5);
  }
  function fib(val) {
    const then = performance.now();
    while (performance.now() - then < 200 * (1 + Math.random()));
    if (val === 0 || val === 1) {
      return val;
    }
    const result = fib(val - 1) + fib(val - 2);
    const measure = {
      start: then,
      end: performance.now(),
      detail: {
        devtools: {
          metadata: {
            extensionName: "React Extension",
            dataType: "flame-chart-entry",
          },
          color: "tertiary-light",
          track: "An Extension Track",
          hintText: "This is a rendering task",
          detailsPairs: [
            ["Description", "This is a child task"],
            ["Tip", "Do something about it"],
          ],
        },
      },
    };
    timings.push({ name: `Computation of ${val}`, measure });

    return result;
  }
}

function Corgi({ image, name }) {
  return (
    <div className="corgi-component">
      <div>{name}</div>
      <img src={image} className="corgi" alt={`${name} security`} />
    </div>
  );
}

const corgiImages = [
  "https://www.josera.de/media/ratgeber-de/Hund_Corgi_shutterstock_1079352791_Beitragsbild2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Welsh_Pembroke_Corgi.jpg/640px-Welsh_Pembroke_Corgi.jpg",
  "https://cdn.shortpixel.ai/spai/w_872+q_+ret_img+to_webp/tierisch-verliebt.de/magazin/wp-content/uploads/2023/08/corgi-2-1280x765.jpg",
  "https://nationaltoday.com/wp-content/uploads/2022/08/18-National-Welsh-Corgi-Day-1200x834.jpg",
  "https://www.animalcentury.com/cdn/shop/products/CorgiQueen_DIN_LQ_1200x1200.jpg?v=1638397610",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKXrKJQgyBzuGL2GXou6Y_TfO8_oLWE9n_Aw&usqp=CAU",
  "https://www.josera.de/media/ratgeber-de/Hund_Corgi_shutterstock_1861514161_Beitragsbild1.jpg",
  "https://mymodernmet.com/wp/wp-content/uploads/2020/10/cooper-baby-corgi-dogs-8.jpg",
];

const corgiNames = [
  "Charles",
  "Henri",
  "Louis",
  "Edward",
  "Marie Antoinette",
  "Elizabeth",
  "Frederick",
  "Ivan",
];
export default App;
