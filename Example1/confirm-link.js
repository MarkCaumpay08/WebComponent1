class ConfirmLink extends HTMLAnchorElement{
    constructor(){
        super();
    }
    connectedCallback(){
        this.addEventListener('click', event => {
            if(!confirm('Do you really want to leave?')){
                event.preventDefault();
            }
        })
    }
}
//note: when passing a specific element (like HTMLAnchorElement) needs a third argument w/c an object. Extends to built in tag(like 'a')
//note: when passing a generic element (like HTMLElement) need only a two arguments
customElements.define('my-confirm-link', ConfirmLink, {extends: 'a'});