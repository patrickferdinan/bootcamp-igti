const globalState = {
  allLanguage: [],
  filteredLanguage: [],
  loadingData: true,
  currentFilter: "",

  radioAnd: false,
  radioOr: true,

  checkboxes: [
    {
      filter: "java",
      description: "Java",
      img: "./img/java.png",
      checked: true
    },
    {
      filter: "javascript",
      description: "JavaScript",
      img: "./img/javascript.png",
      checked: true
    },
    {
      filter: "python",
      description: "Python",
      img: "./img/python.png",
      checked: true
    }
  ]
};

const globalDivLanguage = document.querySelector("#divLanguage");
const globalInputName = document.querySelector("#inputName");
const globalDivCheckboxes = document.querySelector("#checkboxes");
const globalRadioAnd = document.querySelector("#radioAnd");
const globalRadioOr = document.querySelector("#radioOr");



async function start() {

  globalInputName.addEventListener("input", handleInputChange);

  globalRadioAnd.addEventListener("input", handleRadioClick);

  globalRadioOr.addEventListener("input", handleRadioClick);

  renderCheckboxes();

  await fetchAll();

  filterDevs();
}

function renderCheckboxes() {
  const { checkboxes } = globalState;

  const inputCheckboxes = checkboxes.map((checkbox) => {
    const { filter: id, description, img, checked } = checkbox;

    // prettier-ignore
    return (
      `<label class="option">
        <input 
          id="${id}" 
          type="checkbox" 
          checked="${checked}"
        />
        <span>${description}</span>
        <img src='${img}'alt="" srcset=""/>
      </label>`
      
    );
  });

  globalDivCheckboxes.innerHTML = inputCheckboxes.join("");


  checkboxes.forEach((checkbox) => {
    const { filter: id } = checkbox;
    const element = document.querySelector(`#${id}`);
    element.addEventListener("input", handleCheckboxClick);
  });

  async function fetchAll() {
    const url =
      "http://localhost:3001/devs";
  
    const resource = await fetch(url);
    const json = await resource.json();
  
    const jsonWithImprovedSearch = json.map((item) => {
      const { name, programmingLanguages } = item;
  
      const lowerCaseName = name.toLocaleLowerCase();

      console.log(name)
  
      return {
        ...item,
        searchName: removeAccentMarksFrom(lowerCaseName)
          .split("")
          .filter((char) => char !== " ")
          .join(""),
        searchLanguage: getOnlyLanguageFrom(programmingLanguages)
      
      };
    });
  }

  globalState.allDevs = [...jsonWithImprovedSearch];
  globalState.filteredDevs = [...jsonWithImprovedSearch];

  globalState.loadingData = false;
}

function handleInputChange({ target }) {
  
  globalState.currentFilter = target.value.toLocaleLowerCase().trim();

  filterDevs();
}
function handleCheckboxClick({ target }) {
  const { id, checked } = target;
  const { checkboxes } = globalState;

  
  const checkboxToChange = checkboxes.find(
    (checkbox) => checkbox.filter === id
  );
  checkboxToChange.checked = checked;

  filterDevs();
}

function handleRadioClick({ target }) {
  const radioId = target.id;

  globalState.radioAnd = radioId === "radioAnd";
  globalState.radioOr = radioId === "radioOr";

  filterDevs();
}

function getOnlyLanguageFrom(language) {
  return language.map((language) => language.toLocaleLowerCase()).sort();
}

function removeAccentMarksFrom(text) {
  const WITH_ACCENT_MARKS = "áãâäàéèêëíìîïóôõöòúùûüñ".split("");
  const WITHOUT_ACCENT_MARKS = "aaaaaeeeeiiiiooooouuuun".split("");

  const newText = text
    .toLocaleLowerCase()
    .split("")
    .map((char) => {
      const index = WITH_ACCENT_MARKS.indexOf(char);

      if (index > -1) {
        return WITHOUT_ACCENT_MARKS[index];
      }
      return char;
    })
    .join("");

  return newText;
}

function filterDevs() {
  const { allDevs, radioOr, currentFilter, checkboxes } = globalState;

  const filterDevs = checkboxes
    .filter(({ checked }) => checked)
    .map(({ filter }) => filter)
    .sort();

    let filteredDevs = allDevs.filter(({ searchLanguage }) => {
      return radioOr
      ? filterDevs.some((item) => searchLanguage.includes(item))
      : filterDevs.join("") === searchLanguage.join("");
  });

  if (currentFilter) {
    filteredDevs = filteredDevs.filter(({ searchName }) =>
      searchName.includes(currentFilter)
    );
  }
  globalState.filteredDevs = filteredDevs;

  renderDevs();
}

function renderDevs() {
  const { filteredDevs } = globalState;

  const DevsToShow = filteredDevs
    .map((dev) => {
      return renderDevs(dev);
    })
    .join("");

  const renderedHTML = `
     <div>
       <h2>${filteredDevs.length} dev(s) encontrado(s)</h2>
       <div class='row'>
         ${DevsToShow}
       </div>
     </div>
  `;

  globalDivDevs.innerHTML = renderedHTML;
}

function renderDev(dev) {
  const { name, flag, language } = dev;

  return `
    <div class='col s12 m6 l4'>
      <div class='dev-card'>
        <img class='flag' src="${flag}" alt="${name}" />
        <div class='data'>
          <span>${name}</span>
          <span class='language'>
            <strong>${programmingLanguages(language)}</strong>
          </span>
        </div>
      </div>
    </div>
  `;
}

function programmingLanguages(programmingLanguages) {
  const { checkboxes } = globalState;
  return programmingLanguages
    .map((language) => {
      return checkboxes.find((item) => item.filter === language).description;
    })
    .join(", ");
    
}

start();

