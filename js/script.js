let univData;

const $webPage = $('.webPage');
const $country = $('.country');
const $input = $('#input')
const $name = $('.name')


const BASE_URL = 'http://universities.hipolabs.com/search?name='

$('form').on('submit', handleSubmit);

function handleSubmit(evt) {
    evt.preventDefault();
    let $searchTerm = $input.val()
    $.ajax(BASE_URL + $searchTerm).then(function (data) {
        univData = data;
        console.log(data);
        render();

    }, function (error) {
        console.log('Error ', error);
    })
}
function render() {
    $webPage.text(univData[0].web_pages);
    $name.text(univData[0].name);
    $country.text(univData[0].country);
}