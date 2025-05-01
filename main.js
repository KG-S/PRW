let pessoas = []
let produtos = []

function gerarId(lista) {
  return lista.length ? Math.max(...lista.map(item => item.id)) + 1 : 1
}

function adicionarPessoa(nome) {
  if (!nome.trim()) {
    alert('Nome da pessoa não pode ser vazio.')
    return
  }
  const novaPessoa = { id: gerarId(pessoas), nome, produtos: [], total: 0 }
  pessoas.push(novaPessoa)

  renderizarPessoas()
  atualizarPessoasSelect()
}

function adicionarProduto(nome, preco) {
  if (!nome.trim()) {
    alert('Nome do produto é obrigatório.')
    return
  }
  if (preco < 0 || isNaN(preco)) {
    alert('Preço deve ser maior ou igual a zero.')
    return
  }
  const novoProduto = {
    id: gerarId(produtos),
    nome,
    preco: parseFloat(preco)
  }
  produtos.push(novoProduto)

  renderizarProdutos()
  atualizarProdutosSelect()
}

function renderizarPessoas() {
  const lista = document.getElementById('listaPessoas')
  lista.innerHTML = ''
  pessoas.forEach(p => {
    const li = document.createElement('li')
    li.textContent = `(${p.id}) ${p.nome}`
    p.produtos
      .map(id => {
        let novoProduto = document.createElement('p')

        const produto = produtos.find(produto => produto.id === id)
        novoProduto.innerHTML = `${produto.nome} R$${produto.preco}`
        li.appendChild(novoProduto)
      })
      .join(', ')

    let total = document.createElement('p')
    let totalValue = p.produtos.reduce((soma, p) => {
      const produto = produtos.find(prod => prod.id === p)
      return soma + produto.preco
    }, 0)

    if (totalValue == 0) {
      totalValue = ''
    }
    total.innerHTML = totalValue

    li.appendChild(total)

    let remover = document.createElement('button')
    remover.innerText = 'remover'
    remover.addEventListener('click', () => removerPessoa(p.id))

    li.appendChild(remover)
    lista.appendChild(li)
  })
}

function renderizarProdutos() {
  const lista = document.getElementById('listaProdutos')
  lista.innerHTML = ''
  produtos.forEach(p => {
    const li = document.createElement('li')
    li.textContent = `(${p.id}) ${p.nome} - R$ ${p.preco}`
    //hugo
    let aumentar = document.createElement('button')
    aumentar.innerText = '+ preço'
    aumentar.addEventListener('click', () => aumentarPreco(p.id))

    let diminuir = document.createElement('button')
    diminuir.innerText = '- preço'
    diminuir.addEventListener('click', () => diminuirPreco(p.id))

    let remover = document.createElement('button')
    remover.innerText = 'remover'
    remover.addEventListener('click', () => removerProduto(p.id))

    li.appendChild(aumentar)
    li.appendChild(remover)
    li.appendChild(diminuir)
    lista.appendChild(li)
  })
}

function aumentarPreco(id) {
  let produto = produtos.filter(p => p.id === id)

  produto[0].preco = Number(produto[0].preco) + 1
  renderizarProdutos()
  renderizarPessoas()
}

function diminuirPreco(id) {
  let produto = produtos.filter(p => p.id === id)

  if (produto[0].preco >= 1) {
    produto[0].preco = Number(produto[0].preco) - 1
  } else if (produto[0].preco < 1 && produto[0].preco > 0) {
    produto[0].preco = 0
  }

  renderizarProdutos()
  renderizarPessoas()
}

function removerPessoa(id) {
  pessoas = pessoas.filter(p => p.id !== id)
  renderizarPessoas()

  atualizarPessoasSelect()
}

function removerProduto(id) {
  pessoas.forEach(pessoa => {
    pessoa.produtos = pessoa.produtos.filter(p => p !== id)
  })
  produtos = produtos.filter(p => p.id !== id)

  renderizarProdutos()
  renderizarPessoas()

  atualizarProdutosSelect()
}

function atualizarPessoasSelect() {
  const selectPessoas = document.getElementById('selectPessoas')
  selectPessoas.innerHTML = ''

  const opcaoVazia = document.createElement('option')
  opcaoVazia.value = ''
  opcaoVazia.disabled = true
  opcaoVazia.selected = true
  selectPessoas.appendChild(opcaoVazia)

  pessoas.forEach(pessoa => {
    const novoOption = document.createElement('option')
    novoOption.value = pessoa.id
    novoOption.textContent = pessoa.nome
    selectPessoas.appendChild(novoOption)
  })
}

function atualizarProdutosSelect() {
  const selectProdutos = document.getElementById('selectProdutos')
  selectProdutos.innerHTML = ''

  const opcaoVazia = document.createElement('option')
  opcaoVazia.value = ''
  opcaoVazia.disabled = true
  opcaoVazia.selected = true
  selectProdutos.appendChild(opcaoVazia)

  produtos.forEach(produto => {
    const novoOption = document.createElement('option')
    novoOption.value = produto.id
    novoOption.textContent = produto.nome
    selectProdutos.appendChild(novoOption)
  })
}

function comprarProdutos() {
  const idProdutos = Number(document.getElementById('selectProdutos').value)
  const idPessoa = document.getElementById('selectPessoas').value

  for (let i in pessoas) {
    let pessoa = pessoas[i]
    if (pessoa.id == idPessoa && !pessoa.produtos.find(n => n == idProdutos)) {
      pessoa.produtos.push(idProdutos)
    }

    renderizarPessoas()
  }
}

document.getElementById('formPessoa').addEventListener('submit', function (e) {
  e.preventDefault()
  adicionarPessoa(document.getElementById('nomePessoa').value)
  this.reset()
})

document.getElementById('formProduto').addEventListener('submit', function (e) {
  e.preventDefault()
  adicionarProduto(
    document.getElementById('nomeProduto').value,
    document.getElementById('precoProduto').value
  )
  this.reset()
})

document
  .getElementById('formComprarProduto')
  .addEventListener('submit', function (e) {
    e.preventDefault()
    comprarProdutos()

    atualizarPessoasSelect()
    atualizarProdutosSelect()
  })

// Dados iniciais
produtos = [
  { id: 1, nome: 'Camiseta', preco: 29.9 },
  { id: 2, nome: 'Boné', preco: 19.9 }
]

pessoas = [
  { id: 1, nome: 'Ana', produtos: [2, 1], total: produtos[0].preco },
  { id: 2, nome: 'Carlos', produtos: [1], total: produtos[1].preco }
]

renderizarPessoas()
renderizarProdutos()
atualizarPessoasSelect()
atualizarProdutosSelect()
