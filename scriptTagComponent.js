'use strict';

class TagsComponent extends HTMLElement {
    
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        const $$styleElement = document.createElement('style');
        $$styleElement.textContent = `
        :host { display: block; color: blue; --main-color: #c0c0c0; --main-font-size: 10px; --main-border: 1px solid blue; }
        :host(.red) { background: red; }
        #tags-area { display: flex; border-radius: 5px; }
        #tags-area.hide > div.tag { display: none; }
        #tags-input { background: var(--main-color); font-size: var(--main-font-size); border: var(--main-border); }
        .tag { display: flex; align-items: center; 
        border: 1px solid grey; padding: 2px; width: fit-content;
        background: var(--main-color); font-size: var(--main-font-size); border: var(--main-border); color: red}
        .remove-cross { width: 15px ; height: auto; }
        button{ padding: 0; background: transparent; border: none; }
        span { color: #fff; }
        .extra { color: inherit; }
        .rounded { border-radius: inherit; }`;
        this.shadowRoot.appendChild($$styleElement);
        const $$inputField = document.createElement("input");
        $$inputField.id = "tags-input";
        this.shadowRoot.appendChild($$inputField);
        const $$tagAreaElement = document.createElement("div");
        $$tagAreaElement.id = "tags-area";
        this.shadowRoot.appendChild($$tagAreaElement);
        this.bindFunctions();
        this.initializeTag("toto");
    }
    
    bindFunctions(){
        this.handleEventChange = this.handleEventChange.bind(this);
        this.handleEventClickRemove = this.handleEventClickRemove.bind(this);
    }
    
     initializeTag(element){
        this.addTag(element);
    }
    
    connectedCallback () {
        const $$input = this.shadowRoot.querySelector("#tags-input");
        $$input.addEventListener("change", this.handleEventChange);
    }
    
    disconnectedCallback () {
        console.log("disconnect");
        const $$input = this.shadowRoot.querySelector("#tags-input");
        const $$imageListToRemoveEventListener = this.shadowRoot.querySelectorAll(".remove-cross");
        $$input.removeEventListener("change", this.handleEventChange);
        $$imageListToRemoveEventListener.forEach((element) => {
            element.removeEventListener("click", this.handleEventClickRemove);
        });
    }
    
    /* $$imageListToRemoveEventListener.forEach(this.callback.bind(this));

       callback (element) {
       element.removeEventListener("click", this.handleEventClickRemove);
    */
    
    handleEventChange (event) {
        const textInputted = event.target.value;
        this.addTag(textInputted);
        event.target.value = "";
        this.dispatchEvent(new Event(event.type, event));
        event.stopPropagation();
    }
      
    addTag (value) {
        const $$tagContainerElement = document.createElement("div");
        const $$textWrapper = document.createElement("span");
        $$textWrapper.classList.add("extra");
        const $$buttonRemoveElement = document.createElement("button");
        const $$tagRemoveImage = document.createElement("img");
        $$tagRemoveImage.setAttribute("src", "Icons/Icons/Basic/Close.svg");
        $$tagRemoveImage.classList.add("remove-cross");
        $$tagRemoveImage.addEventListener("click", this.handleEventClickRemove);
        $$textWrapper.textContent = value;
        $$buttonRemoveElement.appendChild($$tagRemoveImage);
        $$tagContainerElement.appendChild($$textWrapper);
        $$tagContainerElement.appendChild($$buttonRemoveElement);
        $$tagContainerElement.classList.add("tag", "rounded");
        const $$tagsArea = this.shadowRoot.querySelector("#tags-area");
        $$tagsArea.appendChild($$tagContainerElement);
    }
    
    handleEventClickRemove(event) {
        const parentTag = event.target.parentNode.parentNode;
        if (event.target) {
            this.removeTag(parentTag);
         }
    }

    removeTag (element) {
        element.parentNode.removeChild(element);//accept a tag element
    }
    
    removeTagByValue (value) {
        const tagList = this.shadowRoot.querySelectorAll("#tags-area > div.tag");
        tagList.forEach(function(element){
            if (element.textContent == value){
                const tagParent = element.parentNode;
                tagParent.removeChild(element);
            }
        });
        /*const elementContent = Array.from(tagList).map(function(element){
            return element.textContent;
            });
        return elementContent;*/
        
        /*if (elementContent == value){
            const tagParent = element.parentNode;
            tagParent.removeChild(element); 
        }*/
            
    }

    /* TO BE REMOVED --> callback(element) {
        return element;
    }*/
    
    hideAllTags () {
        const $$tagsAreaElementToHide = this.shadowRoot.querySelector("#tags-area");
        $$tagsAreaElementToHide.classList.add("hide");
        
    }
    
    showAllTags () {
        const $$tagsAreaElementToShow = this.shadowRoot.querySelector("#tags-area");
        $$tagsAreaElementToShow.classList.remove("hide");
    }
    
    get count () {
        const tagsAreaChildren = this.shadowRoot.querySelectorAll("#tags-area > div.tag");
        return tagsAreaChildren.length;
    }
    
    get value () {
        const tagsAreaChildren = this.shadowRoot.querySelectorAll("#tags-area > div.tag");
        
        const valueList = Array.from(tagsAreaChildren).map(function(element){
                return element.textContent;
            });
        
        return valueList;
    }
}

window.customElements.define("at-tags", TagsComponent);