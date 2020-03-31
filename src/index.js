import 'normalize.css/normalize.css';
import './styles/index.scss';

import dollImgSrc from './assets/images/doll.png';
import shirtImgSrc from './assets/images/tshirt.png';
import blouseImgSrc from './assets/images/blouse.png';
import shortsImgSrc from './assets/images/shorts.png';
import jeansImgSrc from './assets/images/jeans.png';

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.doll').src = dollImgSrc;

    const tshirts = document.querySelector('.t-shirts-wrapper');
    const jeans = document.querySelector('.jeans-wrapper');
    const selectedTshirts = document.querySelector('.selected-tshirts');
    const selectedJeans = document.querySelector('.selected-jeans');

    const updateCost = () => {
        const activeJeans = selectedTshirts.querySelector('.active');
        const activeTshirt = selectedJeans.querySelector('.active');
        const jeansCost = activeJeans ? activeJeans.dataset.val : 0;
        const tshirtCost = activeTshirt ? activeTshirt.dataset.val : 0;
        const totalCost =  parseInt(jeansCost, 0) + parseInt(tshirtCost, 0);

        document.querySelector('#total-cost').textContent = totalCost;
    }

    const selectOneItem = (arr, selectedEl) => {
        arr.forEach((item) => {
            if (item.classList.contains("active")) {
                item.classList.remove("active");
            }
        })
        selectedEl.classList.add("active");
    }

    const selectTshirt = (event) => {
        if (event.target.tagName === 'IMG') {
            const id = event.target.dataset.id;
            const shirtToWear = selectedTshirts.querySelector(`#selected-tshirt-${id}`);
            selectOneItem(selectedTshirts.querySelectorAll('img'), shirtToWear);
            updateCost();
        }
    }

    const selectJeans = (event) => {
        if (event.target.tagName === 'IMG') {
            const id = event.target.dataset.id;
            const jeansToWear = selectedJeans.querySelector(`#selected-jeans-${id}`);
            selectOneItem(selectedJeans.querySelectorAll('img'), jeansToWear);
            updateCost();
        }
    }

    tshirts.addEventListener('click', selectTshirt);
    jeans.addEventListener('click', selectJeans);

    //Tmp setting of images
    // TODO: fix this after final images 

    tshirts.querySelectorAll('img')[0].src = shirtImgSrc;
    tshirts.querySelectorAll('img')[1].src = blouseImgSrc;

    selectedTshirts.querySelectorAll('img')[0].src = shirtImgSrc;
    selectedTshirts.querySelectorAll('img')[1].src = blouseImgSrc;

    jeans.querySelectorAll('img')[0].src = jeansImgSrc;
    jeans.querySelectorAll('img')[1].src = shortsImgSrc;

    selectedJeans.querySelectorAll('img')[0].src = jeansImgSrc;
    selectedJeans.querySelectorAll('img')[1].src = shortsImgSrc;
});
