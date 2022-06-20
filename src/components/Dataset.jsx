import Papa from "papaparse";

const Dataset = [{}];

const getMachines = async () => {
  const promise = new Promise((resolve, reject) => {
    Papa.parse(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmEGmBIv8KqN_e9UejoNww0HLq8Io2hl40dHyvCHhcPKUYRTZnTWU8REUaQvTzIT3oy7QZJ4ecN6xs/pub?&output=csv",
      {
        download: true,
        header: true,
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
        name: element.writeup.includes("youtube")
          ? element.maquina
          : element.maquina + " " + element.writeup,
        id: count,
        sku: crypto.randomUUID(),
        ip: element.ip,
        so: element.so,
        dificultad: element.dificultad,
        skills: element.tecnicas,
        like: element.like,
        youtube: element.writeup.includes("youtube")
          ? element.writeup
          : "https://www.twitch.tv/s4vitaar",
        activeDirectory: element.like.includes("Active Directory")
          ? "Active Directory"
          : "",
        resuelta: element.resuelta === "Si" ? true : false,
      });
      count++;
    }
  }
  Dataset.shift();
};
export { Dataset, getMachines, setMachines };
