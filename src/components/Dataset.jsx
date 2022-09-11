import Papa from "papaparse";

const Dataset = [{}];

const getMachines = async () => {
  const promise = new Promise((resolve, reject) => {
    Papa.parse(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmEGmBIv8KqN_e9UejoNww0HLq8Io2hl40dHyvCHhcPKUYRTZnTWU8REUaQvTzIT3oy7QZJ4ecN6xs/pub?&output=csv",
      {
	skipEmptyLines: 'greedy',
	comments: '#',
        download: true,
        header: true,
	transformHeader: function(h) {
		return h.replace(/\s/g, '');
	},
        complete: (results) => {
          resolve(results.data);
        },
        error: (err) => {
          reject(err);
        },
      }
    );
  });
  const data = await promise;
  return data;
};

const setMachines = (result) => {
  let data = JSON.stringify(result);
  data = JSON.parse(data);
  let count = 1;
  for (const machine in data) {
    if (Object.hasOwnProperty.call(data, machine)) {
      const element = data[machine];
      Dataset.push({
        name: element.Writeup.includes("youtube")
          ? element.Máquina
          : element.Máquina + " " + element.Writeup,
        id: count,
        sku: crypto.randomUUID(),
        ip: element.DirecciónIP,
        so: element.SistemaOperativo,
        dificultad: element.Dificultad,
        skills: element.TécnicasVistas,
        like: element.Like,
        youtube: element.Writeup.includes("youtube")
          ? element.Writeup
          : "https://www.twitch.tv/s4vitaar",
        activeDirectory: element.Like.includes("Active Directory")
          ? "Active Directory"
          : "",
        resuelta: element.Resuelta === "Si" ? true : false,
      });
      count++;
    }
  }
  Dataset.shift();
};
export { Dataset, getMachines, setMachines };
