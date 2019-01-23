'use strict';

class TagsComponent extends HTMLElement {
    
    /**
     * Represents a web component
     * @constructor
     */
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        const $$styleElement = document.createElement('style');
        $$styleElement.textContent = `
        :host {
            display: block;
            --tag-bg-color: #fafbfb;
            --input-bg-color: #fff;
            --border: 1px solid #e1e5e8;
            --svg-fill-color: #475f7b;
            --placeholder-color: rgba(48, 65, 86, 0.5);
        }
        #tags-area {
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;
        }
        #tags-area.hide > div.tag {
            display: none;
        }
        #tags-input {
            width: 100%;
            border: var(--border);
            border-radius: 4px;
            font-family: inherit;
            color: inherit;
            padding: 5px;
            font-size: 1em;
            background-color: var(--input-bg-color);
        }
        .tag {
            display: flex;
            justify-content: space-between;
            align-items: center; 
            border: var(--border);
            border-radius: 4px;
            font-family: inherit;
            color: inherit;
            font-size: 0.85em;
            background-color: var(--tag-bg-color);
            padding: 0 5px;
            width: fit-content;
            min-width: 50px;
            height: 28px;
            margin: 0 10px 10px 0;
        }
        ::-webkit-input-placeholder{
             color: var(--placeholder-color);
        }
        ::-moz-placeholder{
             color: var(--placeholder-color);
        }
        :-ms-input-placeholder{
             color: var(--placeholder-color);
        }
        :-moz-placeholder{
            color: var(--placeholder-color);
        }
        button{
            padding: 0;
            background: transparent;
            border: none;
        }
        svg{
            fill: var(--svg-fill-color);
        }
        `;
        this.shadowRoot.appendChild($$styleElement);
        const $$inputField = document.createElement("input");
        $$inputField.id = "tags-input";
        $$inputField.setAttribute("placeholder", "Add Tag");
        this.shadowRoot.appendChild($$inputField);
        const $$tagAreaElement = document.createElement("div");
        $$tagAreaElement.id = "tags-area";
        this.shadowRoot.appendChild($$tagAreaElement);
        this.bindFunctions();
    }
    
    /** This function stands for simplifying the writing of event handlers */
    bindFunctions(){
        this.handleEventChange = this.handleEventChange.bind(this);
        this.handleEventClickRemove = this.handleEventClickRemove.bind(this);
    }
    
    /** This function is called when the element is attached to the DOM */
    connectedCallback () {
        const $$input = this.shadowRoot.querySelector("#tags-input");
        $$input.addEventListener("change", this.handleEventChange);
    }
    
    /** This function removes the event listeners from all the elements of the component when a tag is removed */
    disconnectedCallback () {
        console.log("disconnect");
        const $$input = this.shadowRoot.querySelector("#tags-input");
        const $$imageListToRemoveEventListener = this.shadowRoot.querySelectorAll(".remove-cross");
        $$input.removeEventListener("change", this.handleEventChange);
        $$imageListToRemoveEventListener.forEach((element) => {
            element.removeEventListener("click", this.handleEventClickRemove);
        });
    }
    
    /**
     * Second method to remove the event listeners from the cross buttons using a callback function
     * disconnectedCallback () {
     *      $$imageListToRemoveEventListener.forEach(this.callback.bind(this));
     * }
     *
     * callback (element) {
     *      element.removeEventListener("click", this.handleEventClickRemove);
     * }
     */
    
    
    /**
     * This event handler captures the value inputted in the input field for a tag creation
     * @param {Event} event - the change event that occurs in the tags input field
     */
    handleEventChange (event) {
        const textInputted = event.target.value;
        this.addTag(textInputted);
        event.target.value = "";
        this.dispatchEvent(new Event(event.type, event));
        event.stopPropagation();
    }
     
    /** This function creates a new tag
     * @param {string} value - the text content of the tag
     */  
    addTag (value) {
        const $$tagContainerElement = document.createElement("div");
        const $$textWrapper = document.createElement("span");
        const $$buttonRemoveElement = document.createElement("button");
        const $$tagRemoveImage = document.createElement("img");
        const $$svgContainer = document.createElement("div");
        $$svgContainer.innerHTML = `
        <svg width="10px" height="10px" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.97025,5.70725 C17.36125,5.31725 17.36125,4.68325 16.97025,4.29325 C16.58025,3.90225 15.94725,3.90225 15.55625,4.29325 L10.63225,9.21725 L5.70725,4.29325 C5.31725,3.90225 4.68325,3.90225 4.29325,4.29325 C3.90225,4.68325 3.90225,5.31725 4.29325,5.70725 L9.21725,10.63225 L4.29325,15.55625 C3.90225,15.94725 3.90225,16.58025 4.29325,16.97025 C4.68325,17.36125 5.31725,17.36125 5.70725,16.97025 L10.63225,12.04625 L15.55625,16.97025 C15.94725,17.36125 16.58025,17.36125 16.97025,16.97025 C17.36125,16.58025 17.36125,15.94725 16.97025,15.55625 L12.04625,10.63225 L16.97025,5.70725 Z"></path>
        </svg>`;
        $$tagRemoveImage.setAttribute("src", "Icons/Icons/Basic/Close.svg");
        //$$tagRemoveImage.classList.add("remove-cross");
        $$svgContainer.classList.add("remove-cross");
        $$svgContainer.addEventListener("click", this.handleEventClickRemove);
        //$$tagRemoveImage.addEventListener("click", this.handleEventClickRemove);
        $$textWrapper.textContent = value;
        $$buttonRemoveElement.appendChild($$svgContainer);
        //$$buttonRemoveElement.appendChild($$tagRemoveImage);
        $$tagContainerElement.appendChild($$textWrapper);
        $$tagContainerElement.appendChild($$buttonRemoveElement);
        $$tagContainerElement.classList.add("tag");
        const $$tagsArea = this.shadowRoot.querySelector("#tags-area");
        $$tagsArea.appendChild($$tagContainerElement);
    }
    
    /**
     * This event handler gets the parent of the tag to be removed and call the remove function
     * @param {Event} event - the event associated to the click of the remove cross button
     */
    handleEventClickRemove(event) {
        const parentTag = event.target.parentNode.parentNode.parentNode;
        if (event.target) {
            this.removeTag(parentTag);
         }
    }
    
    /**
     *This function removes a tag
     * @param {HTMLElement} element - the parent element of the tag to be removed
     */
    removeTag (element) {
        element.parentNode.removeChild(element);//accept a tag element
    }
    
    /** This API removes a tag by its text content
     * @param {string} value - the text content of the tag to be removed
     */
    removeTagByValue (value) {
        const tagList = this.shadowRoot.querySelectorAll("#tags-area > div.tag");
        tagList.forEach(function(element){
            if (element.textContent == value){
                const tagParent = element.parentNode;
                tagParent.removeChild(element);
            }
        });   
    }
    
    /** This function hides the tags area */
    hideAllTags () {
        const $$tagsAreaElementToHide = this.shadowRoot.querySelector("#tags-area");
        $$tagsAreaElementToHide.classList.add("hide");
        
    }
    
    /** This function shows the tags area */
    showAllTags () {
        const $$tagsAreaElementToShow = this.shadowRoot.querySelector("#tags-area");
        $$tagsAreaElementToShow.classList.remove("hide");
    }
    
    /** This function returns the number of children in the #tags-area element */
    get count () {
        const tagsAreaChildren = this.shadowRoot.querySelectorAll("#tags-area > div.tag");
        return tagsAreaChildren.length;
    }
    
    /** This function returns an array of the text contents associated to the children of the #tags-area element */ 
    get value () {
        const tagsAreaChildren = this.shadowRoot.querySelectorAll("#tags-area > div.tag");
        
        const valueList = Array.from(tagsAreaChildren).map(function(element){
                return element.textContent;
            });
        
        return valueList;
    }
}

/** This instruction instantiates the class TagsComponent */
window.customElements.define("at-tags", TagsComponent);