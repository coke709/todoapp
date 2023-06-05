const callBackgroundImage = async () => {
    const clientId = 'J4LZjmIHp-NloErhfJAbAfGlCaKaF9MbGm7mK2eNj0I';
    let url = `https://api.unsplash.com/photos/random?`;
 
    let params = {
        client_id:clientId,
        orientation:'landscape',
        query:'landscape'
    }
 
    let encoded = generateFormUrlEncoded(params);
    let response = await fetch(url+encoded);
    return await response.json();
}

const createUnsplashToken = async () => {
    let imgData = await callBackgroundImage();

    // 배경이미지url, 배경이미지의 장소정보, 만료일자
    let imgUrl = imgData.urls.full;
    let location = imgData.location.name?imgData.location.name:'with multicampus...';
    let expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);

    let unsplashToken = {
        url:imgUrl,
        location:location,
        expirationOn:expirationDate.getTime()
    }

    localStorage.setItem('unsplashToken', JSON.stringify(unsplashToken));
    return unsplashToken;
}

(async () => {

   let unsplashToken = JSON.parse(localStorage.getItem('unsplashToken'));

   // 토큰이 존재하지 않으면, 새로운 토큰을 생성
   // 토큰이 만료되었다면, 새로운 토큰을 생성
   let now = new Date().getTime();
   if(!unsplashToken || unsplashToken.expirationOn < now) await unsplashToken = createUnsplashToken();

   document.querySelector('body').style.backgroundImage = `url(${unsplashToken.url})`;
   placeInfo.innerHTML = unsplashToken.location;

})();
