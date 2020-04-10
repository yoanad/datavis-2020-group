import 'normalize.css/normalize.css';
import './styles/index.scss';

import dollImgSrc from './assets/images/doll.png';
import shirtImgSrc from './assets/images/tshirt-generic.png';
import jeansImgSrc from './assets/images/jeans-generic.png';

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.doll').src = dollImgSrc;

    const selectedTshirts = document.querySelector('.selected-tshirts');
    const selectedJeans = document.querySelector('.selected-jeans');
    const tshirtCards = document.querySelectorAll('.tshirt-card');
    const jeansCards = document.querySelectorAll('.jeans-card');

    const updateCost = () => {
        const activeJeans = selectedTshirts.querySelector('.active');
        const activeTshirt = selectedJeans.querySelector('.active');

        const jeansCost = activeJeans ? activeJeans.dataset.val * 0.00075: 0;
        const tshirtCost = activeTshirt ? activeTshirt.dataset.val * 0.00025 : 0;
        const totalCost =  parseFloat(jeansCost, 0) + parseFloat(tshirtCost, 0);

        document.querySelector('#total-cost').textContent = `${totalCost} litres`;
        document.querySelector('#total-cost').dataset.val = totalCost; 

        const drinkingCost = drinkingWaterDays(totalCost);
        document.querySelector('#days').textContent = `${drinkingCost} days`;

        pourWater();
    }

    const pourWater = () => {
        const cup = document.querySelector('.cup');

        if (cup.classList.contains("cup-pour")) {
            cup.classList.remove('cup-pour');
        }

        setTimeout(() => {
            cup.classList.add('cup-pour');
        }, 1000)
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
        const id = event.currentTarget.dataset.id;
        const shirtToWear = selectedTshirts.querySelector(`#selected-tshirt-${id}`);

        selectOneItem(tshirtCards, event.currentTarget);
        selectOneItem(selectedTshirts.querySelectorAll('img'), shirtToWear);
        updateCost();
    }

    const selectJeans = (event) => {
        const id = event.currentTarget.dataset.id;
        const jeansToWear = selectedJeans.querySelector(`#selected-jeans-${id}`);

        selectOneItem(jeansCards, event.currentTarget);
        selectOneItem(selectedJeans.querySelectorAll('img'), jeansToWear);
        updateCost();
    }

    const drinkingWaterDays = (litres) => {
        return parseFloat(litres / 1.2).toFixed(2);
    }

    document.querySelectorAll('.tshirt-card').forEach((el)=> {
        el.addEventListener('click', selectTshirt);
    })

    document.querySelectorAll('.jeans-card').forEach((el)=> {
        el.addEventListener('click', selectJeans);
    })

    //Tmp setting of images
    const tshirts = document.querySelectorAll('.tshirt');
    const jeans = document.querySelectorAll('.jeans');

    tshirts.forEach((el)=> {
        el.src = shirtImgSrc;
    });

    jeans.forEach((el)=> {
        el.src = jeansImgSrc;
    });
});
