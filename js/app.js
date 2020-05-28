// const BREEDS_URL = 'https://dog.ceo/api/breeds/image/random';

// function addDoggo() {
//     fetch(BREEDS_URL)  // fetch is the AJAX part
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             const img = document.createElement('img');
//             img.src = data.message;
//             img.alt = 'Cute doggo';
    
//             document.querySelector('.doggos').appendChild(img);

//             // stop showing loading spinner
//         })
// }

// document.querySelector('.add-doggo').addEventListener
// ("click", addDoggo);

// above code was for a button called "Add Doggo" which we later removed

const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";
const select = document.querySelector('.breeds');

fetch(BREEDS_URL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data);
        const breedsObject = data.message;
        const breedsArray = Object.keys(breedsObject);

        for(let i = 0; i < breedsArray.length; i++) {
            const option = document.createElement('option');
            option.value = breedsArray[i];
            option.innerText = breedsArray[i];
            select.appendChild(option);
        }
    })

    select.addEventListener("change", function(event) {

        let url = `https://dog.ceo/api/breed/${event.target.value}/images/random`;   // event.target.value === select
        
        getDoggo(url);

        // make URL

        // show loading spinner
        
        // fetch from the API

        // use the URL to change the current image (make another function)

        // stop showing loading spinner

    });

const img = document.querySelector('.dog-img');
const spinner = document.querySelector('.spinner');

function getDoggo(url) {
    spinner.classList.add('show');
    img.classList.remove('show');
    fetch(url)
        .then(function(response) {  // (response) is a parameter - can be called anything, i.e. (res)
            return response.json()
        })
        .then(function(data) {
            img.src = data.message;
            // spinner.classList.remove('show');
            // img.classList.add('show');
        })
    
}

img.addEventListener('load', function() {
    spinner.classList.remove('show');
    img.classList.add('show');
})
    