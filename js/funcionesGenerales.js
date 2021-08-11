

export const functions = class Functions {
    constructor(){

    }

    hideInterface(element){
        element.style.display = 'none';
    }

    showInterface(element, display){
        element.style.display = display
    }

    changeSrc(element,value){
        element.src = value;
    }

    removeTextNodes(node){
        node.forEach((element)=>{
            if(element.nodeType === 3 && !/\S/.test(element.nodeValue)){
                element.parentNode.removeChild(element);    
            }
        })
    }

    zoom(element, size){
        element.style.transition = 'all .5s'
        element.style.transform = `scale(${size})`
    }
}