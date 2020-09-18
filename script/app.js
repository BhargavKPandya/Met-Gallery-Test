window.onload = () => {

  const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=fall';

  (async () => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    });
    const result = await response.json();
    let objectIds = result.objectIDs;
    let final = objectIds.slice(25, 50);
    for (let i = 0; i < final.length; i++) {
      const url2 = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${final[i]}`;
      (async () => {
        const response2 = await fetch(url2, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify()
        });
        const result2 = await response2.json();
        //console.log(result2.primaryImageSmall);  
        //console.log(result2.title); 
        //console.log(result2.artistDisplayName);  
        //console.log(result2.objectURL)  
        const metGallery = document.querySelector('.info');
        metGallery.insertAdjacentHTML("afterend", appendData(result2));
      })();
    }
  })();

  function appendData(data) {
    return `<div class="row">
            <div class="column">
                <div class="card">
                     <h3>${data.title}</h3>
                     <img src="${data.primaryImageSmall}">
                     <p>${data.artistDisplayName}</p>
                     <a href="${data.objectURL}" target="_blank">${data.objectURL}</a>
                     <button class="save" onClick="personalGallery('${data.title}','${data.primaryImageSmall}','${data.artistDisplayName}','${data.objectURL}');">Save to Personal</button>
                </div>
            </div>
         </div>`
  }

}

function personalGallery(title, image, name, url) {
  const personalList = document.querySelector('.personal-gallery');
  personalList.insertAdjacentHTML("afterend", `<div class="row-personal">
  <div class="column">
      <div class="card-personal">
           <h3>${title}</h3>
           <img src="${image}">
           <p>${name}</p>
           <a href="${url}" target="_blank">${url}</a>
      </div>
  </div>
</div>`);
}

