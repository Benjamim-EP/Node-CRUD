const db = require('./db');

const booksData = [
  {
    title: 'Livro 1',
    author: 'Autor 1',
    year: 2023,
  },
  {
    title: 'Livro 2',
    author: 'Autor 2',
    year: 2022,
  }
  
];

const categoriesData = [
  {
    name: 'Categoria 1',
  },
  {
    name: 'Categoria 2',
  }
  
];

const insertBooks = () => {
    const query = 'INSERT INTO books (title, author, year) VALUES (?, ?, ?)';
  
    booksData.forEach((book, index) => {
      db.query(query, [book.title, book.author, book.year], (err) => {
        if (err) {
          console.error('Erro ao inserir livro:', err);
        }
  
        // Verifica se essa é a última iteração
        if (index === booksData.length - 1) {
          // Todas as inserções foram concluídas, chama a função de inserção das categorias
          insertCategories();
        }
      });
    });
  };
  
const insertCategories = () => {
    const query = 'INSERT INTO categories (name) VALUES (?)';
  
    categoriesData.forEach((category, index) => {
      db.query(query, [category.name], (err) => {
        if (err) {
          console.error('Erro ao inserir categoria:', err);
        }
  
        // Verifica se essa é a última iteração
        if (index === categoriesData.length - 1) {
          // Todas as inserções foram concluídas, finaliza a conexão com o banco de dados
          console.log('Dados inseridos com sucesso!');
          
        }
      });
    });
  };
  
function deletar(){
  db.query('DELETE FROM books', (err) => {
    if (err) {
      console.error('Erro ao limpar tabela de livros:', err);
      return;
    }
  
    
  });

db.query('DELETE FROM categories', (err) => {
    if (err) {
      console.error('Erro ao limpar tabela de categorias:', err);
      return;
    }
});
}



function inserir(){
    deletar()
    insertBooks()
    insertCategories()
}

inserir();