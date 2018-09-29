import $ from 'jquery';
import slick from 'slick-carousel';
import lazysizes from 'lazysizes';

// Create global functions for onclick with "window"
window.toggle = function toggle(elem) {
    console.log("test2");
    elem.classList.toggle('hidden');
}
/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
window.toggleMenu = function toggleMenu() {
    var topNav = document.getElementById("topNav");
    console.log("test");
    topNav.classList.toggle('hidden');
}