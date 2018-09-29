import $ from 'jquery';
import slick from 'slick-carousel';

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
    topNav.classList.toggle('w-full');
    topNav.classList.toggle('text-center');
    var children = topNav.getElementsByTagName("*");
    children.classList.toggle('w-full');
    children.classList.toggle('p-3');
}