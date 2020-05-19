
export interface Kid {
  name: string;
  goal: number;
  count: number;
  image?: string;
}

export const getKids = () => {
  const kids = getData();
  return kids;
}

export const getKid = (name: string) => {
  const kid = getKids().find(x => x.name === name);
  return kid;
}

export const updateKid = ({name, count, goal, image}: Kid) => {
  const kids = getKids();
 const kid = kids.find(x => x.name === name);
 if(kid) {
   kid.name = name;
   kid.count = count;
   kid.goal = goal;
   kid.image = image;
   saveData(kids);
 }
}

export const addKid = (name: string, goal: number, image?: string) => {
  const kid = {
    name,
    goal,
    count: 0,
    image
  };
  const kids = getKids();
  kids.push(kid);
  saveData(kids);
}

function getData() {
  const data = JSON.parse(window.localStorage.fuzzyData || '[]') as Kid[];
  return data;
}

function saveData(kids: Kid[]) {
  const dataString = JSON.stringify(kids);
  window.localStorage.fuzzyData = dataString;
}