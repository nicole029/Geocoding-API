
const goBtnEl = document.querySelector( '#go' );
const addressField = document.querySelector( '#address' );
const mapArea = document.querySelector( '#results' );
const recenterBtnEl = document.querySelector( '#recenter' );
let latLng = {};
let gmaps = new Object;
let gmapsInit = false;
const geocodeURI = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const apiKey = 'YOUR_API_KEY';

var script = document.createElement( 'script' );
script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey;
script.async = true;
document.body.appendChild(script);

goBtnEl.addEventListener( 'click', (event) => {
    event.preventDefault();
    let fetchURL = geocodeURI + encodeURIComponent(addressField.value) + '&key=' + apiKey;
    fetch( fetchURL ).then( response => response.json() ).then( (data) =>{
        latLng = data.results[0].geometry.location;
        let formattedAddress = data.results[0].formatted_address;
        gmaps = new google.maps.Map( mapArea,{
            zoom : 19,
            center: latLng
        } );
        let marker = new google.maps.Marker({
            position: latLng,
            title: formattedAddress
        });
        marker.setMap( gmaps );
    } );
} );
recenterBtnEl.addEventListener( 'click', ( event ) => {
    event.preventDefault();
    gmaps.setCenter( latLng );
} );