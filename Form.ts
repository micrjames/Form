const { dataObj } = require("./utils/utils");

export class Form {
   private formEl: HTMLFormElement;
   private fieldInputs: HTMLFormElement[];
   private submitButton: HTMLButtonElement;
   private _data: typeof dataObj = {};
   
   constructor(form: HTMLFormElement, cb: (data: typeof dataObj) => void) {
	  this.formEl = form;
	  this.fieldInputs = this.inputs;
	  this.submitButton = this.submitBtn;

	  this.formEl.addEventListener("submit", event => {
		 event.preventDefault();

		 this.inputsNames.forEach((name, i) => {
			this._data[name] = this.values[i];
		 });
		 cb(this._data);
	  });
   }
   private formElements(type: string): Element[] {
	  const fieldEls: HTMLFormControlsCollection = this.formEl.elements;
	  let fieldElements: Element[] = [];
	  for(let i = 0; i < fieldEls.length; i++) {
		 if(fieldEls[i].nodeName === type)
			fieldElements = [...fieldElements, fieldEls[i]];
	  }
	  return fieldElements;
   }
   get inputs(): HTMLFormElement[] {
	  let fieldInputs: Element[] = this.formElements("INPUT");
	  return fieldInputs as HTMLFormElement[];
   }
   get btns(): HTMLButtonElement[] {
	  let btns: HTMLButtonElement[] = [];
	  btns = this.formElements("BUTTON") as HTMLButtonElement[];
	  return btns;
   }
   get submitBtn(): HTMLButtonElement {
	  let submitBtn: Element;
	  // assumes there is only one submit button per form
	  for(let i = 0; i < this.btns.length; i++)
		 if(this.btns[0].type == "submit")
			submitBtn = this.btns[i];
	  return submitBtn as HTMLButtonElement;
   }
   get values(): (string | number)[] {
		 let values: (string | number)[] = [];
		 for(let i = 0; i < this.inputs.length; i++)
			values = [...values, this.inputs[i].value];
		 return values;
   }
   get inputsNames(): (string | undefined)[] {
	  return this.fieldInputs.map(fieldInput => {
		 return fieldInput.attributes.getNamedItem("name")?.value;
	  });
   }
   get data(): typeof dataObj {
      return this._data;
   }
   get form(): HTMLFormElement {
	  return this.formEl;
   }
}
