class customButton extends HTMLElement{
    constructor(){
        super();
        //console.log(`Hello World!`);
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
                                    <button id="customButton"><slot>Show</slot></button>
                                    <p id="info-box"></p>
                                    <style>
                                        #info-box{
                                            display: none;
                                        }
                                    </style>
                                    `;
        this._showBtnMessage = `Show`;
        this._hideBtnMessage = `Hide`;
        this._infoBoxMessage = `More infos!`;
    }

    connectedCallback(){
        if(this.hasAttribute('info-message')){
            this._infoBoxMessage = this.getAttribute('info-message');
        }
        const cstmButton = this.shadowRoot.querySelector('#customButton');
        cstmButton.addEventListener('click',this._configInfoBox.bind(this));
        const cstmInfoBox = this.shadowRoot.querySelector('#info-box');
        cstmInfoBox.textContent = this._infoBoxMessage;
    }

    _configInfoBox(){
        const cstmInfoBox = this.shadowRoot.querySelector('#info-box');
        const cstmButton = this.shadowRoot.querySelector('#customButton');
        if(cstmInfoBox.style.display =='none'){
            cstmInfoBox.style.display = 'block';
            cstmButton.textContent = this._hideBtnMessage;
        }else {
            cstmInfoBox.style.display = 'none';
            cstmButton.textContent = this._showBtnMessage;
        }
    }

    
    
}

customElements.define('my-first-component', customButton);