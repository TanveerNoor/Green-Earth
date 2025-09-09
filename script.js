const treeShowcaseWrapper   = document.getElementById('tree-showcase-wrapper');
const categoriesWrapper     = document.getElementById('categories-wrapper');
const cartItemWrapper       = document.getElementById('cart-item-wrapper');

// Fetch API Data
const getData = async url => {
    const result = await fetch(url);
    return result.json();
}

// Display loading bar based on condition
const showLoadingBar = isShow => {
    const loadingBar = document.getElementById('loading-bar');
    if(isShow) {
        loadingBar.classList.remove('hidden');
        treeShowcaseWrapper.classList.add('hidden');
    } else {
        loadingBar.classList.add('hidden');
        treeShowcaseWrapper.classList.remove('hidden');
    }
}

// Get Category by passing API URL
const getCategory = () => {
    getData('https://openapi.programming-hero.com/api/categories')
    .then(categories => showCategory(categories.categories));
}

// Show category on the UI
const showCategory = categories => {
    categories.forEach(category => {
        const {id, category_name: title} = category;
        const div = document.createElement('div');
        div.classList.add('category-label')
        div.innerHTML = `<li onclick="getAllTrees('https://openapi.programming-hero.com/api/category/${id}')" class="category-li text-base cursor-pointer p-2">${title}</li>`;
        categoriesWrapper.appendChild(div);
    });
}

// Get All Trees by passing API URL
const getAllTrees = (url = 'https://openapi.programming-hero.com/api/plants') => {
    showLoadingBar(true);
    getData(url)
    .then(plants => showAllTrees(plants.plants));
}
