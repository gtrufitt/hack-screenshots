const removeElement = element => {
    console.log(element);
    element.parentNode.removeChild(element);
};

// Just remove some of the more annoying ad elements
// TODO: use something like easylist to more accurately block
module.exports = () => {
    console.log('removing elements');
    [...document.querySelectorAll('.advert--banner-portal')].forEach(
        removeElement
    );
};
