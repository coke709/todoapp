let addLocalStorage = (k,v) =>{

    let items = JSON.parse(localStorage.getItem(k));
    
    if(items){
        items.push(v);
        localStorage.setItem(k, JSON.stringify(items));
    }else{
        localStorage.setItem(k, JSON.stringify([v]));
    }
}

let addSessionStorage = (k,v) =>{
    let items = JSON.parse(sessionStorage.getItem(k));
    
    if(items){
        items.push(v);
        sessionStorage.setItem(k, JSON.stringify(items));
    }else{
        sessionStorage.setItem(k, JSON.stringify([v]));
    }
}

let getLocalStorage = k => {
    let items = JSON.parse(localStorage.getItem(k));
    if(!items) return null;
    return items.length != 1 ? items : items[0];
}

let getSessionStorage = k => {
    let items = JSON.parse(sessionStorage.getItem(k));
    if(!items) return null;
    return items.length != 1 ? items : items[0];
}