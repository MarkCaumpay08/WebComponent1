class Tooltip extends HTMLElement{
    constructor(){
         super();
         //this._tooltipContainer;
         this._tooltipText = 'Some dummy tooltip';
         this._TooltipIcon;
         this._toolTipVisible = false;
         this.attachShadow({mode: 'open'}); //Adding a shadow tree. Adds 'shadowRoot' when appending a child
        //const template = document.querySelector('#tooltip-template');
        //this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.innerHTML = 
                    `   <style>
                            div {
                                font-weight: normal;
                                background-color:black;
                                color: white;
                                position: absolute;
                                top: 1.5rem;
                                left: 0.75rem;
                                z-index: 10;
                                padding: 0.15rem;
                                border-radius: 3px;
                                box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
                            }

                            .highlight {
                                background-color: red;
                            }

                            ::slotted(.highlight){
                                border-bottom: 2px dotted red;
                            }
                            
                            :host{
                                position:relative;
                            }
                            :host(.important){
                                /* background-color: #ccc; */
                                background: var(--color-primary, #ccc);
                                padding: 0.15rem;
                            }

                            :host-context(p){
                                font-weight: bold;
                            }
                            
                            .icon{
                                background-color: black;
                                color: white;
                                padding: 0.15rem 0.5rem;
                                text-align:center;
                                border-radius: 50%;
                            }

                            
                        </style>
                        <slot>Default Text from slot</slot>
                        <span class='icon'>?</span>

                        
                    `;
        }

    connectedCallback(){
        if(this.hasAttribute('text')){
            this._tooltipText = this.getAttribute('text');
        }
        //const toopTipIcon = document.createElement('span');
        //toopTipIcon.textContent = '(?)';
        this._TooltipIcon = this.shadowRoot.querySelector('span');
        this._TooltipIcon.addEventListener('mouseenter', this._showToolTip.bind(this));
        this._TooltipIcon.addEventListener('mouseleave', this._hideToolTip.bind(this));
        //this.shadowRoot.appendChild(toopTipIcon);
        //this.style.position = 'relative';
        this._render();
    }

    //receives three values name, oldValue, newValue
    attributeChangedCallback(name, oldValue, newValue){
        //console.log(name, oldValue, newValue);
        if(oldValue === newValue){
            return;
        }

        if(name === 'text') {
            this._tooltipText = newValue;

        }
        
    }

    //adding property
    static get observedAttributes(){
        return ['text']; //listening to 'text' attribute
    }

    disconnectedCallback(){
        console.log('Disconnected');
        this._TooltipIcon.removeEventListener('mouseenter', this._showToolTip);
        this._TooltipIcon.removeEventListener('mouseleave', this._hideToolTip);
        
    }

    _render(){
        let tooltipContainer = this.shadowRoot.querySelector('div');
        if(this._toolTipVisible){
            tooltipContainer = document.createElement('div');
            tooltipContainer.textContent = this._tooltipText;
            this.shadowRoot.appendChild(tooltipContainer);
        }else{
            if(tooltipContainer){
                this.shadowRoot.removeChild(tooltipContainer);
            }
        }
    }

    
    _showToolTip(){
        this._toolTipVisible = true;
        this._render();
        /*
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        //this._tooltipContainer.style.backgroundColor = 'black';
        //this._tooltipContainer.style.color = 'white';
        //this._tooltipContainer.style.position  = 'absolute';
        //this._tooltipContainer.style.zIndex = '10';
        this.shadowRoot.appendChild(this._tooltipContainer);
        */
    }
    
    _hideToolTip(){
        this._toolTipVisible = false;
        this._render();
       /*
        this.shadowRoot.removeChild(this._tooltipContainer);
        */
    }
    
}

customElements.define('my-tooltip', Tooltip);