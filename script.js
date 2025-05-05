// Função para compra via WhatsApp
function comprarWhatsApp(nomeProduto, preco) {
    const numeroWhatsApp = "+558892927689"; // Substitua pelo seu número
    const mensagem = `Olá, Jeito de Isa! Gostaria de comprar:\n\n*Produto:* ${nomeProduto}\n*Preço:* R$ ${preco.toFixed(2)}\n\nPoderia me ajudar?`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(url, '_blank');
}

// Carrinho de Compras
let carrinho = [];
const carrinhoElement = document.getElementById('carrinho');
const carrinhoItensElement = document.getElementById('carrinho-itens');
const carrinhoContadorElement = document.getElementById('carrinho-contador');
const carrinhoTotalElement = document.getElementById('carrinho-total');
const finalizarPedidoBtn = document.getElementById('finalizar-pedido');
const limparCarrinhoBtn = document.getElementById('limpar-carrinho');

// Ícone do carrinho flutuante
const iconeCarrinho = document.createElement('div');
iconeCarrinho.className = 'icone-carrinho';
iconeCarrinho.innerHTML = '<i class="fas fa-shopping-bag"></i><span>0</span>';
iconeCarrinho.addEventListener('click', toggleCarrinho);
document.body.appendChild(iconeCarrinho);

// Funções do Carrinho
function toggleCarrinho() {
    carrinhoElement.classList.toggle('aberto');
}

function atualizarCarrinho() {
    carrinhoItensElement.innerHTML = '';
    let total = 0;
    
    carrinho.forEach((item, index) => {
        total += item.preco;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'item-carrinho';
        itemElement.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <div class="item-carrinho-info">
                <h4>${item.nome}</h4>
                <p>R$ ${item.preco.toFixed(2)}</p>
            </div>
            <button class="remover-item" onclick="removerDoCarrinho(${index})">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        carrinhoItensElement.appendChild(itemElement);
    });
    
    carrinhoTotalElement.textContent = `R$ ${total.toFixed(2)}`;
    carrinhoContadorElement.textContent = carrinho.length;
    iconeCarrinho.querySelector('span').textContent = carrinho.length;
}

function adicionarAoCarrinho(nome, preco, imagem) {
    carrinho.push({
        nome: nome,
        preco: preco,
        imagem: imagem || 'img/produto-padrao.jpg' // Imagem padrão se não houver
    });
    
    atualizarCarrinho();
    carrinhoElement.classList.add('aberto');
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function limparCarrinho() {
    carrinho = [];
    atualizarCarrinho();
}

// Finalizar pedido via WhatsApp
function finalizarPedidoWhatsApp() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    const numeroWhatsApp = "+558892927689"; // Seu número aqui
    let mensagem = `Olá, Jeito de Isa! Gostaria de comprar os seguintes itens:\n\n`;
    
    carrinho.forEach(item => {
        mensagem += `✔ ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
    });
    
    mensagem += `\n*Total: R$ ${carrinho.reduce((total, item) => total + item.preco, 0).toFixed(2)}*`;
    mensagem += `\n\nPor favor, me informe as formas de pagamento disponíveis.`;
    
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

// Event Listeners
finalizarPedidoBtn.addEventListener('click', finalizarPedidoWhatsApp);
limparCarrinhoBtn.addEventListener('click', limparCarrinho);

// Modificar os botões "Comprar" para adicionar ao carrinho
document.querySelectorAll('.produto button').forEach(button => {
    button.addEventListener('click', function() {
        const produto = this.closest('.produto');
        const nome = produto.querySelector('h3').textContent;
        const preco = parseFloat(produto.querySelector('.preco').textContent.replace('R$ ', '').replace(',', '.'));
        const imagem = produto.querySelector('img').src;
        
        adicionarAoCarrinho(nome, preco, imagem);
    });
});

// Fechar carrinho com o botão X
document.querySelector('.fechar-carrinho').addEventListener('click', toggleCarrinho);

// Fechar carrinho ao clicar fora (opcional)
document.addEventListener('click', (e) => {
    if (!carrinhoElement.contains(e.target) && 
        !iconeCarrinho.contains(e.target) && 
        carrinhoElement.classList.contains('aberto')) {
        toggleCarrinho();
    }
});

// Filtro de produtos
document.querySelectorAll('.filtro').forEach(button => {
    button.addEventListener('click', () => {
        // Remove classe ativa de todos os botões
        document.querySelectorAll('.filtro').forEach(btn => btn.classList.remove('ativo'));
        
        // Adiciona classe ativa ao botão clicado
        button.classList.add('ativo');
        
        const categoria = button.dataset.categoria;
        
        // Filtra os produtos (implemente sua lógica de filtro aqui)
        if (categoria === 'todas') {
            document.querySelectorAll('.produto').forEach(prod => prod.style.display = 'block');
        } else {
            document.querySelectorAll('.produto').forEach(prod => {
                prod.style.display = prod.classList.contains(categoria) ? 'block' : 'none';
            });
        }
    });
});