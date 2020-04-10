import 'normalize.css/normalize.css';
import './styles/index.scss';

import dollImgSrc from './assets/images/doll.png';
import shirtImgSrc from './assets/images/tshirt-generic.png';
import jeansImgSrc from './assets/images/jeans-generic.png';


document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.doll').src = dollImgSrc;

    // const tshirts = document.querySelector('.t-shirts-wrapper');
    // const jeans = document.querySelector('.jeans-wrapper');
    const selectedTshirts = document.querySelector('.selected-tshirts');
    const selectedJeans = document.querySelector('.selected-jeans');
    const tshirtCard = document.querySelector('.tshirt-card');
    const jeansCard = document.querySelector('.jeans-card');


    const updateCost = () => {
        const activeJeans = selectedTshirts.querySelector('.active');
        const activeTshirt = selectedJeans.querySelector('.active');

        const jeansCost = activeJeans ? activeJeans.dataset.val * 0.00075: 0;
        const tshirtCost = activeTshirt ? activeTshirt.dataset.val * 0.00025 : 0;
        const totalCost =  parseFloat(jeansCost, 0) + parseFloat(tshirtCost, 0);

        document.querySelector('#total-cost').textContent = `${totalCost} litres`;

        const drinkingCost = drinkingWaterDays(totalCost);
        document.querySelector('#days').textContent = `${drinkingCost} days`;

        pourWater();
    }

    const pourWater = () => {
        document.querySelector('.water').classList.add('water-animate');
    }

    const drainWater = () => {
        const water = document.querySelector('.water');
        if (water.classList.contains("active")) {
            water.classList.remove('water-animate');
        }
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

    const drinkingWaterDays = (litres) => {
        return parseFloat(litres / 1.2);
    }

    tshirtCard.addEventListener('click', selectTshirt);
    jeansCard.addEventListener('click', selectJeans);

    //Tmp setting of images
    // TODO: fix this after final images 


    const tshirts = document.querySelectorAll('.tshirt');
    const jeans = document.querySelectorAll('.jeans');

    tshirts.forEach((el)=> {
        el.src = shirtImgSrc;
    });

    jeans.forEach((el)=> {
        el.src = jeansImgSrc;
    });
});
