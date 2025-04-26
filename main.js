let pessoas = [];
let produtos = [];

function gerarId(lista) {
    return lista.length ? Math.max(...lista.map(item => item.id)) + 1 : 1;
}

function adicionarPessoa(nome) {
    if (!nome.trim()) {
        alert("Nome da pessoa não pode ser vazio.");
        return;
    }
    const novaPessoa = { id: gerarId(pessoas), nome };
    pessoas.push(novaPessoa);
    renderizarPessoas();
}

function adicionarProduto(nome, preco) {
    if (!nome.trim()) {
        alert("Nome do produto é obrigatório.");
        return;
    }
    if (preco < 0 || isNaN(preco)) {
        alert("Preço deve ser maior ou igual a zero.");
        return;
    }
    const novoProduto = { id: gerarId(produtos), nome, preco: parseFloat(preco).toFixed(2) };
    produtos.push(novoProduto);
    renderizarProdutos();
}

function renderizarPessoas() {
    const lista = document.getElementById('listaPessoas');
    lista.innerHTML = '';
    pessoas.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `(${p.id}) ${p.nome}`;
        lista.appendChild(li);
    });
}

function renderizarProdutos() {
    const lista = document.getElementById('listaProdutos');
    lista.innerHTML = '';
    produtos.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `(${p.id}) ${p.nome} - R$ ${p.preco}`;
        //hugo
        let aumentar = document.createElement("button");
        aumentar.innerText = "+ preço";
        aumentar.addEventListener("click", () => aumentarPreco(p.id));

        let diminuir = document.createElement("button");
        diminuir.innerText = "- preço";
        diminuir.addEventListener("click", () => diminuirPreco(p.id));

        let remover = document.createElement("button");
        remover.innerText = "remover";
        remover.addEventListener("click", () => removerProduto(p.id));

        li.appendChild(aumentar);
        li.appendChild(remover);
        li.appendChild(diminuir);
        lista.appendChild(li);
    });
}

function aumentarPreco(id) {
    let produto = produtos.filter(p => p.id === id);

    produto[0].preco = Number(produto[0].preco) + 1;
    renderizarProdutos();
}

function diminuirPreco(id) {
    let produto = produtos.filter(p => p.id === id);
    
    if(produto[0].preco >= 1) {
        produto[0].preco = Number(produto[0].preco) - 1;
    } else if(produto[0].preco < 1 && produto[0].preco > 0) {
        produto[0].preco = 0;
    }

    renderizarProdutos();
}

function removerProduto(id) {
    produtos = produtos.filter(p => p.id !== id);
    renderizarProdutos();
}

document.getElementById('formPessoa').addEventListener('submit', function (e) {
    e.preventDefault();
    adicionarPessoa(document.getElementById('nomePessoa').value);
    this.reset();
});

document.getElementById('formProduto').addEventListener('submit', function (e) {
    e.preventDefault();
    adicionarProduto(
        document.getElementById('nomeProduto').value,
        document.getElementById('precoProduto').value
    );
    this.reset();
});

// Dados iniciais
pessoas = [
    { id: 1, nome: "Ana" },
    { id: 2, nome: "Carlos" }
];

produtos = [
    { id: 1, nome: "Camiseta", preco: "29.90" },
    { id: 2, nome: "Boné", preco: "19.90" }
];

renderizarPessoas();
renderizarProdutos();
