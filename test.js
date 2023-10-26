const attrs = {
  FName: "Ali",
  LName: "Mirzaie",
  height: "165cm",
  weight: "90kg",
};

const skills = {
  programming: "javascript",
  technologies: "ASP.Net",
  language: "English",
  education: { degree: "masters" },
};

const user = {
  ...attrs,
  ...skills,
  Gender: "Male",
  Age: 45,
};

// console.log(user);

/*
user => {
  FName: 'Ali',
  LName: 'Mirzaie',
  height: '165cm',
  weight: '90kg',
  programming: 'javascript',
  technologies: 'ASP.Net',  
  language: 'English',      
  Gender: 'Male',
  Age: 45
}
*/

const newUser = {
  fname: "ali",
  lname: "ahmadi",
  education: { degree: "masters" },
};

const { fname, lname, degree } = { ...newUser };

console.log(fname, lname, degree);
