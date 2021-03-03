let univData = {};

//
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
        //function to render the content on the page
        render();
        //If error is returned
    }, function (error) {
        console.log('Error ', error);
    })
}
function render() {
    let row = ``
    $.each(univData, (index, univ) => {
        row +=
            `
        <div class="card border-success mb-3" style="max-width: 20rem;">
            <div class="card-header">${univ.country}</div>
                <div class="card-body">
                    <h4 class="card-title">${univ.name}</h4>
                    <p class="card-text"><a href="${univ.web_pages}" target="_blank">Website</a></p>
                </div>
            </div>
        </div>
        `
    });
    $('.container').html(row);
}
