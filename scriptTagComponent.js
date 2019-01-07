'use strict';

class TagsComponent extends HTMLElement {
    
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        const $$styleElement = document.createElement('style');
        $$styleElement.textContent = `:host { display: block; }
        :host(.red) { background: red; }
        #tags_area.hide > div.tag { display: none; }
        .tag { display: flex; align-items: center;
        border-radius: 5px; border: 1px solid grey;
        display: table; padding: 2px; }
        .remove-cross { width: 15px ; height: auto; } `;
        this.shadowRoot.appendChild($$styleElement);
        const input = document.createElement("input");
        input.id = "tags_input";
        this.shadowRoot.appendChild(input);
        const tags_area = document.createElement("div");
        tags_area.id = "tags_area";
        this.shadowRoot.appendChild(tags_area);
    }
    
    connectedCallback () {
        const input = this.shadowRoot.querySelector("#tags_input");
        input.addEventListener("change", this.handleEventChange.bind(this));
    }
    
    handleEventChange (event) {
        var textInputted = event.target.value;
        console.log(textInputted);
        this.addTag(textInputted);
        event.target.value = "";
        this.dispatchEvent(new Event(event.type, event));
        event.stopPropagation();
    }
    
    
    addTag (value) {
        const div = document.createElement("div");
        const span = document.createElement("span");
        const img = document.createElement("img");
        img.setAttribute("src", "Icons/Icons/Basic/Close.svg");
        img.classList.add("remove-cross");
        img.addEventListener("click", this.handleEventClickRemove.bind(this));
        span.textContent = value;
        div.appendChild(span);
        div.appendChild(img);
        div.classList.add("tag");
        const tags_area = this.shadowRoot.querySelector("#tags_area");
        tags_area.appendChild(div);
    }
    
    handleEventClickRemove(event) {
        const parentTag = event.target.parentNode;
        if (event.target) {
            this.removeTag(parentTag);
        }
    }

    removeTag (element) {
        element.parentNode.removeChild(element);//accept a tag element
    }
    
    removeTagByValue (value) {
        const tagList = this.shadowRoot.querySelectorAll("#tags_area > div.tag");
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

    callback(element) {
        return element;
    }
    
    hideAllTags () {
        const tags_area = this.shadowRoot.querySelector("#tags_area");
        tags_area.classList.add("hide");
        
    }
    
    showAllTags () {
        const tags_area = this.shadowRoot.querySelector("#tags_area");
        tags_area.classList.remove("hide");
    }
    
    get count () {
        const tagsAreaChildren = this.shadowRoot.querySelectorAll("#tags_area > div.tag");
        return tagsAreaChildren.length;
    }
    
    get value() {
        const tagsAreaChildren = this.shadowRoot.querySelectorAll("#tags_area > div.tag");
        
        const valueList = Array.from(tagsAreaChildren).map(function(element){
                return element.textContent ;
            });
        
        return valueList;
    }
}

window.customElements.define("at-tags", TagsComponent);