let univData = {};

//
const $webPage = $('.webPage');
const $country = $('.country');
const $input = $('#input')
const $name = $('.name')
const $container = $('#container');
const $selCountry = $('#selCountry')



const BASE_URL = 'http://universities.hipolabs.com/search?name='

//submit event listener 
$('form').on('submit', handleSubmit);

//function run on every submit
function handleSubmit(evt) {
    evt.preventDefault();
    let $searchTerm = $input.val()
    let $cnt = `&country=${$selCountry.val()}`

    $.ajax(BASE_URL + $searchTerm + $cnt).then(function (data) {
        univData = data;
        //function to render the content on the page
        render();
        //pagination 
        applyPagination();
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
        <div class="card border-info mb-3" style="max-width: 20rem;">
            <div class="card-header">${univ.country}</div>
                <div class="card-body">
                    <h4 class="card-title">${univ.name}</h4>
                    <p class="card-text"><a href="${univ.web_pages}" target="_blank">Website</a></p>
                </div>
            </div>
        </div>
        `
    });
    $('#container').html(row);
}

function applyPagination() {
    //establishing the amount of pages based on data returned
    const numberOfUniv = $("#container .card").length;
    const limitPerPage = 6;
    //gt selector to hide page after the page limit is reached
    $(`#container .card:gt("${limitPerPage - 1}")`).hide()
    const totalPages = Math.round(numberOfUniv / limitPerPage)
    $('.pagination').append(`<li class="page-item active current-page"><a class="page-link" href="#">1</a></li>`)

    for (let i = 2; i <= totalPages; i++) {
        $('.pagination').append(`<li class="page-item current-page"><a class="page-link" href="#">${i}</a></li>`)
    }
    $('.pagination').append(`<li class="page-item next-page"><a class="page-link" href="#">&raquo;</a></li>`)

    $('.pagination li.current-page').on('click', function () {
        if ($(this).hasClass('active')) {
            return false;
        } else {
            var currentPage = $(this).index();
            $('.pagination li').removeClass('active');
            $(this).addClass('active');
            $('#container .card').hide();

            let currentTotal = limitPerPage * currentPage

            for (let i = currentTotal - limitPerPage; i < currentTotal; i++) {
                $(`#container .card:eq(${i})`).show();
            }
        }

    });
    $('.next-page').on('click', function () {
        var currentPage = $('.pagination li.active').index();
        if (currentPage === totalPages) {
            return false;
        } else {
            currentPage++;
            $('.pagination li').removeClass('active')
            $('#container .card').hide();

            let currentTotal = limitPerPage * currentPage;

            for (let i = currentTotal - limitPerPage; i < currentTotal; i++) {
                $(`#container .card:eq(${i})`).show();
            }
            $(`.pagination li.current-page:eq(${currentPage - 1})`).addClass('active');
        }

    });
}


