// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// const getSavedCartItems = require("./helpers/getSavedCartItems");

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

const itemCarrinho = document.querySelector('.cart__items');

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('span.item_id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', (tirar) => {
    itemCarrinho.removeChild(tirar.target);
  });
  return li;
};

// const tiposProdutos = async () => {
//   const tipos = await fetchProducts('computador');
//   tipos.forEach((e) => {
//     const produtos = document.querySelector('.items');
//     produtos.appendChild(createProductItemElement(e));
//   });
// };

const tiposProdutos = async () => {
  const item = document.querySelector('.items');
  const produtos = await fetchProducts('computador');
  produtos.results.forEach((e) => {
    item.appendChild(createProductItemElement(e));
  });
};

const addCarrinho = async () => {
  const btn = document.querySelectorAll('.item__add');
  btn.forEach((btt) => {
  btt.addEventListener('click', async (event) => {
    const e = event.target.parentNode.firstChild;
    const carrinho = await fetchItem(e.innerText);
    itemCarrinho.appendChild(createCartItemElement(carrinho));
    saveCartItems(itemCarrinho.innerHTML);
    });
  });
};

// const salvarStorage = async () => {
//   const itensCarrinho = document.querySelector('.cart__items');
//   const pegarItems = await getSavedCartItems();
//   pegarItems = itensCarrinho.innerHTML;
// }

const limparCarrinho = () => {
  const btnLimpar = document.querySelector('.empty-cart');
  btnLimpar.addEventListener('click', () => {
    itemCarrinho.innerHTML = '';
  });
};

const carregando = () => {
  const load = document.querySelector('.container');
  load.appendChild(createCustomElement('div', 'loading', 'carregando...'));
};

const retiraCarregando = () => {
  const offload = document.querySelector('div.loading');
  offload.remove();
};

window.onload = async () => { 
  carregando();
  await tiposProdutos();
  await addCarrinho();
  // await salvarStorage();
  limparCarrinho();
  retiraCarregando();
};
