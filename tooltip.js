class Tooltip extends HTMLElement{
    
    constructor(){
        super();
        this._tooltipContainer;
        this._tooltipText = 'Some dummy tooltip text.';
        
    }
    
    connectedCallback(){
        if(this.hasAttribute('text')){
            this._tooltipText = this.getAttribute('text');
        }
        const tooltipIcon = document.createElement('span');
        tooltipIcon.textContent = '(?)';
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this)); //the this in bind(this) refers to the class
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this.appendChild(tooltipIcon);
    }

    //add an underscore for convention : method that i only want to call in class
    _showTooltip(){
        // const tooltipContainer = document.createElement('div');
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this.appendChild(this._tooltipContainer);
    }

    _hideTooltip(){
        this.removeChild(this._tooltipContainer);
    }
}

//customElements.define(String, class)
//String rule: need a double word combined with dash
//class rule: javascript class
customElements.define('my-tooltip', Tooltip);