$(function () {
    //Declaring variables
    let univData = {};

    const $webPage = $('.webPage');
    const $country = $('.country');
    const $input = $('#input');
    const $name = $('.name');
    const $container = $('#container');
    const $selCountry = $('#selCountry');


    //Base url used with ajax request
    const BASE_URL = 'http://universities.hipolabs.com/search?name=';

    //Event listener for submiting the search
    $('form').on('submit', handleSubmit);

    //function run on every submit
    function handleSubmit(evt) {
        evt.preventDefault();
        let $searchTerm = $input.val();
        let $cnt = `&country=${$selCountry.val()}`;

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
        let univCard = ``;
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
        //Establishing the amount of pages based on data returned. card class represents each university found on the search
        const numberOfUniv = $("#container .card").length;
        const limitPerPage = 6;
        //used the gt selector to hide page after the page limit is reached. gt slector uses index of the page and works similar to the slice method. 
        $(`#container .card:gt('${limitPerPage - 1}')`).hide()
        const totalPages = Math.round(numberOfUniv / limitPerPage);

        //Appends the previous and first page buttons. Set page 1's class to 'active' which is highlighted by Bootstrap styling.
        $('.pagination').append(`
        <li class="page-item prev-page "><a class="page-link" href="#">&laquo;</a></li>
        <li class="page-item active current-page"><a class="page-link" href="#">1</a></li>`
        );

        //For loop to append additioinal page numbers based on total pages. Loop starts at 2 since page 1 is allways appended on a search.
        for (let i = 2; i <= totalPages; i++) {
            $('.pagination').append(`<li class="page-item current-page"><a class="page-link" href="#">${i}</a></li>`);
        }
        $('.pagination').append(`<li class="page-item next-page"><a class="page-link" href="#">&raquo;</a></li>`);

        //Button functionality to link each number button. Whichever button is selected, is set to active  
        $('.pagination li.current-page').on('click', function () {
            if ($(this).hasClass('active')) {
                //Insures nothing is changed if user selects page they are already at
                return false;
            } else {
                let currentPage = $(this).index();
                //removes active class from all items
                $('.pagination li').removeClass('active');
                //sets active class to page clicked/selected 
                $(this).addClass('active');
                //hides all the card data
                $('#container .card').hide();

                //current total based on the page number selected
                let currentTotal = limitPerPage * currentPage;
                // Displays the corresponding card data for the selected page. eq selector used to index the data at the specific page.
                for (let i = currentTotal - limitPerPage; i < currentTotal; i++) {
                    $(`#container .card:eq(${i})`).show();
                }
            }

        });
        //next button functionality
        $('.next-page').on('click', function () {
            //current page is set by the index of the page number with the 'active' class
            let currentPage = $('.pagination li.active').index();

            if (currentPage === totalPages) {
                //Once user is at the last page, next button should do nothing
                return false;
            } else {
                //increment page number on every click
                currentPage++;
                //remove 'active' class from all page numbers
                $('.pagination li').removeClass('active');
                //hide card data
                $('#container .card').hide();

                let currentTotal = limitPerPage * currentPage;
                //displace card data based on current indexed page
                for (let i = currentTotal - limitPerPage; i < currentTotal; i++) {
                    $(`#container .card:eq(${i})`).show();
                }
                //sets current page with the 'active class
                $(`.pagination li.current-page:eq(${currentPage - 1})`).addClass('active');
            }

        });

        //Almost exactly the same as next button, except current page is decremented and return false is set to page 1
        $('.prev-page').on('click', function () {
            var currentPage = $('.pagination li.active').index();
            if (currentPage === 1) {
                return false;
            } else {
                currentPage--;
                $('.pagination li').removeClass('active');
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