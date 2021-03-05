$(function () {
    //Declaring variables
    let univData = {};

    const $webPage = $('.webPage');
    const $country = $('.country');
    const $input = $('#input')
    const $name = $('.name')
    const $container = $('#container');
    const $selCountry = $('#selCountry')


    //Base url used with ajax request
    const BASE_URL = 'https://universities.hipolabs.com/search?name='

    //Event listener for submiting the search
    $('form').on('submit', handleSubmit);

    //function run on every submit
    function handleSubmit(evt) {
        evt.preventDefault();
        let $searchTerm = $input.val()
        let $cnt = `&country=${$selCountry.val()}`

        //removes appended pagination on the subsequent search
        $('.page-item').remove();

        $.ajax(BASE_URL + $searchTerm + $cnt).then(function (data) {
            univData = data;

            //function to render the content on the page
            render();
            // Function to establish pagination 
            applyPagination();
            //If error is returned during the AJAX request
        }, function (error) {
            console.log('Error ', error);
        })
    }
    // Function to render the content from the API onto the DOM
    function render() {
        //variable to create each university object using the JQuery each method
        let univCard = ``
        $.each(univData, (index, univ) => {
            univCard +=
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
        // Each content pulled is appened to the 'container' div
        $('#container').html(univCard);
    }
    //Function for pagination 
    function applyPagination() {
        //Establishing the amount of pages based on data returned
        const numberOfUniv = $("#container .card").length;
        const limitPerPage = 6;
        //gt selector to hide page after the page limit is reached
        $(`#container .card:gt("${limitPerPage - 1}")`).hide()
        const totalPages = Math.round(numberOfUniv / limitPerPage)
        $('.pagination').append(`<li class="page-item disabled"><a class="page-link" href="#">&laquo;</a></li><li class="page-item active current-page"><a class="page-link" href="#">1</a></li>`)

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


}); // IIFE to protect global scope


{/* <li class="page-item disabled"><a class="page-link" href="#">&laquo;</a></li> */ }
