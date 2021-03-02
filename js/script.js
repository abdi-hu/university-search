let univData = {};

const $webPage = $('.webPage');
const $country = $('.country');
const $input = $('#input')
const $name = $('.name')
const $container = $('.container');


const BASE_URL = 'http://universities.hipolabs.com/search?name='

//submit event listener 
$('form').on('submit', handleSubmit);

//function run on every submit
function handleSubmit(evt) {
    evt.preventDefault();
    let $searchTerm = $input.val()
    $.ajax(BASE_URL + $searchTerm).then(function (data) {
        univData = data;
        render();
        console.log(univData)
        //If error is returned
    }, function (error) {
        console.log('Error ', error);
    })
}
function render() {
    let row = ``
    $.each(univData, (index, univ) => {
        row += `
        <div class="univ">
        <h3 class="name">${univ.name}</h3>
        <div>
            <p class="webPage">${univ.web_pages}</p>
            <p class="country">${univ.country}</p>
        </div>
        </div>
        `;
    });
    $('.container').html(row);
}

